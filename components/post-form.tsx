"use client";

import { useActionState } from "react";
import FormSubmit from "./form-submit";

export default function PostForm({
  action,
}: {
  action: (
    prev: { errors: string[] } | void,
    formData: FormData,
  ) => Promise<{ errors: string[] } | void>;
}) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>

        {state?.errors && (
          <ul className="form-errors">
            {state.errors.map((error: string) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}
      </form>
    </>
  );
}
