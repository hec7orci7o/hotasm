import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Output from "../components/Output";
import useEditor from "../hooks/useEditor";
import useSettings from "../hooks/useSettings";

export default function Home() {
  const { config, translator, addConf, updateConf, removeConf } = useSettings();
  const { binOut, memOut, updateCode } = useEditor(translator);

  return (
    <div className="h-screen grid grid-cols-7 gap-4">
      {/* CONFIG */}
      <Sidebar
        config={config}
        addConf={addConf}
        updateConf={updateConf}
        removeConf={removeConf}
      />
      {/* EDITOR */}
      <Editor write={updateCode} />
      {/* OUTPUT */}
      <Output bin={binOut} mem={memOut} />
    </div>
  );
}
