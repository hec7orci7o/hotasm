import {FiUpload, FiTrash} from 'react-icons/fi';
import {useState} from 'react';
import Tippy from '@tippyjs/react';
import toast, {Toaster} from 'react-hot-toast';

export default function Configuracion({error, loadFormat, unloadFormat}) {
  const [format, setFormat] = useState();
  const [nBits, setBits] = useState();

  return (
    <>
      <div className="flex items-center justify-between gap-6 px-6 h-10 min-h-10">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex flex-nowrap items-center">
          <span className="text-sm font-bold opacity-80 capitalize">
            configuration
          </span>
          <input
            maxLength={2}
            className={`font-mono caret-black dark:caret-white ml-4 w-8 h-8 bg-transparent rounded-lg border-2 text-sm p-1 focus:outline-none
                      ${error === null || error === 2 ? 'border-black border-opacity-20 dark:border-white dark:border-opacity-20' : 'border-light-red-2 border-opacity-100 animate-[pulse_4s_ease-in-out_infinite]'}`}
            onChange={(e) => setBits(Number(e.target.value))}
            required
          />
          <span id="inst" name="inst" className="ml-2 font-mono">
            bits
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Tippy
            arrow={false}
            content={
              <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Load configuration
              </span>
            }
          >
            <button
              onClick={() => {
                loadFormat(format, nBits);
                toast.success('configuration loaded.');
              }}
            >
              <FiUpload className="text-lg stroke-1 hover:text-neutral-green-2" />
            </button>
          </Tippy>
          <Tippy
            arrow={false}
            content={
              <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Delete configuration
              </span>
            }
          >
            <button onClick={() => {
              unloadFormat();
              toast.success('configuration deleted.');
            }}
            >
              <FiTrash className="text-lg stroke-1 hover:text-light-red-2" />
            </button>
          </Tippy>
        </div>
      </div>
      <textarea
        spellCheck={false}
        onChange={(e) => setFormat(e.target.value)}
        className={`flex-1 flex p-6  resize-none focus:outline-none text-base font-mono 
                  ${error === null || error === 3 ? 'bg-transparent' : 'bg-light-red-2 bg-opacity-10 animate-[pulse_4s_ease-in-out_infinite]'}`}
      />
    </>
  );
}
