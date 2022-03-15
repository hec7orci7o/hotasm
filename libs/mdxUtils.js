// utils/mdxUtils.ts
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const POSTS_PATH = join(process.cwd(), "data");

function getPostFilePaths() {
  return (
    fs
      .readdirSync(POSTS_PATH)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
  );
}

export function getPost(slug) {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

export function getPostItems(filePath, fields = []) {
  const slug = filePath.replace(/\.mdx?$/, "");
  const { data, content } = getPost(slug);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const filePaths = getPostFilePaths();
  const posts = filePaths
    .map((filePath) => getPostItems(filePath, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
