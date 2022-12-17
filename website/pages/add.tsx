import Head from "next/head";
import { useState } from "react";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      console.log("name", name);
      console.log("email", email);

      const response = await fetch(
        `http://localhost:8080/form?name=${name}&email=${email}`,
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Successfully added user to database");
      setEmail("");
      setName("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Add User</title>
      </Head>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Add Data to the Database
            </h1>
            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 mb-0 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Name"
                />
              </div>
            </div>

            <div>
              <label className="sr-only" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Email"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`${
                  email && name
                    ? "ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    : "ml-3 inline-block rounded-lg bg-gray-300 px-5 py-3 text-sm font-medium text-white w-4/12"
                } `}
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddUser;
