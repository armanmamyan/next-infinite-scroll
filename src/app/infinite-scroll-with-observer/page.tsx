import PostListWithObserver from "@/components/PostListWithObserver";
import { getPosts } from "@/services/layers/posts";
import { POSTS_PER_PAGE } from "@/utils/constants";

const InfiniteScroll = async () =>  {
  const initialPosts = await getPosts(0, POSTS_PER_PAGE);

  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">Loading posts on scroll</h1>
        <h3 className="text-center mb-5 text-slate-600">
          With an additional dependency (
          <a href="https://www.npmjs.com/package/react-intersection-observer">
            React Intersection Observer
          </a>
          )
        </h3>
        <PostListWithObserver initialPosts={initialPosts} />
      </div>
    </>
  );
}

export default InfiniteScroll;