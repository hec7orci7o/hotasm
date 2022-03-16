import Sidebar from "../components/V1/Sidebar";
import Editor from "../components/V1/Editor";
import Output from "../components/V1/Output";
import useApp from "../hooks/useApp";
import Link from "next/link";
import { FiBook, FiGithub, FiGift } from "react-icons/fi";

export default function Legacy() {
  const {
    // modulo configuracion
    loadFormat,
    unloadFormat,
    // modulo editor
    binary,
    memory,
    updateProgram,
  } = useApp();

  return (
    <div className="h-screen grid grid-cols-7 gap-4 overflow-hidden">
      {/* CONFIG */}
      <Sidebar load={loadFormat} unload={unloadFormat} />
      <div className="flex flex-wrap gap-y-2 col-start-3 col-span-3 py-4 px-8">
        <div className="h-16 flex justify-between items-center w-full border-2 p-4 text-base font-mono">
          <div></div>
          <div className="flex gap-4">
            <a href="https://www.buymeacoffee.com/hec7orci7o">
              <FiGift className="w-5 h-5 opacity-80 hover:brightness-150 hover:opacity-100" />
            </a>
            <a href="https://github.com/hec7orci7o/asm-editor">
              <FiGithub className="w-5 h-5 opacity-80 hover:brightness-150 hover:opacity-100" />
            </a>
            <Link href="/docs">
              <a href="https://github.com/hec7orci7o/asm-editor">
                <FiBook className="w-5 h-5 opacity-80 hover:brightness-150 hover:opacity-100" />
              </a>
            </Link>
          </div>
        </div>
        {/* EDITOR */}
        <Editor write={updateProgram} />
      </div>

      {/* OUTPUT */}
      <Output bin={binary} mem={memory} />
    </div>
  );
}
