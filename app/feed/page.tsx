import Posts, { Post } from "@/components/posts";
import { getPosts } from "@/lib/posts";

export async function generateMetadata() {
  const posts = (await getPosts()) as Post[];
  const numberOfPosts = posts.length;
  return {
    title: `All ${numberOfPosts} posts by all users`,
  };
}

export default async function FeedPage() {
  const posts = (await getPosts()) as Post[];
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
