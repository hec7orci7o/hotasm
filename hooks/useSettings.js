import { useState } from "react";
export default function useSettings() {
  const [config, setConfig] = useState("");
  const [nbits, setNbits] = useState(0);

  const handleLoad = (_c, _n) => {
    setConfig(_c);
    setNbits(_n);
  };

  const handleUnload = () => {
    setConfig("");
    setNbits(0);
  };

  const parse = (str) => {
    // tokens
    let tReg = /^(r[a-z])/;
    let tConstant = /^(#[A-Z])/;
    let tAddr = /^(\[r[a-z]\])/;
    let tIdent = /^([a-zA-Z]*)/;
    let tComma = /^,/;
    let tSColon = /^;/;

    // fallback
    let tOther = /^[\r\n\t ]/;

    // TO-DO: refactor switch
    while (str !== "") {
      if (tReg.test(str)) {
        // generate reg token and remove beginning of string
      } else if (tConstant.test(str)) {
      } else if (tAddr.test(str)) {
      } else if (tIdent.test(str)) {
      } else if (tComma.test(str)) {
      } else if (tComma.test(str)) {
      } else if (tOther.test(str)) {
      } else {
        throw new Error(`Unexpected token (${str[0]})`);
      }
    }
  };

  return {
    handleLoad,
    handleUnload,
  };
}
