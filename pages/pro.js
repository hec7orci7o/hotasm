import Layout from "../components/V2/Layout";
import Editor from "../components/V2/Editor";
import Configuracion from "../components/V2/Configuration";
import SidebarD from "../components/V2/SidebarD";
import Split from "react-split";
import useApp from "../hooks/useApp";
import { memo } from "react/cjs/react.production.min";

export default function V2() {
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
    <div className="flex-1 h-full bg-gray-500 text-white overflow-hidden">
      <Split
        className="flex h-full"
        sizes={[75, 25]}
        minSize={[0, 350]}
        maxSize={[Infinity, 500]}
        gutterSize={4}
        gutterAlign="center"
      >
        <Split
          className="flex-auto bg-gray-500"
          direction="vertical"
          minSize={[0, 0]}
          maxSize={[Infinity, Infinity]}
          gutterSize={4}
          gutterAlign="center"
        >
          <Editor updateProgram={updateProgram} />
          <Configuracion loadFormat={loadFormat} unloadFormat={unloadFormat} />
        </Split>
        <SidebarD binary={binary} memory={memory} />
      </Split>
    </div>
  );
}

V2.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
