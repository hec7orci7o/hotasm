import Layout from "../components/Layout";
import Editor from "../components/Editor";
import Configuracion from "../components/Configuration";
import SidebarD from "../components/SidebarD";
import Split from "react-split";
import useApp from "../hooks/useApp";
import { getPost } from "../libs/mdxUtils";
import { serialize } from "next-mdx-remote/serialize";
import { useScreen } from "../context/ScreenContext";

export default function Home() {
  const {
    formatError,
    // modulo configuracion
    loadFormat,
    unloadFormat,
    // modulo editor
    binary,
    memory,
    updateProgram,
  } = useApp();
  const { hLayout, rightSidebar } = useScreen();

  return (
    <div className="flex-auto h-full bg-gray-500 text-white overflow-hidden">
      <Split
        className="flex h-full"
        sizes={[75, 25]}
        minSize={[0, 350]}
        maxSize={[Infinity, 500]}
        gutterSize={!rightSidebar ? 4 : 0}
        gutterAlign="center"
      >
        {/* Futura implementacion <- actualemte bug */}
        {hLayout && false ? (
          <Split
            className="flex"
            sizes={[50, 50]}
            minSize={[0, 0]}
            maxSize={[Infinity, Infinity]}
            gutterSize={4}
            gutterAlign="center"
          >
            <div className="bg-red-500">
              {/* <Editor updateProgram={updateProgram} /> */}
            </div>
            <div className="bg-red-500">
              {/* <Configuracion
                loadFormat={loadFormat}
                unloadFormat={unloadFormat}
              /> */}
            </div>
          </Split>
        ) : (
          <Split
            className=""
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
                error={formatError}
                loadFormat={loadFormat}
                unloadFormat={unloadFormat}
              />
            </div>
          </Split>
        )}
        {!rightSidebar && <SidebarD binary={binary} memory={memory} />}
      </Split>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
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
