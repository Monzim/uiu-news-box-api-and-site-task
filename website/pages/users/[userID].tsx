import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

type User = {
  id: string;
  name: string;
  email: string;
};

function MyComponent({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user: User =
    data === undefined ? { id: "", name: "", email: "" } : data;

  if (user.id === "") {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            User Not Found
            <Bottom />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center mt-4 ">
        <div className="w-10/12 lg:w-1/2  p-4 rounded-lg border-2 border-black">
          <div className="flex justify-between ">
            <h1 className="text-2xl font-bold text-center">User Details</h1>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <div className="font-bold">ID</div>
              <div>{user.id}</div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="font-bold">Name</div>
              <div className="font-semibold text-lg uppercase">{user.name}</div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="font-bold font-mono">Email</div>
              <span
                className="
            text-center
            whitespace-nowrap text-lg rounded-full bg-purple-100 px-2.5 py-0.5   text-purple-600"
              >
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID = context.params?.userID;
  try {
    const response = await fetch(`http://localhost:8080/users/${userID}`, {
      mode: "no-cors",
    });
    const data = await response.json();
    return { props: { data } };
  } catch (error) {}

  return { props: {} };
};

export default MyComponent;

const Bottom = () => {
  return (
    <>
      <div>
        <div className="flex justify-center items-center mt-6 text-center text-gray-500">
          <div>
            <p>See other users just change the id in the url</p>
            <p className="mt-2">
              Example: <Link href="/users/2">/users/2</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
