import useCalc from "../hooks/useCalc";
import { useState } from "react";
import Field from "./Field";

export default function Sidebar({ load, unload }) {
  const {
    dec,
    bin,
    hex,
    updateDecimal,
    updateBinario,
    updateHexadecimal,
    setDecimal,
    setBinario,
    setHexadecimal,
  } = useCalc();

  const [config, setConfig] = useState("");
  const [nbits, setNbits] = useState(0);

  return (
    <div className="col-span-2 bg-[#E6E8E8] bg-opacity-25">
      {/* --- PARAMETERS --- */}
      <div className="flex flex-wrap gap-2 h-1/2 w-full p-8">
        <div className="h-2/3 flex justify-center items-center w-full bg-[#3B4449] bg-opacity-10 relative">
          <h3 className="uppercase font-bold text-4xl opacity-20 font-sans text-[#3B4449] select-none">
            config
          </h3>
          <textarea
            id="config"
            name="config"
            className="w-full h-full resize-none focus:outline-none bg-transparent p-4 absolute top-0 left-0 font-mono"
            onChange={(e) => setConfig(e.target.value)}
          />
        </div>
        <div className="h-1/3 flex flex-wrap w-full gap-2">
          <div className="w-full flex justify-between items-center bg-[#3B4449] bg-opacity-10 px-6 py-2">
            <h3 className="uppercase font-bold text-2xl opacity-20 font-sans text-[#3B4449] select-none">
              inst
            </h3>
            <label htmlFor="inst">
              <input
                maxLength={2}
                className="w-8 h-8 bg-transparent border-2 border-black border-opacity-20 p-1.5 focus:outline-none"
                onChange={(e) => setNbits(Number(e.target.value))}
                placeholder="32"
              />
              <span id="inst" name="inst" className="ml-2 font-mono">
                bits
              </span>
            </label>
          </div>
          <div className="w-full flex gap-2 justify-center">
            <button
              type="submit"
              className="text-xl w-1/2 p-2 bg-[#263238] hover:bg-[#222D32] hover:underline text-white"
              onClick={() => load(config, nbits)}
            >
              <span className="font-bold text-xl brightness-90 font-sans lowercase">
                load
              </span>
            </button>
            <button
              type="button"
              className="text-xl w-1/2 p-2 bg-[#263238] hover:bg-[#222D32] hover:underline text-white"
              onClick={() => unload()}
            >
              <span className="font-bold text-xl brightness-90 font-sans lowercase">
                unload
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* --- CALCULATION --- */}
      <div className="flex items-center h-1/2 w-full p-8">
        <div className="flex flex-wrap gap-2">
          <Field
            name="Dec"
            value={dec}
            update={updateDecimal}
            select={setDecimal}
          />
          <Field
            name="Bin"
            value={bin}
            update={updateBinario}
            select={setBinario}
          />
          <Field
            name="Hex"
            value={hex}
            update={updateHexadecimal}
            select={setHexadecimal}
          />
        </div>
      </div>
    </div>
  );
}
