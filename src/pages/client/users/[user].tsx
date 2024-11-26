import { useRouter } from "next/router";

import useSWR from "swr";
const fetcher = (...args: [RequestInfo | URL, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const showuserDEtails = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/users/${router.query.user}`,
    fetcher
  );
  console.log({ error, isLoading });

  console.log("data", data);
 
  /*
  const [user, setUser] = useState<any>({});
 
  console.log("router", router);

  useEffect(() => {
    const getuserdetails = async () => {
      const data = await fetch(
        `https://dummyjson.com/users/${router.query.user}`
      );
      const respdata = await data.json();
      console.log("respdatya", respdata);

      setUser(respdata);
    };

    getuserdetails();
  }, [router.query.user]);

  console.log("users", user);

  if(!user?.firstName){
      return <h1>Loading.....................</h1>
  }

     */

  return (
    <>
      <p>this is about the {router.query.user} user</p>
      <p>
        {data?.firstName}- {data?.lastName}{" "}
      </p>
      <p>{data?.university}</p>
    </>
  );
};

export default showuserDEtails;
