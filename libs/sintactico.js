import {
  reg,
  constant,
  numConstant,
  addr,
  ident,
  comma,
  range,
  number,
  sColon,
  comment,
  other,
} from "./lexico";
import { dec2bin } from "./conversores";

// Estados de la gramática 1
const sInst = Symbol("states");
const sInstParam = Symbol("states");
const sOp = Symbol("states");
const sRanges = Symbol("states");
const sError = Symbol("states");

/**
 * @param {Symbol} kind
 * @param {String} token
 * @param {Object} isa
 * @returns
 */
function actionInst(kind, token, isa) {
  switch (kind) {
    case ident:
      isa[token] = { op: null, types: [], ranges: [] };
      return [sInstParam, isa];
    default:
      return [sError, isa];
  }
}

/**
 * @param {*} kind
 * @param {*} token
 * @param {*} isa
 * @param {*} name
 * @returns
 */
function actionParam(kind, token, isa, name) {
  switch (kind) {
    case reg:
    case constant:
    case addr:
      isa[name]["types"].push(kind);
      return [sInstParam, isa];
    case sColon:
      return [sOp, isa];
    default:
      return [sError, isa];
  }
}

/**
 * @param {Symbol} kind
 * @param {String} token
 * @param {Object} isa
 * @param {String} name
 * @returns
 */
function actionOp(kind, token, isa, name) {
  switch (kind) {
    case number:
      isa[name]["op"] = token;
      return [sRanges, isa];
    default:
      return [sError, isa];
  }
}

/**
 * @param {Symbol} kind
 * @param {String} token
 * @param {Object} isa
 * @param {String} name
 * @returns
 */
function actionRanges(kind, token, isa, name) {
  switch (kind) {
    case range:
      const [start, end] = token.split(":");
      isa[name]["ranges"].push([Number(start), Number(end)]);
      return [sRanges, isa];
    case sColon:
      return [sInst, isa];
    default:
      return [sError, isa];
  }
}

/**
 * @param {Array} tkList [[2]..N], [[kind(Symbol)][token(String)]]
 * @returns
 */
export function formatSintaxReader(tkList) {
  let state = sInst;
  let inst;
  let isa = {};

  tkList.forEach((pair) => {
    let [kind, token] = pair;

    if (state === sInst) {
      [state, isa] = actionInst(kind, token, isa);
      inst = token;
    } else if (state === sInstParam) {
      [state, isa] = actionParam(kind, token, isa, inst);
    } else if (state === sOp) {
      [state, isa] = actionOp(kind, token, isa, inst);
    } else if (state === sRanges) {
      [state, isa] = actionRanges(kind, token, isa, inst);
    } else {
      return null;
    }
  });
  return isa;
}

// Estados de la gramática 1
const trInst = Symbol("states");
const trInstParam = Symbol("states");
const trError = Symbol("states");

/**
 *
 * @param {*} line
 * @param {*} token
 * @param {*} translator
 * @returns
 */
function inst2Bin(line, token, translator) {
  let resta = Math.abs(translator[0] - translator[1]);
  if (translator[0] === 0 || translator[1] === 0) resta += 1;
  token = token.padStart(resta, "x");

  console.log("resta: ", resta);
  console.log("token + x: ", token.length, token);

  line = line
    .split("")
    .splice(
      line.length - Math.max(translator[0], translator[1]),
      resta,
      ...token.split("")
    )
    .toString()
    .replaceAll(",", "");
  return line;
}

/**
 *
 * @param {Symbol} kind
 * @param {Object} translator
 * @param {String} word
 * @returns
 */
function trActionInst(kind, translator, word) {
  switch (kind) {
    case ident:
      try {
        let aux = word.split("");
        let resta =
          Math.abs(translator["ranges"][0][0] - translator["ranges"][0][1]) + 1;
        aux.splice(
          word.length -
            Math.max(translator["ranges"][0][0], translator["ranges"][0][1]),
          resta,
          ...translator["op"].split("")
        );
        word = aux.toString().replaceAll(",", "");
      } catch (error) {
        console.error(error);
      }
      return [trInstParam, word];
    default:
      return [sError, word];
  }
}
// mov #K rd; 1 22:22 21:16 4:0;
// add ra rb rd; 1 22:22 15:10 9:5 4:0;

/**
 *
 * @param {Symbol} kind
 * @param {String} token
 * @param {Object} translator
 * @param {String} word
 * @param {Number} iParam
 * @returns
 */
function trActionParam(kind, token, translator, word, iParam) {
  // casos que tratará: reg, number, addr
  if (kind === reg) token = token.substring(1, token.length);
  token = dec2bin(token);
  switch (kind) {
    case reg:
    case number:
      // traduce el parametro a binario
      try {
        console.log("initial word: ", word.length, word);

        let aux = word.split("");
        let resta = Math.abs(
          translator["ranges"][iParam][0] - translator["ranges"][iParam][1]
        );
        token = token.padStart(resta, "x");

        console.log("resta: ", resta);
        console.log("token + x: ", token.length, token);

        aux.splice(
          word.length -
            Math.max(
              translator["ranges"][iParam][0],
              translator["ranges"][iParam][1]
            ),
          resta,
          ...token.split("")
        );
        word = aux.toString().replaceAll(",", "");
        console.log("final word: ", word.length, word);
      } catch (error) {
        console.error(error);
      }
      return [trInstParam, word];
    case sColon:
      // guarda la palabra en la lista de binarios
      return [trInst, word];
    default:
      return [sError, word];
  }
}

/**
 * Traduce el programa de ensamblador a binario
 *
 * @param {Array} tkList
 * @param {Object} isa
 * @param {Number} numbits
 * @returns
 */
export function programSintaxReader(tkList, isa, numbits) {
  numbits = 22; // debug
  let state = trInst;
  let word;
  let iParam = 1;
  let inst;

  tkList.forEach((pair) => {
    let [kind, token] = pair;
    if (state === trInst) {
      inst = token;
      word = "-".repeat(numbits); // crea un molde para la instrucción
      [state, word] = trActionInst(kind, isa[token], word);
      iParam = 1;
    } else if (state === trInstParam) {
      [state, word] = trActionParam(kind, token, isa[inst], word, iParam);
      iParam += 1;
    } else {
      return [word];
    }
  });
  return [word];
}
// mov #K rd; 1 22:22 21:16 4:0;
// add ra rb rd; 1 22:22 15:10 9:5 4:0;
