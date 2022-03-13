import { useState, useEffect } from "react";
import { parseASM } from "../logic/lexico";
import { translate } from "../logic/sintactico";

export default function useEditor(isa, nbits) {
  const [rawCode, setCode] = useState("");
  const [binOut, setBOut] = useState([]);
  const [memOut, setMOut] = useState(<></>);

  const updateCode = (_c) => setCode(_c);

  useEffect(() => {
    if (rawCode.length > 0) {
      const tokenList = parseASM(rawCode);
      let bins = translate(tokenList, isa, nbits);
      setBOut(bins);
    }
  }, [rawCode, isa, nbits]);

  return { binOut, memOut, setCode, updateCode };
}
