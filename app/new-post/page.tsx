import PostForm from "@/components/post-form";
import createPost from "@/actions/createPost";

export default function NewPostPage() {
  return <PostForm action={createPost} />;
}
