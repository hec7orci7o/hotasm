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

/*
// formatos de inst
mov K,rd ; SignExt(K) -> BR(rd) K cte de 16 bits 
add ra,rb,rd ; BR(ra) + BR(rb) -> BR(rd) 
Plantilla:
--------------------------------
add @ra, rb, rd; 1 22:22 15:10 9:5 4:0
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
