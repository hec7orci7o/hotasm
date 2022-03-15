import Link from "next/link";
import { FiTerminal, FiGithub, FiSettings } from "react-icons/fi";
import { useScreen } from "../../context/ScreenContext";

export default function Sidebar() {
  const { leftSidebar } = useScreen();
  return (
    <div className="flex flex-col items-center bg-dark text-white">
      <Link href="http://localhost:3000/pro">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal w-full hover:bg-gray-800 cursor-pointer">
          <span className="px-3">
            <FiTerminal className="text-xl stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm opacity-60 px-4 capitalize">editor</span>
          )}
        </a>
      </Link>
      <Link href="https://github.com/hec7orci7o/asm-editor">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal w-full hover:bg-gray-800 cursor-pointer">
          <span className="px-3">
            <FiGithub className="text-lg stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm opacity-60 px-4 capitalize">repo</span>
          )}
        </a>
      </Link>
      <Link href="#">
        <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal w-full hover:bg-gray-800 cursor-not-allowed">
          <span className="px-3">
            <FiSettings className="text-lg stroke-1" />
          </span>
          {!leftSidebar && (
            <span className="text-sm opacity-60 px-4 capitalize">settings</span>
          )}
        </a>
      </Link>
    </div>
  );
}
