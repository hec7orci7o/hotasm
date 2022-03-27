import {
  FiColumns,
  FiMaximize,
  FiMinimize,
  FiSidebar,
  FiShare2,
  FiHelpCircle,
  FiBook,
} from "react-icons/fi";
import Tippy from "@tippyjs/react";
import copy from "copy-to-clipboard";
import { useScreen } from "../context/ScreenContext";

export default function Footer() {
  const {
    leftSidebar,
    mzLayout,
    handleDocs,
    handleMode,
    handleLayout,
    handleSl,
    handleSr,
  } = useScreen();

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
          <button onClick={handleSl} className="opacity-70 hover:opacity-100">
            <FiSidebar
              className={`text-lg cursor-pointer stroke-1 text-white duration-150
               ${leftSidebar ? "rotate-180" : ""}`}
            />
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
          <button onClick={handleMode} className="opacity-70 hover:opacity-100">
            {mzLayout ? (
              <FiMinimize className="text-lg cursor-pointer stroke-1 text-white" />
            ) : (
              <FiMaximize className="text-lg cursor-pointer stroke-1 text-white" />
            )}
          </button>
        </Tippy>
      </div>
      <div className="flex gap-4 px-2">
        {/* <button
          className="flex items-center opacity-70 hover:opacity-100 cursor-not-allowed"
          disabled={true}
        >
          <FiHelpCircle className="text-lg cursor-pointer stroke-1 text-white" />
          <span className="tracking-tight text-sm py-0.5 px-1.5 rounded-md font-sans">
            Help & feedback
          </span>
        </button> */}
        <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Documentation
            </span>
          }
        >
          <button
            onClick={handleDocs}
            className="flex items-center opacity-70 hover:opacity-100"
          >
            <FiBook className="text-lg cursor-pointer stroke-1 text-white" />
          </button>
        </Tippy>
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
              copy("https://hotasm.vercel.app/", {
                debug: false,
                format: "text/plain",
              })
            }
            className="opacity-70 hover:opacity-100"
          >
            <FiShare2 className="text-lg cursor-pointer stroke-1 text-white" />
          </button>
        </Tippy>
        {/* <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Horizontal layout
            </span>
          }
        >
          <button
            onClick={handleLayout}
            className="opacity-70 hover:opacity-100"
            disabled={true}
          >
            <FiColumns className="text-lg cursor-not-allowed stroke-1 text-white" />
          </button>
        </Tippy> */}
        {/* <Tippy
          arrow={false}
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Collapse sidebar
            </span>
          }
        >
          <button
            onClick={handleSr}
            className="opacity-70 hover:opacity-100"
            disabled={true}
          >
            <FiSidebar className="text-lg cursor-not-allowed stroke-1 rotate-180 text-white" />
          </button>
        </Tippy> */}
      </div>
    </div>
  );
}
