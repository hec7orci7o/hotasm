import { useState, useEffect } from "react";
import { formatParser } from "../libs/lexico";
import { formatSintaxReader } from "../libs/sintactico";

export default function useSettings() {
  const [isa, setIsa] = useState({});
  const [config, setConfig] = useState("");
  const [nbits, setNbits] = useState(32);

  useEffect(() => {
    try {
      let tokenList = formatParser(config);
      setIsa(formatSintaxReader(tokenList));
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

  return {
    isa,
    nbits,
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
