import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Layout from '../../components/Layout';

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map(file => ({
    params: { slug: file.replace('.md', '') }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join('posts', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  return {
    props: {
      frontMatter: data,
      content: processedContent.toString()
    }
  };
}

export default function Post({ frontMatter, content }) {
  return (
    <Layout>
      <h1>{frontMatter.title}</h1>
      <p><em>{frontMatter.date} • {frontMatter.author}</em></p>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
