"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Afacad } from "next/font/google";
import FlightCard from "~/app/_components/flight-card";
import PlaneOverlay from "~/app/_components/plane-overlay";
import type { user_flights } from "@prisma/client";
import { RiErrorWarningLine } from "react-icons/ri";

const afacad = Afacad({
  subsets: ["latin"],
});

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [flightData, setFlightData] = useState<user_flights[]>([]);
  const [hasCanceled, setHasCanceled] = useState(false);

  const fetchFlights = async () => {
    try {
      const response = await fetch(`/api/user-flights?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setFlightData(data.flights);
        setHasCanceled(data.canceled);
      }
    } catch (err) {
      console.log("An error occurred while fetching flight data.");
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchFlights();
    }
  }, [session]);

  if (!session) {
    return;
  }

  return (
    <div className="mx-28 my-10">
      <PlaneOverlay />

      <div className="flex flex-col">
        <div className={"flex gap-4 " + afacad.className}>
          <h1 className="mb-2 text-6xl font-bold">
            Welcome, {session.user.name}!
          </h1>
        </div>
        <div className={afacad.className}>
          <p className="text-xl font-light opacity-50">
            Manage your <span className="text-red">canceled</span> flights and
            plans
          </p>
          {hasCanceled && (
            <div className="mt-8 flex items-center gap-2 text-red">
              <RiErrorWarningLine />
              <p className="text-base">
                One of your flights was canceled!
              </p>
            </div>
          )}
        </div>
        {flightData.map((flight: any, index: number) => (
          <FlightCard flight={flight} index={index} header={true} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
