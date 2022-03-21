import { TOKEN } from "./lexico";
import { dec2bin } from "./conversores";

// Estados de la gramática 1
const sInst = Symbol("states");
const sInstParam = Symbol("states");
const sOp = Symbol("states");
const sRanges = Symbol("states");
const sError = Symbol("states");

/**
 * @param {String} kind
 * @param {String} token
 * @param {Object} isa
 * @returns
 */
function actionInst(kind, token, isa) {
  switch (kind) {
    case TOKEN["instruction"]:
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
    case TOKEN["register"]:
    case TOKEN["constant"]:
    case TOKEN["address"]:
      isa[name]["types"].push(kind);
      return [sInstParam, isa];
    case TOKEN["semiColon"]:
      return [sOp, isa];
    default:
      return [sError, isa];
  }
}

/**
 * @param {String} kind
 * @param {String} token
 * @param {Object} isa
 * @param {String} name
 * @returns
 */
function actionOp(kind, token, isa, name) {
  switch (kind) {
    case TOKEN["number"]:
      isa[name]["op"] = token;
      return [sRanges, isa];
    default:
      return [sError, isa];
  }
}

/**
 * @param {String} kind
 * @param {String} token
 * @param {Object} isa
 * @param {String} name
 * @returns
 */
function actionRanges(kind, token, isa, name) {
  switch (kind) {
    case TOKEN["range"]:
      const [start, end] = token.split(":");
      isa[name]["ranges"].push([Number(start), Number(end)]);
      return [sRanges, isa];
    case TOKEN["semiColon"]:
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
 * Modifica la cadena de la instrucción para añadirle el token(binario)
 *
 * @param {String} line
 * @param {String} token
 * @param {Array} translator
 * @returns
 */
function inst2Bin(line, token, translator) {
  let fill = Math.abs(translator[0] - translator[1]) + 1;
  let max = Math.max(translator[0], translator[1]);

  token = token.padStart(fill, "x");
  let vLine = line.split("");
  vLine.splice(line.length - max - 1, token.length, ...token.split(""));
  vLine = vLine.toString().replaceAll(",", "");
  return vLine;
}

/**
 * @param {String} kind
 * @param {Object} translator
 * @param {String} word
 * @returns
 */
function trActionInst(kind, translator, word) {
  switch (kind) {
    case TOKEN["instruction"]:
      try {
        word = inst2Bin(word, translator["op"], translator["ranges"][0]);
      } catch (error) {
        console.error(error);
      }
      return [trInstParam, word];
    default:
      return [sError, word];
  }
}

/**
 *
 * @param {String} kind
 * @param {String} token
 * @param {Object} translator
 * @param {String} word
 * @param {Number} iParam
 * @returns
 */
function trActionParam(kind, token, translator, word, iParam) {
  // casos que tratará: reg, number, addr
  if (kind === TOKEN["registerN"] || kind === TOKEN["constantN"])
    token = token.substring(1, token.length);
  token = dec2bin(token);

  switch (kind) {
    case TOKEN["registerN"]:
    case TOKEN["constantN"]:
      // traduce el parametro a binario
      try {
        word = inst2Bin(word, token, translator["ranges"][iParam]);
      } catch (error) {
        console.error(error);
      }
      return [trInstParam, word];
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
  let state = trInst;
  let word;
  let iParam = 1;
  let inst;
  let instList = [];

  tkList.forEach((pair) => {
    let [kind, token] = pair;
    if (state === trInst) {
      inst = token;
      word = "-".repeat(numbits); // crea un molde para la instrucción
      [state, word] = trActionInst(kind, isa[token], word);
      iParam = 1;
    } else if (state === trInstParam) {
      if (kind !== TOKEN["semiColon"]) {
        [state, word] = trActionParam(kind, token, isa[inst], word, iParam);
        iParam += 1;
      } else {
        instList.push(word);
        state = trInst;
      }
    }
  });
  return instList;
}
