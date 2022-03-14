import {
  FiColumns,
  FiMaximize,
  FiMinimize,
  FiSidebar,
  FiShare2,
} from "react-icons/fi";

export default function Footer() {
  return (
    <div className="flex justify-between items-center h-8 w-full bg-dark text-white">
      <div className="flex gap-4 px-2">
        <FiSidebar className="text-lg cursor-pointer stroke-1" />
        <FiMaximize className="text-lg cursor-pointer stroke-1" />
      </div>
      <div className="flex gap-4 px-2">
        <FiShare2 className="text-lg cursor-pointer stroke-1" />
        <FiColumns className="text-lg cursor-pointer stroke-1" />
        <FiSidebar className="text-lg cursor-pointer stroke-1 rotate-180" />
      </div>
    </div>
  );
}
