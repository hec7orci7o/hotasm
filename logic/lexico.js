const reg = Symbol("tokens");
const constant = Symbol("tokens");
const addr = Symbol("tokens");
const dent = Symbol("tokens");
const comma = Symbol("tokens");
const range = Symbol("tokens");
const number = Symbol("tokens");
const sColon = Symbol("tokens");
const other = Symbol("tokens");

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
    token: dent,
  },
  comma: {
    regex: /^,/,
    token: comma,
  },
  range: {
    regex: /^:/,
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

export function readToken(str, type) {
  const token = str.match(type.regex)[0];
  const kind = type.token;
  str = str.replace(type.regex, "");
  return [str, kind, token];
}
