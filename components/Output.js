import { FiCopy } from "react-icons/fi";
import copy from "copy-to-clipboard";

export default function Output({ bin, mem }) {
  return (
    <div className="col-span-2 bg-[#263238]">
      <div className="flex flex-wrap w-full p-8 gap-6">
        {/* --- BIN OUTPUT --- */}
        <div className="w-full p-4 bg-[#222D32] text-white relative z-0">
          <button
            onClick={() =>
              copy(String(bin).replace(/,/g, "\n"), {
                debug: false,
                format: "text/plain",
              })
            }
            className="flex gap-x-2 absolute top-0 right-0 text-white z-50 border py-1.5 px-2 mt-2 mr-2 rounded-md"
          >
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
          <button
            onClick={() =>
              copy(String(mem.props.children).replace(/,(.*), /g, "\n"), {
                debug: false,
                format: "text/plain",
              })
            }
            className="flex gap-x-2 absolute top-0 right-0 text-white z-50 border py-1.5 px-2 mt-2 mr-2 rounded-md"
          >
            <FiCopy className="w-4 h-4" />
          </button>
          <div className="text-base">
            <span>{mem}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
