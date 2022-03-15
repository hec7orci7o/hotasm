import Layout from "../components/V2/Layout";
import Editor from "../components/V2/Editor";
import Configuracion from "../components/V2/Configuration";
import SidebarD from "../components/V2/SidebarD";
import Split from "react-split";
import useApp from "../hooks/useApp";
import { getPost } from "../libs/mdxUtils";
import { serialize } from "next-mdx-remote/serialize";
import { useScreen } from "../context/ScreenContext";

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

  const { hLayout, rightSidebar, handleLayout, handleSr } = useScreen();

  return (
    <div className="flex-auto h-full bg-gray-500 text-white overflow-hidden">
      <Split
        className="flex h-full"
        sizes={[75, 25]}
        minSize={[0, 350]}
        maxSize={[Infinity, 500]}
        gutterSize={4}
        gutterAlign="center"
      >
        {hLayout ? (
          <Split className="flex" gutterSize={4} gutterAlign="center">
            <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
              <Editor updateProgram={updateProgram} />
            </div>
            <div className="flex-1 flex-s flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
              <Configuracion
                loadFormat={loadFormat}
                unloadFormat={unloadFormat}
              />
            </div>
          </Split>
        ) : (
          <Split
            className="flex-auto"
            sizes={[50, 50]}
            minSize={[0, 0]}
            maxSize={[Infinity, Infinity]}
            direction="vertical"
            gutterSize={4}
            gutterAlign="center"
          >
            <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
              <Editor updateProgram={updateProgram} />
            </div>
            <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
              <Configuracion
                loadFormat={loadFormat}
                unloadFormat={unloadFormat}
              />
            </div>
          </Split>
        )}
        <SidebarD binary={binary} memory={memory} />
      </Split>
    </div>
  );
}

V2.getLayout = function getLayout(page) {
  const docs = page.props;
  return <Layout docs={docs}>{page}</Layout>;
};

export const getStaticProps = async () => {
  const { content, data } = getPost("docs");
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
