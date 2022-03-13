import { useState, useEffect } from "react";
import { assamblyParser } from "../libs/lexico";
import { programSintaxReader } from "../libs/sintactico";

export default function useEditor(isa, nbits) {
  const [rawCode, setCode] = useState("");
  const [binOut, setBOut] = useState([]);
  const [memOut, setMOut] = useState(<></>);

  const updateCode = (_c) => setCode(_c);

  useEffect(() => {
    if (rawCode.length > 0) {
      const tokenList = assamblyParser(rawCode);
      let bins = programSintaxReader(tokenList, isa, nbits);
      setBOut(bins);
    }
  }, [rawCode, isa, nbits]);

  return { binOut, memOut, setCode, updateCode };
}
