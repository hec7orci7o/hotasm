import Head from "next/head";

export default function Meta({ title, keywords, description }) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="keywords" content="Assembly, Code, Editor" />
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  title: "HOTASM",
  keywords: "unizar, universidad de zaragoza, zaragoza, ic, aoc2, ensamblador, asm",
  description: "Assembler to binary translator to save time and headache.",
};
