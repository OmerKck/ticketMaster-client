import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useHistory } from "react-router-dom";

const Layout = ({ children }) => {
  const router = useHistory();
  const pathName = router.location.pathname;

  return (
    <>
      {pathName === "/login" || pathName === "/register" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
