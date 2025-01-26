"use client"

import React from "react";
import Image from "next/image";
import { RiPlaneFill } from "react-icons/ri";
import FlightCard from "~/app/_components/flight-card";
import { useSession } from "next-auth/react";
import { Afacad } from "next/font/google"

const afacad = Afacad({
    subsets: ['latin']
})

const Dashboard = () => {
    const {data: session, status} = useSession()

  return (
    <div className="mx-24 my-16">
        <div className="fixed -z-50 bottom-20 right-20 scale-[2.5] -rotate-45 w-96 h-96 opacity-5">
            <RiPlaneFill className="w-full h-full" />
        </div>

      <div className="flex flex-col">
        <div className="flex gap-4">
          <h1 className={"font-afacad mb-2 text-6xl font-bold " + afacad.className}>
            Welcome, {session?.user.name}!
          </h1>
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
        
        <div>
            <FlightCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
