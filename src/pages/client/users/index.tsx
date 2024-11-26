import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args: [RequestInfo | URL, RequestInit?]) =>
  fetch(...args).then((res) => res.json());
const GetAlluser = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/users",
    fetcher
  );
  console.log({ error, isLoading });

  console.log("data", data);
  /*  

   this is the older way of getting the data fro the api and show it on the ui.
  const [users, setUsers] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchuser = async () => {
      const data = await fetch("https://dummyjson.com/users");
      const respdata = await data.json();

      console.log("respdata", respdata);
      setUsers([...respdata.users]);
    };

    fetchuser();
  }, []);

  const showUserDetail = (id: number) => {
    console.log("idddd", id);
  };

*/

  if (isLoading) {
    return <h1>Loading.................</h1>;
  }

  if (error) {
    return <h1>something error. {error}</h1>;
  }

  return (
    <div>
      <h3>List of All users in client side page.</h3>

      <div className="flex flex-wrap gap-4">
        {data?.users?.map(
          (user: { username: string; image: string; id: number }) => (
            <div
              className="border-slate-900 border-dotted p-3 cursor-pointer"
              key={user.id}
              onClick={() => router.push(`/client/users/${user.id}`)}
            >
              <p>{user.username}</p>
              <img src={user.image} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GetAlluser;
