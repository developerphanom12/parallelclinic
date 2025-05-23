import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative h-[100vh]">
      <Nav />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
