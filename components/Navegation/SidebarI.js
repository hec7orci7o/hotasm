import Link from 'next/link';
import {FiTerminal, FiBookOpen, FiGithub} from 'react-icons/fi';
import {useScreen} from '@/context/ScreenContext';

export default function Sidebar() {
  const {leftSidebar, handleDocs} = useScreen();
  return (
    <div className="flex flex-col items-center bg-dark text-white">
      <Link href="/">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal hover:bg-white hover:bg-opacity-10 cursor-pointer">
          <span className="px-5">
            <FiTerminal className="text-xl stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm opacity-60 px-4 capitalize w-24 text-center">editor</span>
          )}
        </a>
      </Link>
      <button
        onClick={handleDocs}
        className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal hover:bg-white hover:bg-opacity-10 cursor-pointer"
      >
        <span className="px-5">
          <FiBookOpen className="text-lg stroke-1" />
        </span>
        {!leftSidebar && (
          <span className="text-sm opacity-60 px-4 capitalize w-24 text-center">docs</span>
        )}
      </button>
      <Link href="https://github.com/hec7orci7o/asm-editor">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal hover:bg-white hover:bg-opacity-10 cursor-pointer">
          <span className="px-5">
            <FiGithub className="text-lg stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm opacity-60 px-4 capitalize w-24 text-center">repo</span>
          )}
        </a>
      </Link>
      {/* <Link href="#">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal hover:bg-white hover:bg-opacity-10 cursor-not-allowed">
          <span className="px-5">
            <FiSettings className="text-lg stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm opacity-60 px-4 capitalize w-24 text-center">settings</span>
          )}
        </a>
      </Link> */}
    </div>
  );
}
