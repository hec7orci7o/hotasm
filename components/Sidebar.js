import { FiPlus } from "react-icons/fi";
import Setting from "./Setting";
import useCalc from "../hooks/useCalc";

export default function Sidebar({ config, addConf, updateConf, removeConf }) {
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

  return (
    <div className="col-span-2 bg-[#F8FAFD]">
      {/* --- PARAMETERS --- */}
      <div className="h-1/2 w-full p-8">
        <h2 className="font-bold text-lg text-center mb-5 capitalize">
          configuración
        </h2>
        <div className="grid grid-cols-8 gap-1 grid-flow-row auto-rows-max">
          <div className="w-full flex justify-center col-start-2 col-span-2 bg-gray-300 rounded-sm">
            <span className="text-sm font-medium p-2">name</span>
          </div>
          <div className="w-full flex justify-center col-span-2 bg-gray-300 rounded-sm">
            <span className="text-sm font-medium p-2">nºbits</span>
          </div>
          <div className="w-full flex justify-center col-span-2 bg-gray-300 rounded-sm">
            <span className="text-sm font-medium p-2">df bits</span>
          </div>
          <button
            onClick={addConf}
            className="col-span-1 mx-auto font-medium p-2"
          >
            <FiPlus className="w-5 h-5 hover:text-green-600" />
          </button>
          <div className="col-span-8 grid grid-cols-1 gap-1 mt-2">
            {config.map((c) => (
              <Setting
                key={c.id}
                id={c.id}
                name={c.name}
                num={c.num}
                df={c.df}
                updFun={updateConf}
                delFun={removeConf}
              />
            ))}
          </div>
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
                onClick={setDecimal}
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
                onClick={setBinario}
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
                onClick={setHexadecimal}
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
