import { FiCopy } from "react-icons/fi";
import copy from "copy-to-clipboard";
import toast, { Toaster } from 'react-hot-toast';

export default function Field({ name, value, update, select }) {
  return (
    <div className="h-10 flex flex-nowrap justify-between items-center gap-x-4 w-full bg-gray-800 bg-opacity-20">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center w-20 min-w-[2rem] h-full border-r-2 border-gray-800 border-opacity-40 px-3">
        <span className="font-sans font-medium text-base opacity-80 text-left w-full select-none">
          {name}
        </span>
      </div>
      <input
        type="text"
        onClick={() => select()}
        onChange={(e) => update(e.target.value)}
        className="text-lg font-mono w-full border-b-2 border-gray-800 border-opacity-40 focus:border-opacity-100 bg-transparent focus:outline-none "
        value={value}
      />
      <div className="flex justify-center items-center w-20 h-full font-sans font-medium text-xl border-l-2 border-gray-800 border-opacity-40 px-3">
        <button
          onClick={() =>
            {
              copy(value, {
              debug: false,
              format: "text/plain",
            })
            toast.success('content copied to clipboard.')
          }}
          className="rounded-md"
        >
          <FiCopy className="text-lg text-white stroke-1 hover:text-green-300" />
        </button>
      </div>
    </div>
  );
}
