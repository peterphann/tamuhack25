import React from "react";
import Navbar from "./_components/navbar";

const Dashboard = () => {
  return (
    <div className="m-16">
      <Navbar />
      <div className="flex flex-col">
        <div className="flex gap-4">
          <h1 className="font-afacad mb-2 text-7xl font-bold">
            Welcome, Meeba Peeba!
          </h1>
          <img src="airplane.svg" alt="" />
        </div>
        <div>
          <p className="mb-8 text-xl font-light opacity-50">
            Manage your <span className="text-red">canceled</span> flights and
            plans
          </p>
          <div className="flex">
            <img src="warning.svg" alt="" />
            <p className="text-red text-base">
              One of your flights was cancelled!
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <p>Flight UA1358</p>
            <p>Manage &#8594;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
