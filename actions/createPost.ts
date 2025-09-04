"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export default async function createPost(
  prev: { errors: string[] } | void,
  formData: FormData
): Promise<{ errors: string[] } | void> {
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
  const content = formData.get("content") as string;

  const errors: string[] = [];
  if (!title || title.trim() === "") {
    errors.push("Title is required.");
  }

  if (!content || content.trim() === "") {
    errors.push("Content is required.");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl: string;

  try {
    imageUrl = await uploadImage(image);
  } catch {
    throw new Error("Image upload to cloudinary failed");
  }

  await storePost({
    title,
    content,
    imageUrl: imageUrl,
    userId: 1,
  });

  redirect("/feed");
}
