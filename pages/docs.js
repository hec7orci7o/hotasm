import { MDXRemote } from "next-mdx-remote";
import { getPost } from "../libs/mdxUtils";
import { serialize } from "next-mdx-remote/serialize";

export default function Article({ source, frontMatter }) {
  return (
    <div>
      <article className="prose mx-auto text-justify">
        <MDXRemote {...source} />
      </article>
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
