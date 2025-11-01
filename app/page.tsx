import { Suspense } from "react";

import Posts, { Post } from "@/components/posts";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Main page",
  description: "Browse and share amazing posts.",
};
async function LatestPosts() {
  const latestPosts = (await getPosts(2)) as Post[];
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here&apos;s what you might&apos;ve missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
