import React from "react";

const Navbar = () => {
  return (
    <div className="font-afacad mb-16 flex w-full">
      <img src="logo.svg" alt="logo" />
      <div className="item-center mr-24 flex flex-1 justify-end gap-16 text-lg">
        <p>Dashboard</p>
        <p>Itineraries</p>
        <p>Support</p>
        <p>Account</p>
      </div>
    </div>
  );
};

export default Navbar;
