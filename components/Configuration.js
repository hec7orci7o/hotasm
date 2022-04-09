import { FiUpload, FiTrash } from "react-icons/fi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Tippy from "@tippyjs/react";

export default function Configuracion({ loadFormat, unloadFormat }) {
  const [format, setFormat] = useState();
  const [nBits, setBits] = useState();
  const { status } = useSession();

  return (
    <>
      <div className="flex items-center justify-between gap-6 px-6 h-10 min-h-10">
        <div className="flex flex-nowrap items-center">
          <span className="text-sm font-bold opacity-50 capitalize">
            configuration
          </span>
          <input
            maxLength={2}
            className="font-mono caret-white ml-4 w-8 h-8 bg-transparent rounded-lg border-2 text-sm border-white border-opacity-20 p-1 focus:outline-none"
            onChange={(e) => setBits(Number(e.target.value))}
          />
          <span id="inst" name="inst" className="ml-2 font-mono">
            bits
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Tippy
            arrow={false}
            content={
              <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Load configuration
              </span>
            }
          >
            <button
              onClick={() => {
                if (status === "authenticated") {
                  loadFormat(format, nBits);
                } else if (process.env.NODE_ENV === "development") {
                  loadFormat(format, nBits);
                }
              }}
            >
              <FiUpload className="text-lg stroke-1 hover:text-green-300" />
            </button>
          </Tippy>
          <Tippy
            arrow={false}
            content={
              <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Delete configuration
              </span>
            }
          >
            <button onClick={() => unloadFormat()}>
              <FiTrash className="text-lg stroke-1 hover:text-red-300" />
            </button>
          </Tippy>
        </div>
      </div>
      <textarea
        onChange={(e) => setFormat(e.target.value)}
        className="flex-1 flex p-6 bg-transparent resize-none focus:outline-none text-base font-mono"
      />
    </>
  );
}
