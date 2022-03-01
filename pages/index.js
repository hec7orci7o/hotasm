import { FiCopy, FiPlus } from "react-icons/fi";

export default function Home() {
  const bin = [
    "0011101010011000000001",
    "0011101010011000000010",
    "0011101010011000000011",
    "0000111110100000000100",
    "0000000000000000000101",
    "0000000000101101000110",
    "0000000000000010100111",
    "1000000000010001000000",
    "1000000000110000000000",
    "1000000001000000000000",
    "1000000001010000000000",
    "1000000001100000000000",
    "1000000001110000000000",
    "1000000001110000000000",
  ];

  return (
    <div className="h-screen grid grid-cols-7 gap-4">
      {/* CONFIG */}
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
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-8 gap-1 relative">
              <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
                <label className="font-medium">Decimal</label>
                <input className="w-full bg-gray-300 rounded-sm py-2 px-4" />
              </div>
            </div>
            <div className="grid grid-cols-8 gap-1 relative">
              <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
                <label className="font-medium">Binario</label>
                <input className="w-full bg-gray-300 rounded-sm py-2 px-4" />
              </div>
            </div>
            <div className="grid grid-cols-8 gap-1 relative">
              <div className="flex flex-wrap gap-1 col-start-2 col-span-6">
                <label className="font-medium">Hexadecimal</label>
                <input className="w-full bg-gray-300 rounded-sm py-2 px-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* EDITOR */}
      {/* https://es.stackoverflow.com/questions/498354/numerar-l%C3%ADneas-en-un-textarea-de-html */}
      <div className="col-span-3 bg-[#EFF2F5] p-8">
        <textarea
          className="w-full bg-[#EFF2F5] focus:outline-none h-full resize-none"
          placeholder="Write your asm here..."
        ></textarea>
      </div>
      {/* OUTPUT */}
      <div className="col-span-2 bg-[#263238]">
        <div className="flex flex-wrap w-full p-8 gap-6">
          {/* --- BIN OUTPUT --- */}
          <div className="w-full p-4 bg-[#222D32] text-white relative z-0">
            <button className="flex gap-x-2 absolute top-0 right-0 text-white z-50 border py-1.5 px-2 mt-2 mr-2 rounded-md">
              <FiCopy className="w-4 h-4" />
            </button>
            <div className="text-base">
              {bin.map((line) => (
                <>
                  <span>{line}</span>
                  <br />
                </>
              ))}
            </div>
          </div>
          {/* --- MEM OUTPUT --- */}
          <div className="w-full p-4 bg-[#222D32] text-white relative z-0">
            <button className="flex gap-x-2 absolute top-0 right-0 text-white z-50 border py-1.5 px-2 mt-2 mr-2 rounded-md">
              <FiCopy className="w-4 h-4" />
            </button>
            <div className="text-base">
              <span>
                v2.0 raw <br />
                ea601 ea602 ea603 3e804 5 b46 a7 200440 200c00 201000 201400
                201800 201c00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
