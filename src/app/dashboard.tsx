"use client"

import React from "react";
import Navbar from "./_components/navbar";

const Dashboard = () => {
  return (
    <div className="mx-24 my-16">
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
          <div className="flex gap-2">
            <img src="warning.svg" alt="" />
            <p className="text-red text-base">
              One of your flights was canceled!
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col">
          <div className="flex items-center gap-4">
            <p className="text-lg font-bold">Flight UA1358</p>
            <p className="rounded-3xl bg-slate-200 px-3 py-1 text-sm">
              Manage &#8594;
            </p>
            <p className="text-red flex-1 text-right">Status: canceled</p>
          </div>
          <div className="my-4 flex justify-between rounded bg-slate-100 p-4 px-8 shadow-md">
            <div className="flex flex-col">
              <p className="font-light">Thurs, Dec 26, 2024</p>
              <p className="text-lg font-semibold">8:10 PM</p>
              <p className="font-light">Houston, TX, US (IAH)</p>
            </div>
            <div className="flex flex-col text-right">
              <p className="font-light">Thurs, Dec 26, 2024</p>
              <p className="text-lg font-semibold">9:57 PM</p>
              <p className="font-light">Orange County, CA, US (SNA)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
