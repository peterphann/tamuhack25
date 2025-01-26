"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Afacad } from "next/font/google";
import PlaneOverlay from "~/app/_components/plane-overlay";
import FlightCard from "~/app/_components/flight-card";
import Link from "next/link";

const afacad = Afacad({
  subsets: ["latin"],
});

export default function Manage() {
  const searchParams = useSearchParams();
  const flight = searchParams.get("flight");
  const [flightData, setFlightData] = useState<any>(null);

  useEffect(() => {
    if (flight) {
      setFlightData(JSON.parse(flight as string));
      console.log(JSON.parse(flight as string));
    }
  }, [flight]);

  if (!flightData) {
    return null;
  }

  return (
    <>
      <PlaneOverlay />

      <div className={"mx-32 my-10"}>
        <h1 className={"text-6xl font-bold " + afacad.className}>
          Flight {flightData.flight_id}
        </h1>

        <div className="flex flex-col gap-4">
        <FlightCard flight={flightData} index={0} header={false} />
      <div className="mx-32 mt-10">
        <h1 className={"text-6xl font-bold " + afacad.className}>
          Flight {flightData.flight_id}
        </h1>
      </div>
      <div className="mx-32 mt-4">
        <p className={"text-xl text-[#808080] " + afacad.className}>
          Sorry your flight was <span className="text-[#FF8080]">canceled</span>
          . Here are your options...
        </p>
      </div>
        <div className="w-1/3 origin-bottom translate-y-0 opacity-75 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer hover:opacity-100">
          <p className="mb-2 text-xl font-semibold">Hotel Voucher</p>
          <div className="h-96 flex flex-col justify-between rounded-lg bg-[#F5F6F8] p-6 shadow-lg">
            <div>
              <p>
                If your flight is canceled or significantly delayed due to reasons
                within American Airlines&apos; control (e.g., maintenance issues),
                and you are away from your home city, the airline will provide...
              </p>
              <ul className="mt-4 list-outside list-disc pl-4">
                <li>A voucher for an approved hotel with available rooms.</li>
                <li>Transportation to and from the hotel.</li>
                <li>Meal vouchers if the delay exceeds 3 hours.</li>
              </ul>
            </div>
            <Button className="mt-4 bg-black text-white hover:bg-gray-600">
              <Link
                href={{
                  pathname: "/hotels",
                  query: {
                    latitude: flightData.origin.location.latitude,
                    longitude: flightData.origin.location.longitude,
                    airportCode: flightData.origin.code,
                  },
                }}
              >
                Redeem Vouchers
              </Link>
            </Button>
          </div>
        </div>

        <Link href="/itinerary/create" className="w-1/3 origin-bottom translate-y-0 opacity-75 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer hover:opacity-100">
          <p className="mb-2 text-xl font-semibold">Itinerary Planning</p>
          <div className="h-96 rounded-lg bg-[#F5F6F8] p-6 shadow-lg flex flex-col justify-between">
            <p>
              Are you stuck in a city you are unfamiliar with? Make an itinerary
              with Flock to turn your delay into a fun day!
            </p>
            <Button className="mt-4 bg-black text-white hover:bg-gray-600">
              Create an Itinerary
            </Button>
          </div>
        </Link>

        <div className="w-1/3 origin-bottom translate-y-0 opacity-75 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer hover:opacity-100">
          <p className="mb-2 text-xl font-semibold">Car Rentals</p>
          <div className="h-96 rounded-lg bg-[#F5F6F8] p-6 shadow-lg flex flex-col justify-between">
            <p>
              We know that it can be challenging to find transportation in a new
              city. Use Flock&apos;s car rental management system to arrange a
              car rental within minutes and have transportation to travel around
              the city you are delayed in.
            </p>
            <Button className="mt-4 bg-black text-white hover:bg-gray-600">
              Search for Rentals
            </Button>
          </div>
        </div>
      </div>
      </div>
      
    </>
  );
}
