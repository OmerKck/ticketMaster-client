import React, { useEffect, useState } from "react";
import { getToken } from "src/utils";
import axios from "axios";
import { apiURL } from "src/constants";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState("");
  const history = useHistory();
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
            setUsername(res.data.username);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <div className="flex justify-between mb-10">
      <p className="mr-2">Hello:, {username}</p>
      <button
        type="button"
        className=" transition-all transition duration-1000 ease-in-out bg-blue-800 w-full sm:w-auto font-bold uppercase text-white rounded py-1 px-2 text-xs shadow-md hover:bg-red-900"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
