import { useRouter } from "next/router";

const TodoDetails = ({ todo }: any) => {
  const Router = useRouter();

  return (
    <div>
      <h1>Todo Details Page</h1>
      {todo ? (
        <div>
          <h2>ID: {todo.id}</h2>
          <p>Todo: {todo.todo}</p>
          <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TodoDetails;
export async function getServerSideProps(context: any) {
  const { todo } = context.params || {}; // Safely access `id`
  if (!todo) {
    return { notFound: true }; // Return a 404 page if `id` is missing
  }

  try {
    const res = await fetch(`https://dummyjson.com/todos/${todo}`);
    const tododeatil = await res.json();

    return { props: { todo: tododeatil } };
  } catch (error) {
    console.error("Error fetching todo:", error);
    return { props: { todo: null } };
  }
}
