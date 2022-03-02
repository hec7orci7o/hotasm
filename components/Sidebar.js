import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar() {
  const BASE_2 = 2;
  const BASE_10 = 10;
  const BASE_16 = 16;

  const [dec, setDec] = useState(0);
  const [bin, setBin] = useState(0);
  const [hex, setHex] = useState(0);

  const handleClean = () => {
    setDec();
    setBin();
    setHex();
  };

  const handleDec = (_num) => {
    setBin(parseInt(_num, BASE_10).toString(BASE_2)); // dec -> bin
    setHex(parseInt(_num, BASE_10).toString(BASE_16)); // dec -> hex
  };
  const handleBin = (_num) => {
    setDec(parseInt(_num, BASE_2).toString(BASE_10)); // bin -> dec
    setHex(parseInt(_num, BASE_2).toString(BASE_16)); // bin -> hex
  };
  const handleHex = (_num) => {
    setDec(parseInt(_num, BASE_16).toString(BASE_10)); // hex -> dec
    setBin(parseInt(_num, BASE_16).toString(BASE_2)); // hex -> bin
  };

  return (
    <div className="col-span-2 bg-[#F8FAFD]">
      {/* --- PARAMETERS --- */}
      <div className="w-full p-8">
        <h2 className="font-bold text-lg text-center mb-5 capitalize">
          configuración
        </h2>
        <div className="grid grid-cols-8 gap-1 relative">
          <div className="w-full flex justify-center col-start-2 col-span-2 bg-gray-300 rounded-sm">
            <span className="text-sm font-medium p-2 uppercase">INST</span>
          </div>
          <div className="w-full flex justify-center col-span-2 bg-gray-300 rounded-sm">
            <span className="text-sm font-medium p-2">nºbits</span>
          </div>
          <div className="w-full flex justify-center col-span-2 bg-gray-300 rounded-sm">
            <span className="text-sm font-medium p-2">DF bits</span>
          </div>
          <button className="font-medium p-2 absolute top-0 right-0 z-50">
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* --- CALCULATION --- */}
      <div className="w-full p-8">
        <h2 className="font-bold text-lg text-center mb-5 capitalize">
          Calculadora
        </h2>
        <form className="flex flex-col gap-3" autoComplete="off">
          <div className="grid grid-cols-8 gap-1 relative">
            <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
              <label className="font-medium">Decimal</label>
              <input
                onFocus={() => handleClean()}
                onChange={(e) => handleDec(e.target.value)}
                className="w-full bg-gray-300 rounded-sm py-2 px-4"
                value={dec}
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1 relative">
            <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
              <label className="font-medium">Binario</label>
              <input
                onFocus={() => handleClean()}
                onChange={(e) => handleBin(e.target.value)}
                className="w-full bg-gray-300 rounded-sm py-2 px-4"
                value={bin}
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1 relative">
            <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
              <label className="font-medium">Hexadecimal</label>
              <input
                onFocus={() => handleClean()}
                onChange={(e) => handleHex(e.target.value)}
                className="w-full bg-gray-300 rounded-sm py-2 px-4"
                value={"0x" + hex}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
