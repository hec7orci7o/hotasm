import { FiDownload, FiCopy } from "react-icons/fi";
import { useState } from "react";
import copy from "copy-to-clipboard";
import Tippy from "@tippyjs/react";

export default function Editor({ updateProgram }) {
  const [program, setProgram] = useState();

  return (
    <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
      <div className="flex items-center justify-between gap-6 px-6 h-10">
        <span className="text-sm font-bold opacity-50 capitalize">code</span>
        <div className="flex items-center gap-6">
          <Tippy
            arrow={false}
            content={
              <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Download code
              </span>
            }
          >
            <button onClick={() => {}}>
              <FiDownload className="text-lg stroke-1 hover:text-green-300" />
            </button>
          </Tippy>
          <Tippy
            arrow={false}
            content={
              <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Copy code
              </span>
            }
          >
            <button
              onClick={() =>
                copy(program, {
                  debug: false,
                  format: "text/plain",
                })
              }
            >
              <FiCopy className="text-lg stroke-1 hover:text-green-300" />
            </button>
          </Tippy>
        </div>
      </div>
      <textarea
        onChange={(e) => {
          updateProgram(e.target.value);
          setProgram(e.target.value);
        }}
        className="flex-1 flex p-6 bg-transparent resize-none focus:outline-none text-base font-mono"
      />
    </div>
  );
}
