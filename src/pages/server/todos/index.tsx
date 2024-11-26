import { useRouter } from "next/router";

const Todos = ({ todos }: any) => {
  const Router = useRouter();

  return (
    <div>
      <h1>this is the all todos page.</h1>
      <div>
        {todos.todos.map((todo: { todo: string; id: number }) => (
          <p
            key={todo.id}
            className="cursor-pointer"
            onClick={() => Router.push(`/server/todos/${todo.id}`)}
          >
            {" "}
            {todo.todo}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Todos;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://dummyjson.com/todos");
  const todos = await res.json();
  // Pass data to the page via props
  return { props: { todos } };
}
