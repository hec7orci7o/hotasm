import { FiTerminal, FiBookOpen, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center w-20 bg-dark text-white">
      <div className="flex flex-col justify-center items-center gap-2 h-20 tracking-normal w-full hover:bg-gray-800 cursor-pointer">
        <FiTerminal className="text-lg stroke-1" />
        <span className="text-sm opacity-60">Editor</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 h-20 tracking-normal w-full hover:bg-gray-800 cursor-pointer">
        <FiBookOpen className="text-lg stroke-1" />
        <span className="text-sm opacity-60">Docs</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 h-20 tracking-normal w-full hover:bg-gray-800 cursor-pointer">
        <FiSettings className="text-lg stroke-1" />
        <span className="text-sm opacity-60">Settings</span>
      </div>
    </div>
  );
}
