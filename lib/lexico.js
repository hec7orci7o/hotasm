export const TOKEN = {
  instruction: 'instruction',
  register: 'register',
  registerN: 'registerN',
  constant: 'constant',
  constantN: 'constantN',
  semiColon: 'semiColon',
  number: 'number',
  range: 'range',
  ignore: 'ignore',
};

const pairs = {
  instruction: {
    regex: /^([a-z0-9]+)/i,
    token: TOKEN['instruction'],
  },
  register: {
    regex: /^r([a-zA-Z]+)/,
    token: TOKEN['register'],
  },
  registerN: {
    regex: /^r([0-9]+)/,
    token: TOKEN['registerN'],
  },
  constant: {
    regex: /^#([a-z])/i,
    token: TOKEN['constant'],
  },
  constantN: {
    regex: /^#([0-9]+)/,
    token: TOKEN['constantN'],
  },
  semiColon: {
    regex: /^;/,
    token: TOKEN['semiColon'],
  },
  number: {
    regex: /^([0-9]+)/,
    token: TOKEN['number'],
  },
  range: {
    regex: /^([0-9]+\:[0-9]+)/,
    token: TOKEN['range'],
  },
  ignore: {
    regex: /^[\r\n\t, ]/,
    token: TOKEN['ignore'],
  },
};

/**
 * @param {String} str  Cadena de texto donde se pretende eliminar el patron
 * @param {Object} type Objeto que contiene {regex: patron, token: type_token}
 * @return {Array} [str(String), type_token(Symbol), token(String)]
 */
function leerToken(str, type) {
  const token = str.match(type.regex)[0]; // token = CADENA detectada por la regex
  const kind = type.token; // TIPO de token leido en la regex
  str = str.replace(type.regex, '');
  return [str, kind, token];
}

/**
 * @param {String} str String que contiene el formato de las instrucciones
 * @return {Array<Array<Symbol,String>>} [[2]..N], [[kind(Symbol)][token(String)]]
 */
export const formatParser = (str) => {
  const CHECK = /[a-z]+/i;
  let tokenList = [];
  let kind;
  let token;

  while (str !== '') {
    if (pairs.register.regex.test(str)) { // es un registro?
      [str, kind, token] = leerToken(str, pairs.register);
    } else if (pairs.constant.regex.test(str)) { // es la declaración de una constante?
      [str, kind, token] = leerToken(str, pairs.constant);
    } else if ( pairs.instruction.regex.test(str) && CHECK.test(str.match(pairs.instruction.regex)[0]) ) { // es el identificador de una instruccion?
      [str, kind, token] = leerToken(str, pairs.instruction);
    } else if (pairs.semiColon.regex.test(str)) { // es un punto y coma?
      [str, kind, token] = leerToken(str, pairs.semiColon);
    } else if (pairs.range.regex.test(str)) { // es un rango?
      [str, kind, token] = leerToken(str, pairs.range);
    } else if (pairs.number.regex.test(str)) { // es un numero?
      [str, kind, token] = leerToken(str, pairs.number);
    } else if (pairs.ignore.regex.test(str)) { // caracteres a ignorar? <- no se añadiran a la lista de tokens
      [str, kind, token] = leerToken(str, pairs.ignore);
    } else { // Token no esperado?
      return {
        tokens: tokenList,
        error: `Unexpected token (${str[0]})`,
      };
    }

    if (kind !== pairs.ignore.token) tokenList = [...tokenList, [kind, token]];
  }

  return {
    tokens: tokenList,
    error: null,
  };
};

/**
 * @param {String} str String que contiene el codigo ensamblador a analizar
 * @return {Array<Array<Symbol,String>>} [[2]..N], [[kind(Symbol)][token(String)]]
 */
export const assamblyParser = (str) => {
  let tokenList = [];
  let kind;
  let token;

  while (str !== '') {
    if (pairs.registerN.regex.test(str)) { // es un registro?
      [str, kind, token] = leerToken(str, pairs.registerN);
    } else if (pairs.constantN.regex.test(str)) { // es una constante numérica?
      [str, kind, token] = leerToken(str, pairs.constantN);
    } else if (pairs.instruction.regex.test(str)) { // es el identificador de una instruccion?
      [str, kind, token] = leerToken(str, pairs.instruction);
    } else if (pairs.semiColon.regex.test(str)) { // es un punto y coma?
      [str, kind, token] = leerToken(str, pairs.semiColon);
    } else if (pairs.ignore.regex.test(str)) {// no es ninguno de los anteriores?
      [str, kind, token] = leerToken(str, pairs.ignore);
    } else {// Token no esperado?
      return {
        tokens: tokenList,
        error: `Unexpected token (${str[0]})`,
      };
    }

    if (kind !== pairs.ignore.token) tokenList = [...tokenList, [kind, token]];
  }

  return {
    tokens: tokenList,
    error: null,
  };
};
