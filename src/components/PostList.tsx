"use client"
import { CategoriesEnum, Post } from "@/src/app/api/types/types";
import { PostCard } from "@/src/components/PostCard";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { TabsList } from "@/src/components/TabsList";
import { ServerResponse } from "../app/api/types/types";

interface PostListProps {
  initialPosts: Post[]
}

const postLimitPerPage = 6;

export const PostList = (props: PostListProps) => {
    const {initialPosts} = props;
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [tab, setTab] = useState<CategoriesEnum>(CategoriesEnum.All);
    const [inputValue, setInputValue] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [currentPost, setCurrentPost] = useState(0);
    const firstRender = useRef(true);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const fetchPosts = useCallback(
      async () => {
        let requestUrl: string;
        if(tab === CategoriesEnum.All) {
          requestUrl = `http://localhost:3000/api/posts?limit=${postLimitPerPage}&start=${currentPost}&search=${inputValue}`;
        } else {
          requestUrl = `http://localhost:3000/api/posts?category=${tab}&limit=${postLimitPerPage}&start=${currentPost}&search=${inputValue}`;
        }
        const response = await fetch(requestUrl);
        const updatedPosts: ServerResponse = await response.json();
        setPosts(updatedPosts.posts);
        setHasMore(updatedPosts.hasMore);
      }, 
      [currentPost, inputValue, tab]
    )

    const goBack = () => {
      if (currentPost > 0) {
        setCurrentPost(prev => prev - postLimitPerPage);
      }
    };

    const goForward = () => {
      if (hasMore) {
        setCurrentPost(prev => prev + postLimitPerPage);
      }
    };

    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      fetchPosts();
    }, [currentPost, tab, inputValue, fetchPosts]);

    const handleTabClick = (tab: CategoriesEnum) => {
      setTab(tab);
      setCurrentPost(0);
    }

    return (
      <div className="w-1200 flex flex-col gap-5">
        <div className="flex gap-10 justify-between items-center">
          <TabsList tab={tab} handleTabClick={handleTabClick}/>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter something..."
            className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
          />
        </div>
        <div className="flex h-40 justify-between">

          {currentPost !== 0 && 
            <button
              onClick={goBack}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 active:shadow-inner transition-all duration-150"
            >
              Go back
            </button>
          }

          {hasMore && 
            <button
              onClick={goForward}
              className="ml-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 active:shadow-inner transition-all duration-150"
            >
              Go forward
            </button>
          }

        </div>
        <div className="flex flex-wrap gap-7 pt-2 pb-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
        </div>
      </div>
    );
};
