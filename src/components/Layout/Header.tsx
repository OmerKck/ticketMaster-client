import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between mb-10">
      <p className="mr-2">Hello:, Abuzer Kadayıf</p>
      <button
        type="button"
        className=" transition-all transition duration-1000 ease-in-out bg-blue-800 w-full sm:w-auto font-bold uppercase text-white rounded py-1 px-2 text-xs shadow-md hover:bg-red-900"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
