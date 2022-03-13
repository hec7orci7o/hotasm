export const reg = Symbol("tokens");
export const constant = Symbol("tokens");
export const numConstant = Symbol("tokens");
export const addr = Symbol("tokens");
export const ident = Symbol("tokens");
export const comma = Symbol("tokens");
export const range = Symbol("tokens");
export const number = Symbol("tokens");
export const sColon = Symbol("tokens");
export const comment = Symbol("tokens");
export const other = Symbol("tokens");

export const pairs = {
  comment: {
    regex: /^;(.*)$/,
    token: comment,
  },
  reg: {
    regex: /^r([a-zA-Z0-9]+)/,
    token: reg,
  },
  constant: {
    regex: /^#([A-Z])/,
    token: constant,
  },
  numConstant: {
    regex: /^#([0-9]+)/,
    token: numConstant,
  },
  addr: {
    regex: /^\[r([a-zA-Z0-9]+)\]/,
    token: addr,
  },
  ident: {
    regex: /^([a-zA-Z0-9]+)/,
    token: ident,
  },
  range: {
    regex: /^([0-9]+:[0-9]+)/,
    token: range,
  },
  number: {
    regex: /^([0-9]+)/,
    token: number,
  },
  sColon: {
    regex: /^;/,
    token: sColon,
  },
  other: {
    regex: /^[\r\n\t ]/,
    token: other,
  },
};

/**
 * @param {String} str  Cadena de texto donde se pretende eliminar el patron
 * @param {Object} type Objeto que contiene {regex: patron, token: type_token}
 * @returns {Array} [str(String), type_token(Symbol), token(String)]
 */
function leerToken(str, type) {
  const token = str.match(type.regex)[0]; // token = CADENA detectada por la regex
  const kind = type.token; // TIPO de token leido en la regex
  str = str.replace(type.regex, "");
  return [str, kind, token];
}

/**
 * @param {String} str String que contiene el formato de las instrucciones
 * @returns {Array<Array<Symbol,String>>} [[2]..N], [[kind(Symbol)][token(String)]]
 */
export const formatParser = (str) => {
  let tokenList = [];
  let kind;
  let token;

  while (str !== "") {
    // es un registro?
    if (pairs.reg.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.reg);
    // es una constante?
    else if (pairs.constant.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.constant);
    // es una dirección?
    else if (pairs.addr.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.addr);
    // es un rango?
    else if (pairs.range.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.range);
    // es un número?
    else if (pairs.number.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.number);
    // es un identificador?
    else if (pairs.ident.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.ident);
    // es un punto y coma?
    else if (pairs.sColon.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.sColon);
    // no es ninguno de los anteriores?
    else if (pairs.other.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.other);
    // Token no esperado?
    else throw new Error(`Unexpected token (${str[0]})`);

    if (kind !== pairs.other.token) tokenList = [...tokenList, [kind, token]];
  }
  return tokenList;
};

/**
 * @param {String} str String que contiene el codigo ensamblador a analizar
 * @returns {Array<Array<Symbol,String>>} [[2]..N], [[kind(Symbol)][token(String)]]
 */
export const assamblyParser = (str) => {
  let tokenList = [];
  let kind;
  let token;

  while (str !== "") {
    // es un registro?
    if (pairs.reg.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.reg);
    // es una constante numérica?
    else if (pairs.numConstant.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.numConstant);
    // es una dirección?
    else if (pairs.addr.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.addr);
    // es un rango?
    else if (pairs.range.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.range);
    // es un número?
    else if (pairs.number.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.number);
    // es un identificador?
    else if (pairs.ident.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.ident);
    // es un punto y coma?
    else if (pairs.sColon.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.sColon);
    // no es ninguno de los anteriores?
    else if (pairs.other.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.other);
    // Token no esperado?
    else throw new Error(`Unexpected token (${str[0]})`);

    if (kind !== pairs.other.token) tokenList = [...tokenList, [kind, token]];
  }
  return tokenList;
};
