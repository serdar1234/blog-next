import PostForm from "@/components/post-form";
import createPost from "@/actions/createPost";

export const metadata = {
  title: "New Post",
  description: "Create a new post.",
};

export default function NewPostPage() {
  return <PostForm action={createPost} />;
}
