import { GetStaticPaths, GetStaticProps } from 'next';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostProps {
  post: Post;
}

// Fetch all posts to generate paths
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://dummyjson.com/posts');
  const posts = await res.json();

  const paths = posts.posts.map((post: Post) => ({
    params: { post: post.id.toString() }, // Convert id to string for dynamic routes
  }));

  return { paths, fallback: false }; // fallback: false means other routes return 404
};

// Fetch post data for each path
export const getStaticProps: GetStaticProps = async (context) => {
  const { post } = context.params as { post: string };
  const res = await fetch(`https://dummyjson.com/posts/${post}`);
  const postData = await res.json();

  return {
    props: {
      post: postData,
    },
  };
};

// Component to display a single post
export default function PostPage({ post }: PostProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        {post.title}
      </h1>
      <p className="text-gray-800 text-base">{post.body}</p>
    </div>
  );
}
