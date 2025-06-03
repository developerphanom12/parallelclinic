import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className=" flex flex-col relative h-[100vh] overflow-x-hidden overflow-y-hidden">
      <Nav className="sm:h-[16vh]  h-[10vh]" />
      <main className="sm:h-[84vh] h-[90vh] ">{children}</main>
    </div>
  );
};

export default Layout;
