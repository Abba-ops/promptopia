"use client";

import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect, Suspense } from "react";

interface Post {
  prompt: string;
  tag: string;
}

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

function UpdatePromptContent() {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });

  const router = useRouter();

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`${apiDomain}/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
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

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`${apiDomain}/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default function UpdatePrompt() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptContent />
    </Suspense>
  );
}
