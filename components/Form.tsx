import Link from "next/link";
import { FormEvent } from "react";

type Post = {
  prompt: string;
  tag: string;
};

type FormProps = {
  type: string;
  post: Post;
  submitting: boolean;
  setPost: (post: Post) => void;
  handleSubmit: (e: FormEvent) => void;
};

export default function Form({
  handleSubmit,
  post,
  setPost,
  submitting,
  type,
}: FormProps) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            required
            value={post.prompt}
            className="form_textarea"
            placeholder="Write your post here"
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            required
            type="text"
            value={post.tag}
            placeholder="#Tag"
            className="form_input"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
