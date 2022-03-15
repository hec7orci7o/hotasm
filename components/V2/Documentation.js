import { MDXRemote } from "next-mdx-remote";
import { FiX } from "react-icons/fi";
import { useScreen } from "../../context/ScreenContext";

export default function Documentation({ source, frontMatter }) {
  const { docsActive, handleDocs } = useScreen();

  return (
    <div
      className={`fixed right-0  flex-nowrap h-screen w-full z-50 
      ${docsActive ? "flex" : "hidden"}`}
    >
      <div className="h-full w-3/4 bg-dark opacity-95" />
      <div className="flex flex-col divide-y  h-full w-1/4 absolute right-0 bg-white z-50 overflow-auto opacity-100">
        <div className="flex  items-center justify-between h-16 w-full p-6">
          <h1 className="text-2xl font-sans font-bold">Documentation</h1>
          <button onClick={handleDocs}>
            <FiX className="text-xl cursor-pointer" />
          </button>
        </div>
        <article className="prose mx-auto text-justify z-50 p-6">
          <MDXRemote {...source} />
        </article>
      </div>
    </div>
  );
}
