import { getPosts } from "@/services/layers/posts";
import { POSTS_PER_PAGE } from "@/utils/constants";
import PostList from "../components/PostList";

const Home = async () => {
  const initialPosts = await getPosts(0, POSTS_PER_PAGE);

  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">
          Loading posts asynchronously
        </h1>

        <PostList initialPosts={initialPosts} />
      </div>
    </>
  );
}


export default Home