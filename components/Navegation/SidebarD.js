import {
  FiDownload,
  FiCopy,
  FiSmartphone,
  FiFolder,
  FiLayers,
} from 'react-icons/fi';
import copy from 'copy-to-clipboard';
import {useState, useEffect} from 'react';
import Tippy from '@tippyjs/react';
import Field from '../Field';
import useCalc from '../../hooks/useCalc';
import toast, {Toaster} from 'react-hot-toast';

export default function SidebarD({binary, memory}) {
  const [downloadBinary, setDownloadBinary] = useState('');
  const [downloadMemory, setDownloadMemory] = useState('');

  // function for generating file and set download link
  const makeTextFile = (_var1, _var2) => {
    try {
      // This creates the file.
      const dataBin = new Blob([_var1], {type: 'text/plain'});
      const dataMem = new Blob([_var2], {type: 'text/plain'});
      // this part avoids memory leaks
      if (downloadBinary !== '') window.URL.revokeObjectURL(downloadBinary);
      if (downloadMemory !== '') window.URL.revokeObjectURL(downloadMemory);
      // update the download link state
      setDownloadBinary(window.URL.createObjectURL(dataBin));
      setDownloadMemory(window.URL.createObjectURL(dataMem));
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    makeTextFile(String(binary[0]).replaceAll(',', '\n'), memory[0]);
  }, [binary, memory]);

  const {
    dec,
    bin,
    hex,
    updateDecimal,
    updateBinario,
    updateHexadecimal,
    setDecimal,
    setBinario,
    setHexadecimal,
  } = useCalc();

  const estados = {
    conversor: 'conversor',
    binario: 'binary',
    memoria: 'memory',
  };

  const [state, setState] = useState(estados['binario']);
  const handleCopy = () => {
    if (state === estados['binario']) {
      copy(String(binary[0]).replace(/,/g, '\n'), {
        debug: false,
        format: 'text/plain',
      });
    } else if (state === estados['memoria']) {
      copy(memory[0], {
        debug: false,
        format: 'text/plain',
      });
    }
    toast.success('content copied to clipboard.');
  };

  return (
    <div className="flex divide-x divide-gray-500 bg-dark text-base">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center gap-6 h-full p-3">
        <Tippy
          arrow={false}
          placement="left"
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Converter
            </span>
          }
        >
          <button onClick={() => setState(estados['conversor'])}>
            <FiSmartphone
              className={`text-lg stroke-1 
            ${state === estados['conversor'] ? 'text-indigo-400' : ''}`}
            />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          placement="left"
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Binary output
            </span>
          }
        >
          <button onClick={() => setState(estados['binario'])}>
            <FiFolder
              className={`text-lg stroke-1 
            ${state === estados['binario'] ? 'text-indigo-400' : ''}`}
            />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          placement="left"
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Memory output
            </span>
          }
        >
          <button onClick={() => setState(estados['memoria'])}>
            <FiLayers
              className={`text-lg stroke-1 
            ${state === estados['memoria'] ? 'text-indigo-400' : ''}`}
            />
          </button>
        </Tippy>
      </div>
      <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
        <div className="flex items-center justify-between gap-6 px-6 h-10">
          <span className="text-sm font-bold opacity-50 capitalize">
            output
          </span>
          {state !== estados['conversor'] && (
            <div className="flex items-center gap-6">
              <Tippy
                arrow={false}
                placement="top"
                content={
                  <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                    Download output
                  </span>
                }
              >
                <a
                  href={
                    state === estados['binario'] ?
                      downloadBinary :
                      downloadMemory
                  }
                  download={
                    state === estados['binario'] ? 'binary.txt' : 'memory.txt'
                  }
                >
                  <FiDownload className="text-lg stroke-1 hover:text-green-300" />
                </a>
              </Tippy>
              <Tippy
                arrow={false}
                placement="top"
                content={
                  <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                    Copy output
                  </span>
                }
              >
                <button onClick={handleCopy}>
                  <FiCopy className="text-lg stroke-1 hover:text-green-300" />
                </button>
              </Tippy>
            </div>
          )}
        </div>
        {state === estados['conversor'] && (
          <div className="flex w-full p-8">
            <div className="flex flex-wrap gap-2">
              <Field
                name="Dec"
                value={dec}
                update={updateDecimal}
                select={setDecimal}
              />
              <Field
                name="Bin"
                value={bin}
                update={updateBinario}
                select={setBinario}
              />
              <Field
                name="Hex"
                value={hex}
                update={updateHexadecimal}
                select={setHexadecimal}
              />
            </div>
          </div>
        )}
        {state === estados['binario'] && (
          <code className="h-1/2 flex-1 font-mono p-6 overflow-y-scroll">
            {binary[1].map((line) => (
              <>{line}</>
            ))}
          </code>
        )}
        {state === estados['memoria'] && (
          <div className="h-full flex-1 text-base font-mono p-6">
            <span>{memory[1]}</span>
          </div>
        )}
      </div>
    </div>
  );
}
