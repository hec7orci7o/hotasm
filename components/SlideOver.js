import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Logisim from '@/components/output/Logisim';
import Binary from '@/components/output/Binary';
import { toPainText, toLogisim } from '@/lib/outputFormarters';
import toast from 'react-hot-toast';

export default function SlideOver({
  open,
  setOpen,
  output,
}) {
  const [selected, setSelected] = useState('binary');
  const [downloadLink, setDownloadLink] = useState('');

  const swithselected = () => {
    if (selected === 'binary') setSelected('logisim');
    else setSelected('binary');
  };

  const makeTextFile = (content, type) => {
    try {
      // This creates the file.
      const data = new Blob([content], { type });
      // this part avoids memory leaks
      if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink);
      // update the download link state
      setDownloadLink(window.URL.createObjectURL(data));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (Array.isArray(output) && output.length > 0) {
      if (selected === 'binary') makeTextFile(toPainText(output), 'text/plain');
      else if (selected === 'logisim') makeTextFile(toLogisim(output), 'text/plain');
    }
  }, [selected]);

  return (
    <Transition.Root show={ open } as={ Fragment }>
      <Dialog as="div" className="relative z-10" onClose={ setOpen }>
        <div className="fixed inset-0" />
        <Transition.Child
          as={ Fragment }
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-60 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={ Fragment }
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <Transition.Child
                    as={ Fragment }
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-sm text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={ () => setOpen(false) }
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll pb-6">
                      <div className="bg-gray-900 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            {
                              selected === 'logisim' ? 'Logisim output' :
                                selected === 'binary' ? 'Binary output' : ''
                            }
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md text-indigo-200 hover:text-white focus:outline-none"
                              onClick={ swithselected }
                            >
                              <span className="sr-only">Change type of output</span>
                              <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-200">
                            { selected === 'logisim' && 'Aquí puedes ver la vista previa de la memoria de tu programa en Logisim.' }
                            { selected === 'binary' && 'Aquí puedes ver las instrucciones en binario de tu programa.' }
                          </p>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Replace with your content */ }
                        <div className="absolute inset-0 px-4 sm:px-6 pb-6">
                          <div className="h-fit p-4 flex justify-center items-center border-2 border-dashed border-gray-300 overflow-x-auto" aria-hidden="true">
                            { selected === 'logisim' && <Logisim binary={ output } /> }
                            { selected === 'binary' && Array.isArray(output) && <Binary binary={ output } /> }
                          </div>
                        </div>
                        {/* /End replace */ }
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 duration-300 focus:ring-emerald focus:ring-offset-2"
                        onClick={ () => setOpen(false) }
                      >
                        Cancelar
                      </button>
                      <a
                        href={ downloadLink }
                        download={
                          selected === 'logisim' ? 'memory.txt' :
                            selected === 'binary' ? 'binary.txt' : ''
                        }
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-emerald/80 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald focus:outline-none focus:ring-2 duration-300 focus:ring-emerald focus:ring-offset-2"
                      >
                        Descargar
                      </a>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
