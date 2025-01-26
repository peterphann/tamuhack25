"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Afacad } from "next/font/google";
import { RiPlaneFill } from "react-icons/ri";
import Link from "next/link";

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
        console.log(data);
        setFlightData(data.flights);
        setHasCanceled(data.canceled);
      }
    } catch (err) {
      console.log("An error occurred while fetching flight data.");
    }
  };

  const parseDate = (timestamp: string): { date: string; time: string } => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchFlights();
    }
  }, [session]);

  if (!session) {
    return;
  }

  return (
    <div className="mx-24 my-16">
      <div className="fixed bottom-20 right-20 -z-50 h-96 w-96 -rotate-45 scale-[2.5] opacity-5">
        <RiPlaneFill className="h-full w-full" />
      </div>

      <div className="flex flex-col">
        <div className={"flex gap-4 " + afacad.className}>
          <h1 className="mb-2 text-7xl font-bold">
            Welcome, {session.user.name}!
          </h1>
        </div>
        <div className={afacad.className}>
          <p className="text-xl font-light opacity-50">
            Manage your <span className="text-red">canceled</span> flights and
            plans
          </p>
          {hasCanceled && (
            <div className="mt-8 flex gap-2">
              <img src="warning.svg" alt="" />
              <p className="text-base text-red">
                One of your flights was canceled!
              </p>
            </div>
          )}
        </div>
        {flightData.map((flight: any, index: number) => (
          <div className="mt-12 flex flex-col" key={index}>
            <div className="flex items-center gap-4">
              <p className="text-lg font-bold">Flight {flight.flight_id}</p>
              <Link
                href={{
                  pathname: "/manage",
                  query: { flight: JSON.stringify(flight) },
                }}
              >
                <p className="group cursor-pointer rounded-3xl bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300">
                  Manage{" "}
                  <span className="duration-100 ease-in-out group-hover:ml-2">
                    &#8594;
                  </span>
                </p>
              </Link>
              {flight.canceled && (
                <p className="flex-1 text-right text-red">Status: canceled</p>
              )}
            </div>

            <div className="my-4 grid grid-cols-[2fr_7fr_2fr] items-center justify-between rounded bg-slate-100 p-4 px-8 shadow-md">
              <div className="flex flex-col">
                <p className="font-light">
                  {parseDate(flight.departureTime).date}
                </p>
                <p className="text-lg font-semibold">
                  {parseDate(flight.departureTime).time}
                </p>
                <p className="font-light">
                  {flight.destination.city}, , US ({flight.destination.code})
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <img src="beeline1.svg" alt="" className="w-5/12" />
                <p className="w-fit text-sm text-center flex justify-center rounded-lg border border-solid border-slate-400 bg-white px-3 py-1 text-lg font-semibold">
                  {flight.duration.hours} hr {flight.duration.minutes} min
                </p>
                <img src="beeline2.svg" alt="" className="w-5/12" />
              </div>
              <div className="flex flex-col text-right">
                <p className="font-light">
                  {parseDate(flight.arrivalTime).date}
                </p>
                <p className="text-lg font-semibold">
                  {parseDate(flight.arrivalTime).time}
                </p>
                <p className="font-light">
                  {flight.origin.city}, , US ({flight.origin.code})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
