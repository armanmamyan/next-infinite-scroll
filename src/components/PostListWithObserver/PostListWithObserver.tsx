"use client";
import { useEffect, useRef, useState } from "react";
import { IPost } from "@/types/Post";
import { POSTS_PER_PAGE } from "@/utils/constants";
import { getPosts } from "@/services/layers/posts";
import PostCard from "../PostCard";

type PostListProps = {
  initialPosts: IPost[];
};

const PostListWithObserver = ({ initialPosts }: PostListProps) => {
  const [offset, setOffset] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [hasMoreData, setHasMoreData] = useState(true);
  const scrollTrigger = useRef(null);

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

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (scrollTrigger.current) {
        observer.unobserve(scrollTrigger.current);
      }
    };
  }, [hasMoreData, offset]);

  return (
    <>
      <div className="post-list [counter-reset:post-index]">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="text-center mt-5">
        {hasMoreData ? <div ref={scrollTrigger}>Loading...</div> : null}
      </div>
    </>
  );
};

export default PostListWithObserver;
