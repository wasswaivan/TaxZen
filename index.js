import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout from '../components/Layout';

export async function getStaticProps() {
  const files = fs.readdirSync('posts');
  const posts = files.map(file => {
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join('posts', file), 'utf8');
    const { data } = matter(content);
    return { slug, ...data };
  });
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <Layout>
      <h1>The Ledger Lounge</h1>
      <p>Where accounting meets insight, culture, and clarity.</p>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <strong>{post.title}</strong> <em>({post.date})</em>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
