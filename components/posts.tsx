import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import togglePostLikeStatus from "@/actions/toggleLikes";

export interface Post {
  isLiked: boolean;
  id: number;
  title: string;
  image: string;
  userFirstName: string;
  createdAt: string;
  content: string;
  imageUrl: string;
  userId: number;
}

function Post({ post }: { post: Post }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
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
              action={togglePostLikeStatus.bind(null, post.id)}
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
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((postItem) => (
        <li key={postItem.id}>
          <Post post={postItem} />
        </li>
      ))}
    </ul>
  );
}
