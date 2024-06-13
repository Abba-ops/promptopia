"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

export interface Post {
  creator: {
    email: string;
    username: string;
    image: string;
    _id: string;
  };
  prompt: string;
  tag: string;
  _id: string;
}

type PromptCardListProps = {
  data: Post[];
  handleTagClick: (tagName: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export default function Feed() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const filterPrompts = (searchText: string): Post[] => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    const searchResult = filterPrompts(value);
    setSearchedResults(searchResult);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${apiDomain}/api/prompt`);
      const data: Post[] = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}>
        <input
          required
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          placeholder="Search for a tag or a username"
        />
      </form>

      <PromptCardList
        data={searchText ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
}
