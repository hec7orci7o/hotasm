import {
  reg,
  constant,
  addr,
  ident,
  range,
  number,
  sColon,
  other,
} from "./lexico";

// Producciones
const sInst = Symbol("states");
const sInstParam = Symbol("states");
const sOp = Symbol("states");
const sRanges = Symbol("states");

const sError = Symbol("states");

function actionInst(kind, token, isa) {
  console.log("actionInst");
  switch (kind) {
    case ident:
      const aux2 = { op: null, types: [], ranges: [] };
      isa[token] = aux2;
      return [sInstParam, isa];
    default:
      return [sError, isa];
  }
}

function actionInstParam(kind, token, isa, name) {
  console.log("actionInstParam", name);
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

function actionOp(kind, token, isa, name) {
  console.log("actionOp");
  switch (kind) {
    case number:
      isa[name]["op"] = Number(token);
      return [sRanges, isa];
    default:
      return [sError, isa];
  }
}
/*
// mov r1 r2 r3
  {
    'mov' : {
      'op' : 0,
      'types' : [ reg, reg, reg ]
      'ranges' : [(22,22), (15,10), (9:5), (4:0)]
    }
    'add' : {
      'op' : 1
      'ranges' : [(22,22), (21,16), (4,0)]
    }
  }
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

export function sintactico(tkList) {
  let state = sInst;
  let inst;
  let isa = {};

  tkList.forEach((pair) => {
    console.log(pair);
    console.log("State: ", state);
    let [kind, token] = pair;

    if (state === sInst) {
      [state, isa] = actionInst(kind, token, isa);
      inst = token;
    } else if (state === sInstParam) {
      [state, isa] = actionInstParam(kind, token, isa, inst);
    } else if (state === sOp) {
      [state, isa] = actionOp(kind, token, isa, inst);
    } else if (state === sRanges) {
      [state, isa] = actionRanges(kind, token, isa, inst);
    } else {
      return null;
    }
  });
  console.log(isa);
  return isa;
}

// mov K rd; 0 22:22 21:16 4:0;
// add ra rb rd; 1 22:22 15:10 9:5 4:0;
// mov K rd; 0 22:22 21:16 4:0;
