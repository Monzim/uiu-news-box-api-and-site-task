import Navbar from "./navbar";

const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
};

export default Layout;
