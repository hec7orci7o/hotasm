export const reg = Symbol("tokens");
export const constant = Symbol("tokens");
export const addr = Symbol("tokens");
export const ident = Symbol("tokens");
export const comma = Symbol("tokens");
export const range = Symbol("tokens");
export const number = Symbol("tokens");
export const sColon = Symbol("tokens");
export const other = Symbol("tokens");

export const pairs = {
  reg: {
    regex: /^(r[a-zA-Z0-9]+)/,
    token: reg,
  },
  constant: {
    regex: /^(#[A-Z])/,
    token: constant,
  },
  addr: {
    regex: /^(\[r[a-z]\])/,
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
    regex: /^[0-9]+/,
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

function readToken(str, type) {
  const token = str.match(type.regex)[0];
  const kind = type.token;
  str = str.replace(type.regex, "");
  return [str, kind, token];
}

export const parse = (str) => {
  let it = 0; // temporal para debug
  let tokenList = [];
  let kind;
  let token;

  while (str !== "" && it != 100) {
    // generate token and remove beginning of string
    if (pairs.reg.regex.test(str))
      [str, kind, token] = readToken(str, pairs.reg);
    else if (pairs.constant.regex.test(str))
      [str, kind, token] = readToken(str, pairs.constant);
    else if (pairs.addr.regex.test(str))
      [str, kind, token] = readToken(str, pairs.addr);
    else if (pairs.range.regex.test(str))
      [str, kind, token] = readToken(str, pairs.range);
    else if (pairs.number.regex.test(str))
      [str, kind, token] = readToken(str, pairs.number);
    else if (pairs.ident.regex.test(str))
      [str, kind, token] = readToken(str, pairs.ident);
    else if (pairs.sColon.regex.test(str))
      [str, kind, token] = readToken(str, pairs.sColon);
    else if (pairs.other.regex.test(str))
      [str, kind, token] = readToken(str, pairs.other);
    else throw new Error(`Unexpected token (${str[0]})`);

    if (kind !== pairs.other.token) tokenList = [...tokenList, [kind, token]];
    it++;
  }

  return tokenList;
};
