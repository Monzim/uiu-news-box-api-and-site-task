import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

type User = {
  id: string;
  name: string;
  email: string;
};

function MyComponent({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const users: User[] = data;

  return (
    <>
      <Head>
        <title>All Users</title>
      </Head>
      <div className="overflow-x-auto justify-center flex">
        <table className="w-11/12 divide-y-2 divide-gray-200 text-sm ">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(users as User[]).map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch("http://localhost:8080/users", {
    mode: "no-cors",
  });
  const data = await response.json();

  return { props: { data } };
};

export default MyComponent;
