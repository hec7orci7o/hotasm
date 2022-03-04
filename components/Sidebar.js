import useCalc from "../hooks/useCalc";
import { useState } from "react";

export default function Sidebar({ load, unload }) {
  const {
    dec,
    bin,
    hex,
    setDecimal,
    setBinario,
    setHexadecimal,
    updateDecimal,
    updateBinario,
    updateHexadecimal,
  } = useCalc();

  const [config, setConfig] = useState("");
  const [nbits, setNbits] = useState(0);

  return (
    <div className="col-span-2 bg-[#F8FAFD]">
      {/* --- PARAMETERS --- */}
      <div className="flex gap-2 flex-wrap h-1/2 w-full p-8">
        <div className="flex justify-center items-center h-60 w-full bg-[#EFF2F5] relative">
          <h3 className="uppercase font-bold text-3xl opacity-30">config</h3>
          <textarea
            id="config"
            name="config"
            className="w-full h-full resize-none bg-transparent p-4 absolute top-0 left-0"
            onChange={(e) => setConfig(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between items-center bg-[#EFF2F5] px-6 py-2">
          <h3 className="uppercase font-bold text-xl opacity-30">inst</h3>
          <label htmlFor="inst">
            <input
              className="w-8 h-8 bg-transparent border-2 border-black rounded-md p-1"
              onChange={(e) => setNbits(Number(e.target.value))}
            />
            <span id="inst" name="inst" className="ml-2">
              bits
            </span>
          </label>
        </div>
        <div className="w-full flex gap-2 justify-center">
          <button
            type="submit"
            className="text-xl w-1/2 p-2 bg-[#EFF2F5]"
            onClick={() => load(config, nbits)}
          >
            <span className="font-bold text-xl opacity-30">load</span>
          </button>
          <button
            type="button"
            className="text-xl w-1/2 p-2 bg-[#EFF2F5]"
            onClick={() => unload()}
          >
            <span className="font-bold text-xl opacity-30">unload</span>
          </button>
        </div>
      </div>
      {/* --- CALCULATION --- */}
      <div className="h-1/2 w-full p-8">
        <h2 className="font-bold text-lg text-center mb-5 capitalize">
          Calculadora
        </h2>
        <form className="flex flex-col gap-3" autoComplete="off">
          <div className="grid grid-cols-8 gap-1 relative">
            <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
              <label className="font-medium">Decimal</label>
              <input
                onClick={() => setDecimal()}
                onChange={(e) => updateDecimal(e.target.value)}
                className="w-full bg-gray-300 rounded-sm py-2 px-4"
                value={dec}
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1 relative">
            <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
              <label className="font-medium">Binario</label>
              <input
                onClick={() => setBinario()}
                onChange={(e) => updateBinario(e.target.value)}
                className="w-full bg-gray-300 rounded-sm py-2 px-4"
                value={bin}
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1 relative">
            <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
              <label className="font-medium">Hexadecimal</label>
              <input
                onClick={() => setHexadecimal()}
                onChange={(e) => updateHexadecimal(e.target.value)}
                className="w-full bg-gray-300 rounded-sm py-2 px-4"
                value={hex}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
