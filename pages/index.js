import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Output from "../components/Output";

export default function Home() {
  return (
    <div className="h-screen grid grid-cols-7 gap-4">
      {/* CONFIG */}
      <Sidebar />
      {/* EDITOR */}
      <Editor />
      {/* OUTPUT */}
      <Output />
    </div>
  );
}
