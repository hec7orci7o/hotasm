import Split from "react-split";
import Layout from "../components/V2/Layout";
import { useState } from "react";
import {
  FiUpload,
  FiTrash,
  FiDownload,
  FiCopy,
  FiSmartphone,
  FiFolder,
  FiLayers,
} from "react-icons/fi";
import useApp from "../hooks/useApp";

export default function V2() {
  const {
    // modulo configuracion
    loadFormat,
    unloadFormat,
    // modulo editor
    binary,
    memory,
    updateProgram,
  } = useApp();
  const [format, setFormat] = useState();
  const [nBits, setBits] = useState();

  return (
    <div className="flex-1 h-full bg-gray-500 text-white overflow-hidden">
      <Split
        className="flex h-full"
        sizes={[75, 25]}
        minSize={[0, 350]}
        maxSize={[Infinity, 500]}
        gutterSize={4}
        gutterAlign="center"
      >
        <Split
          className="flex-auto bg-gray-500"
          direction="vertical"
          minSize={[0, 0]}
          maxSize={[Infinity, Infinity]}
          gutterSize={4}
          gutterAlign="center"
        >
          <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
            <div className="flex items-center justify-between gap-6 px-6 h-10">
              <span className="text-sm font-bold opacity-50 capitalize">
                code
              </span>
              <div className="flex items-center gap-6">
                <button onClick={() => {}}>
                  <FiDownload className="text-lg stroke-1" />
                </button>
                <button onClick={() => {}}>
                  <FiCopy className="text-lg stroke-1" />
                </button>
              </div>
            </div>
            <textarea
              onChange={(e) => {
                updateProgram(e.target.value);
              }}
              className="flex-1 flex p-6 bg-transparent resize-none focus:outline-none text-base font-mono"
            />
          </div>
          <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
            <div className="flex items-center justify-between gap-6 px-6 h-10">
              <div>
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
                <button onClick={() => loadFormat(format, nBits)}>
                  <FiUpload className="text-lg stroke-1" />
                </button>
                <button onClick={() => unloadFormat}>
                  <FiTrash className="text-lg stroke-1" />
                </button>
              </div>
            </div>
            <textarea
              onChange={(e) => {
                setFormat(e.target.value);
              }}
              className="flex-1 flex p-6 bg-transparent resize-none focus:outline-none text-base font-mono"
            />
          </div>
        </Split>
        <div className="flex-auto flex divide-x divide-gray-500 bg-dark overflow-hidden text-base">
          <div className="flex flex-col items-center gap-6 h-full p-3">
            <button onClick={() => {}}>
              <FiSmartphone className="text-lg stroke-1" />
            </button>
            <button onClick={() => {}}>
              <FiFolder className="text-lg stroke-1" />
            </button>
            <button onClick={() => {}}>
              <FiLayers className="text-lg stroke-1" />
            </button>
          </div>
          <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
            <div className="flex items-center justify-between gap-6 px-6 h-10">
              <span className="text-sm font-bold opacity-50 capitalize">
                output
              </span>
              <div className="flex items-center gap-6">
                <button onClick={() => {}}>
                  <FiDownload className="text-lg stroke-1" />
                </button>
                <button onClick={() => {}}>
                  <FiCopy className="text-lg stroke-1" />
                </button>
              </div>
            </div>
            <code className="h-full flex-1 p-6">
              {binary[1].map((line) => (
                <>{line}</>
              ))}
            </code>
          </div>
        </div>
      </Split>
    </div>
  );
}

V2.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
