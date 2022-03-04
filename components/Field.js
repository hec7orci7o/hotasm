import { FiCopy } from "react-icons/fi";
import copy from "copy-to-clipboard";

export default function Field({ name, value, update, select }) {
  return (
    <div className="h-10 flex flex-nowrap justify-between items-center gap-x-4 w-full bg-[#3B4449] bg-opacity-10">
      <div className="flex justify-center items-center w-20 h-full border-r-2 border-[#222D32] border-opacity-40 px-3">
        <span className="font-sans font-medium text-base opacity-80 text-left w-full">
          {name}
        </span>
      </div>
      <input
        type="text"
        onClick={() => select()}
        onChange={(e) => update(e.target.value)}
        dir="rtl"
        className="text-lg font-mono w-full border-b-2 border-[#222D32] border-opacity-40 focus:border-opacity-100 bg-transparent focus:outline-none caret-black"
        value={value}
      />
      <div className="flex justify-center items-center w-20 h-full font-sans font-medium text-xl border-l-2 border-[#222D32] border-opacity-40 px-3">
        <button
          onClick={() =>
            copy(value, {
              debug: false,
              format: "text/plain",
            })
          }
          className="text-[#222D32] rounded-md"
        >
          <FiCopy className="h-5 w-auto" />
        </button>
      </div>
    </div>
  );
}
