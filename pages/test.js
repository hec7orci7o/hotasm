import { MDXRemote } from "next-mdx-remote";
import { getPost } from "../libs/mdxUtils";
import { serialize } from "next-mdx-remote/serialize";

export default function Test({ source, frontMatter }) {
  return (
    <div className="flex flex-nowrap h-screen w-full  relative">
      <div className="h-full w-3/4 bg-dark opacity-20" />
      <div className="h-full w-1/4 absolute right-0 bg-green-400 z-50 overflow-auto px-6 opacity-100">
        <article className="prose mx-auto text-justify">
          <MDXRemote {...source} />
        </article>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { content, data } = getPost("doc");
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
