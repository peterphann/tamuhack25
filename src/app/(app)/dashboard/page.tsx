"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Afacad } from "next/font/google";
import FlightCard from "~/app/_components/flight-card";
import PlaneOverlay from "~/app/_components/plane-overlay";
import { RiErrorWarningLine } from "react-icons/ri";
import type { AggregateFlightDetails, UserFlightInfo } from "~/app/types/types";

const afacad = Afacad({
  subsets: ["latin"],
});

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [flightData, setFlightData] = useState<AggregateFlightDetails[]>([]);
  const [hasCanceled, setHasCanceled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFlights = async () => {
    try {
      const response = await fetch(`/api/user-flights?user_id=${userId}`);
      if (response.ok) {
        const data: UserFlightInfo = await response.json() as UserFlightInfo;
        setFlightData(data.flights);
        setHasCanceled(data.canceled);
      }
    } catch (err) {
      console.log("An error occurred while fetching flight data.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchFlights()
      .then(() => setIsLoading(false))
      .catch(err => console.error(err));
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
            plans.
          </p>

          {
            isLoading && <p className="mt-8 text-lg">Loading your flights...</p>
          }
          {hasCanceled && (
            <div className="mt-8 flex items-center gap-2 text-red">
              <RiErrorWarningLine />
              <p className="text-base">
                One of your flights was canceled!
              </p>
            </div>
          )}
        </div>
        {flightData.map((flight: AggregateFlightDetails, index: number) => (
          <FlightCard flight={flight} key={index} header={true} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
