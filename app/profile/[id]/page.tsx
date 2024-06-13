"use client";

import Profile from "@/components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type UserProfileProps = {
  params: {
    id: string;
  };
};

type Post = {
  creator: {
    email: string;
    username: string;
    image: string;
    _id: string;
  };
  prompt: string;
  tag: string;
  _id: string;
};

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export default function UserProfile({ params }: UserProfileProps) {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "User";

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `${apiDomain}/api/users/${params?.id}/posts`
      );
      const data: Post[] = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
}
