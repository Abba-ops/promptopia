"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

interface Post {
  prompt: string;
  tag: string;
}

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export default function CreatePrompt() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });

  const router = useRouter();

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${apiDomain}/api/prompt/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}
