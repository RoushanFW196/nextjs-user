import { Router, useRouter } from "next/router";

// Import necessary types for TypeScript
interface Post {
  id: number;
  title: string;
  body: string;
}

interface AllPostsProps {
  posts: {
    posts: Post[];
  };
}

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}

export default function AllPosts({ posts }: AllPostsProps) {
  const Router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        All Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => Router.push(`/static/posts/${post.id}`)}
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
