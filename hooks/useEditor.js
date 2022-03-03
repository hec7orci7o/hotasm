import { useState, useEffect } from "react";

export default function useEditor(translator) {
  console.log(translator);
  const [rawCode, setCode] = useState("");
  const [binOut, setBOut] = useState([]);
  const [memOut, setMOut] = useState(<></>);

  const updateCode = (_c) => setCode(_c);

  useEffect(() => {
    if (rawCode.length > 0) {
      let lines = rawCode.split("\n").map((l) => {
        let x = l.replace(/;.*/, ""); // elimina los comentarios
        x = x.replace(/[^a-zA-Z0-9 ]*/g, ""); // elimina todos los caracteres que no sean letras o numeros
        return x;
      });
      lines = lines.map((l) => translate(l));
      setBOut(lines);
    }
  }, [rawCode]);

  const translate = (line) => {
    const lista = line.split(" ");
    lista = lista.map((key) => {
      if (translator[key]) {
        return translator[key].df.length < translator[key].num
          ? translator[key].df.padStart(translator[key].num, 0)
          : translator[key].df;
      }
      return Number(key)
        ? parseInt(key, 10).toString(2).padStart(translator["k"].num, 0)
        : null;
    });
    return lista.join(" ");
  };

  return { binOut, memOut, updateCode };
}
