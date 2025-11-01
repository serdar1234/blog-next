"use client";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import togglePostLikeStatus from "@/actions/toggleLikes";
import { useOptimistic } from "react";
import Image from "next/image";

export interface Post {
  isLiked: boolean;
  id: number;
  title: string;
  image: string;
  likes: number;
  userFirstName: string;
  createdAt: string;
  content: string;
  imageUrl: string;
  userId: number;
}

interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

function Post({ post, action }: { post: Post; action: (id: number) => void }) {
  const imageLoader = (config: LoaderProps) => {
    const startUrl = config.src.split("upload/")[0];
    const endUrl = config.src.split("upload/")[1];
    const transformations = `w_200,q_auto:eco`;
    return `${startUrl}upload/${transformations}/${endUrl}`;
  };
  return (
    <article className="post">
      <div className="post-image">
        <Image
          src={post.image}
          alt={post.title}
          loader={imageLoader}
          width={200}
          height={123}
          decoding="auto"
          priority
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: Post[] }) {
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    posts,
    (previousPosts, updatedPostId) => {
      const updatedPostIndex = previousPosts.findIndex(
        (post) => post.id === updatedPostId,
      );

      if (updatedPostIndex === -1) {
        return previousPosts;
      }

      const updatedPost = { ...previousPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...previousPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    },
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId: number) {
    setOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((postItem) => (
        <li key={postItem.id}>
          <Post post={postItem} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
