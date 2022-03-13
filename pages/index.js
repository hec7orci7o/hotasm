import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Output from "../components/Output";
import useEditor from "../hooks/useEditor";
import useSettings from "../hooks/useSettings";
import Link from "next/link";
import { FiBook, FiGithub, FiGift } from "react-icons/fi";

export default function Home() {
  const { isa, nbits, handleLoad, handleUnload } = useSettings();
  const { binOut, memOut, setCode, updateCode } = useEditor(isa, nbits);

  return (
    <div className="h-screen grid grid-cols-7 gap-4 overflow-hidden">
      {/* CONFIG */}
      <Sidebar load={handleLoad} unload={handleUnload} />
      <div className="flex flex-wrap gap-y-2 col-start-3 col-span-3 py-4 px-8">
        <div className="h-16 flex justify-between items-center w-full border-2 p-4 text-base font-mono">
          <div></div>
          <div className="flex gap-4">
            <a href="https://www.buymeacoffee.com/hec7orci7o">
              <FiGift className="w-5 h-5 opacity-80 hover:brightness-150 hover:opacity-100" />
            </a>
            <a href="https://github.com/hec7orci7o/cuddly-adventure">
              <FiGithub className="w-5 h-5 opacity-80 hover:brightness-150 hover:opacity-100" />
            </a>
            <Link href="/docs">
              <a>
                <FiBook className="w-5 h-5 opacity-80 hover:brightness-150 hover:opacity-100" />
              </a>
            </Link>
          </div>
        </div>
        {/* EDITOR */}
        <Editor write={setCode} />
      </div>

      {/* OUTPUT */}
      <Output bin={binOut} mem={memOut} />
    </div>
  );
}
