import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "src/constants";
import { getToken } from "src/utils";

const Layout = ({ children }) => {
  const history = useHistory();
  const pathName = history.location.pathname;

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios
        .get(`${apiURL}/users/me`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data) {
            history.push("/");
          } else {
            history.push("/login");
          }
        })
        .catch((err) => {
          if (err.response.data.statusCode === 401) {
            history.push("/login");
          }
        });
    } else {
      history.push("/login");
    }
  }, [history]);

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
