import { useEffect, useState } from "react";

export default function useCalc() {
  const BASE_2 = 2;
  const BASE_10 = 10;
  const BASE_16 = 16;
  const [caso, setCaso] = useState("");
  const [dec, setDec] = useState();
  const [bin, setBin] = useState();
  const [hex, setHex] = useState();

  const updateDecimal = (_n) => {
    setDec(_n === "" ? 0 : _n);
  };
  const updateBinario = (_n) => {
    setBin(_n);
  };
  const updateHexadecimal = (_n) => {
    setHex(_n);
  };

  const setDecimal = () => {
    setCaso("DEC");
  };
  const setBinario = () => {
    setCaso("BIN");
  };
  const setHexadecimal = () => {
    setCaso("HEX");
  };

  useEffect(() => {
    if (caso === "DEC") {
      setBin(parseInt(dec, BASE_10).toString(BASE_2)); // dec -> bin
      setHex(parseInt(dec, BASE_10).toString(BASE_16)); // dec -> hex
    } else if (caso === "BIN") {
      setDec(parseInt(bin, BASE_2).toString(BASE_10)); // bin -> dec
      setHex(parseInt(bin, BASE_2).toString(BASE_16)); // bin -> hex
    } else if (caso === "HEX") {
      setDec(parseInt(hex, BASE_16).toString(BASE_10)); // hex -> dec
      setBin(parseInt(hex, BASE_16).toString(BASE_2)); // hex -> bin
    }
  }, [dec, bin, hex, caso]);

  return {
    dec,
    bin,
    hex,
    updateDecimal,
    updateBinario,
    updateHexadecimal,
    setDecimal,
    setBinario,
    setHexadecimal,
  };
}
