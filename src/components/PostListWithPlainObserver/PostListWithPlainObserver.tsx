"use client";
import { useEffect, useState } from "react";
import { IPost } from "@/types/Post";
import { POSTS_PER_PAGE } from "@/utils/constants";
import { getPosts } from "@/services/layers/posts";
import PostCard from "../PostCard";
import { useInView } from "react-intersection-observer";

type PostListProps = {
  initialPosts: IPost[];
};

const PostListWithPlainObserver = ({ initialPosts }: PostListProps) => {
  const [offset, setOffset] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [scrollTrigger, isInView] = useInView();

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
    if (isInView && hasMoreData) {
      loadMorePosts();
    }
  }, [isInView, hasMoreData]);
  


  return (
    <>
      <div className="post-list [counter-reset:post-index]">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="text-center mt-5">
      {(hasMoreData && <div ref={scrollTrigger}>Loading...</div>) || (
          <p className="...">No more posts to load</p>
        )}
      </div>
    </>
  );
};

export default PostListWithPlainObserver;
