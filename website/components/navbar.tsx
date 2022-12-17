import Link from "next/link";

const Navbar = () => {
  const random = () => {
    return Math.floor(Math.random() * 15) + 1;
  };
  return (
    <nav className="flex items-center justify-between px-4 pb-1 pt-2 bg-gray-800">
      <div className="flex items-center font-bold text-xl text-white">
        <Link href={"/"}>MONZIM</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/add"
          type="button"
          className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-900"
        >
          Add User
        </Link>

        <Link
          href="/users"
          type="button"
          className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-900"
        >
          Users
        </Link>
        <Link
          href={`/users/${random()}`}
          type="button"
          className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
        >
          Find User
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
