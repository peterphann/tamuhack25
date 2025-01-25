import React from "react";

const Navbar = () => {
  return (
    <div className="font-afacad mb-16 flex w-full justify-between">
      <img src="logo.svg" alt="logo" />
      <div className="flex items-center gap-16 text-lg">
        <p>Dashboard</p>
        <p>Itineraries</p>
        <p>Support</p>
        <p>Account</p>
        <img src="pfp.svg" alt="" className="w-12" />
      </div>
    </div>
  );
};

export default Navbar;
