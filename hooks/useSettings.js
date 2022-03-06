import { useState, useEffect } from "react";
import { pairs, readToken } from "../logic/pairs";

export default function useSettings() {
  const [config, setConfig] = useState("");
  const [nbits, setNbits] = useState(0);

  useEffect(() => {
    try {
      parse(config);
    } catch (error) {
      console.log(error);
    }
  }, [config, nbits]);

  const handleLoad = (_c, _n) => {
    setConfig(_c);
    setNbits(_n);
  };

  const handleUnload = () => {
    setConfig("");
    setNbits(0);
  };

  const parse = (str) => {
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
      else if (pairs.number.regex.test(str))
        [str, kind, token] = readToken(str, pairs.number);
      else if (pairs.ident.regex.test(str))
        [str, kind, token] = readToken(str, pairs.ident);
      else if (pairs.range.regex.test(str))
        [str, kind, token] = readToken(str, pairs.range);
      else if (pairs.comma.regex.test(str))
        [str, kind, token] = readToken(str, pairs.comma);
      else if (pairs.sColon.regex.test(str))
        [str, kind, token] = readToken(str, pairs.sColon);
      else if (pairs.other.regex.test(str))
        [str, kind, token] = readToken(str, pairs.other);
      else throw new Error(`Unexpected token (${str[0]})`);

      if (kind !== pairs.other.token) tokenList = [...tokenList, [kind, token]];
      it++;
    }
  };

  return {
    handleLoad,
    handleUnload,
  };
}

/*
// formatos de inst
mov K,rd ; SignExt(K) -> BR(rd) K cte de 16 bits 
add ra,rb,rd ; BR(ra) + BR(rb) -> BR(rd) 
Plantilla:
--------------------------------
add ra, rb, rd; 1 22:22 15:10 9:5 4:0
mov K, rd; 0 22:22 21:16 4:0

"add" : {
  co : 1
  fields : {
    co: (22, 22)
    ra: (15, 10),
    rb: (9, 5),
    rd: (4, 0)
  }
}


ld r1, [r1]
add r4, r1, r3
mov #4, r5
*/

/*
[
  "add ra, rb, rd; 1 22:22 15:10 9:5 4:0",
  "mov #K, rd; 0 22:22 21:16 4:0"
]
*/
