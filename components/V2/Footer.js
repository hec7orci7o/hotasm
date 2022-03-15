import {
  FiColumns,
  FiMaximize,
  FiMinimize,
  FiSidebar,
  FiShare2,
} from "react-icons/fi";
import Tippy from "@tippyjs/react";
import copy from "copy-to-clipboard";

export default function Footer() {
  return (
    <div className="flex justify-between items-center h-8 w-full bg-dark text-white">
      <div className="flex gap-4 px-2 relative">
        <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Collapse sidebar
            </span>
          }
        >
          <button>
            <FiSidebar className="text-lg cursor-pointer stroke-1" />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Turn on Zen mode
            </span>
          }
        >
          <button>
            <FiMaximize className="text-lg cursor-pointer stroke-1" />
          </button>
        </Tippy>
      </div>
      <div className="flex gap-4 px-2">
        <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Share
            </span>
          }
        >
          <button
            onClick={() =>
              copy("https://asm-editor.vercel.app/pro", {
                debug: false,
                format: "text/plain",
              })
            }
          >
            <FiShare2 className="text-lg cursor-pointer stroke-1" />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Horizontal layout
            </span>
          }
        >
          <button>
            <FiColumns className="text-lg cursor-pointer stroke-1" />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Collapse sidebar
            </span>
          }
        >
          <button>
            <FiSidebar className="text-lg cursor-pointer stroke-1 rotate-180" />
          </button>
        </Tippy>
      </div>
    </div>
  );
}
