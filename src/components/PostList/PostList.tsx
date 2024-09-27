"use client";
import { useState } from "react";
import { IPost } from "@/types/Post";
import { POSTS_PER_PAGE } from "@/utils/constants";
import { getPosts } from "@/services/layers/posts";
import PostCard from "../PostCard";

type PostListProps = {
  initialPosts: IPost[];
};

const PostList = ({ initialPosts }: PostListProps) => {
  const [offset, setOffset] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMorePosts = async () => {
    if (hasMoreData) {
      const apiPosts = await getPosts(offset, POSTS_PER_PAGE);

      if (apiPosts.length == 0) {
        setHasMoreData(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...apiPosts]);
      setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
    }
  };


  return (
    <>
      <div className="post-list [counter-reset:post-index]">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="text-center mt-5">
        {hasMoreData ? (
          <button
            className="px-4 py-3 bg-slate-500 hover:bg-slate-600 text-slate-50 rounded-md"
            onClick={loadMorePosts}
          >
            Load More
          </button>
        ) : null }
      </div>
    </>
  );
};

export default PostList;
