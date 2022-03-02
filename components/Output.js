import { FiCopy } from "react-icons/fi";

export default function Output() {
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
    <div className="col-span-2 bg-[#263238]">
      <div className="flex flex-wrap w-full p-8 gap-6">
        {/* --- BIN OUTPUT --- */}
        <div className="w-full p-4 bg-[#222D32] text-white relative z-0">
          <button className="flex gap-x-2 absolute top-0 right-0 text-white z-50 border py-1.5 px-2 mt-2 mr-2 rounded-md">
            <FiCopy className="w-4 h-4" />
          </button>
          <div className="text-base">
            {bin.map((line, id) => (
              <div key={id}>
                <span>{line}</span>
                <br />
              </div>
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
  );
}
