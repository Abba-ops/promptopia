"use client";

import { Post } from "@/components/Feed";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export default function MyProfile() {
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`${apiDomain}/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `${apiDomain}/api/users/${session?.user?.id}/posts`
      );
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user?.id) fetchPosts();
  }, [session?.user]);

  return (
    <Profile
      name="My"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
    />
  );
}
