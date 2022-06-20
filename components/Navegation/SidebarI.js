import Link from 'next/link';
import {FiTerminal, FiBookOpen, FiGithub} from 'react-icons/fi';
import {useScreen} from '@/context/ScreenContext';

export default function Sidebar() {
  const {leftSidebar, handleDocs} = useScreen();
  return (
    <div className="flex flex-col items-center bg-color-5 text-white">
      <Link href="/">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal hover:bg-neutral-gray-2 hover:bg-opacity-5 cursor-pointer opacity-100">
          <span className="px-5">
            <FiTerminal className="text-xl stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm px-4 capitalize w-24 text-center">editor</span>
          )}
        </a>
      </Link>
      <button
        onClick={handleDocs}
        className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal hover:bg-neutral-gray-2 hover:bg-opacity-5 cursor-pointer opacity-50 hover:opacity-100"
      >
        <span className="px-5">
          <FiBookOpen className="text-lg stroke-1" />
        </span>
        {!leftSidebar && (
          <span className="text-sm px-4 capitalize w-24 text-center">docs</span>
        )}
      </button>
      <Link href="https://github.com/hec7orci7o/asm-editor">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal hover:bg-neutral-gray-2 hover:bg-opacity-5 cursor-pointer opacity-50 hover:opacity-100">
          <span className="px-5">
            <FiGithub className="text-lg stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm px-4 capitalize w-24 text-center">repo</span>
          )}
        </a>
      </Link>
    </div>
  );
}
