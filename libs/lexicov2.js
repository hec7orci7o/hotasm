export const TOKEN = {
  instruction: "instruction",
  register: "register",
  registerN: "registerN",
  address: "address",
  constant: "constant",
  constantN: "constantN",
  semiColon: "semiColon",
  number: "number",
  range: "range",
  ignore: "ignore",
};

export const pairs = {
  instruction: {
    regex: /^([a-z0-9]+)/i,
    token: TOKEN["instruction"],
  },
  register: {
    regex: /^r([a-zA-Z]+)/,
    token: TOKEN["register"],
  },
  registerN: {
    regex: /^r([0-9]+)/,
    token: TOKEN["registerN"],
  },
  address: {
    regex: /^\[r([a-zA-Z0-9]+)\]/, // bug
    token: TOKEN["address"],
  },
  constant: {
    regex: /^#([a-z])/i,
    token: TOKEN["constant"],
  },
  constantN: {
    regex: /^#([0-9]+)/,
    token: TOKEN["constantN"],
  },
  semiColon: {
    regex: /^;/,
    token: TOKEN["semiColon"],
  },
  number: {
    regex: /^([0-9]+)/,
    token: TOKEN["number"],
  },
  range: {
    regex: /^([0-9]+\:[0-9]+)/,
    token: TOKEN["range"],
  },
  ignore: {
    regex: /^[\r\n\t, ]/,
    token: TOKEN["ignore"],
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
export const formatParserv2 = (str) => {
  const CHECK = /[a-z]+/i;
  let tokenList = [];
  let kind;
  let token;

  while (str !== "") {
    // es un registro?
    if (pairs.register.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.register);
    // es una dirección?
    // else if (pairs.address.regex.test(str))
    //   [str, kind, token] = leerToken(str, pairs.address);
    // es la declaración de una constante?
    else if (pairs.constant.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.constant);
    // es el identificador de una instruccion?
    else if (
      pairs.instruction.regex.test(str) &&
      CHECK.test(str.match(pairs.instruction.regex)[0])
    )
      [str, kind, token] = leerToken(str, pairs.instruction);
    // es un punto y coma?
    else if (pairs.semiColon.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.semiColon);
    // es un rango?
    else if (pairs.range.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.range);
    // es un numero?
    else if (pairs.number.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.number);
    // caracteres a ignorar? <- no se añadiran a la lista de tokens
    else if (pairs.ignore.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.ignore);
    // Token no esperado?
    else
      return {
        tokens: tokenList,
        error: `Unexpected token (${str[0]})`,
      };

    if (kind !== pairs.ignore.token) tokenList = [...tokenList, [kind, token]];
  }

  return {
    tokens: tokenList,
    error: null,
  };
};

/**
 * @param {String} str String que contiene el codigo ensamblador a analizar
 * @returns {Array<Array<Symbol,String>>} [[2]..N], [[kind(Symbol)][token(String)]]
 */
export const assamblyParserv2 = (str) => {
  const CHECK = /[a-z]+/i;
  let tokenList = [];
  let kind;
  let token;

  while (str !== "") {
    // es un registro?
    if (pairs.registerN.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.registerN);
    // es una constante numérica?
    else if (pairs.constantN.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.constantN);
    // es una dirección?
    // else if (pairs.address.regex.test(str))
    //   [str, kind, token] = leerToken(str, pairs.address);
    // es un punto y coma?
    // es el identificador de una instruccion?
    else if (pairs.instruction.regex.test(str)) {
      [str, kind, token] = leerToken(str, pairs.instruction);
    }
    // es un punto y coma?
    else if (pairs.semiColon.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.semiColon);
    // no es ninguno de los anteriores?
    else if (pairs.ignore.regex.test(str))
      [str, kind, token] = leerToken(str, pairs.ignore);
    // Token no esperado?
    else
      return {
        tokens: tokenList,
        error: `Unexpected token (${str[0]})`,
      };

    if (kind !== pairs.ignore.token) tokenList = [...tokenList, [kind, token]];
  }

  return {
    tokens: tokenList,
    error: null,
  };
};
