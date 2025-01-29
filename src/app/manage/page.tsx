"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FlightCard from "~/components/flight-card";
import Link from "next/link";
import PlaneOverlay from "~/components/plane-overlay";
import type { Flight } from "~/types/types";
import { cn } from "~/lib/utils";
import { afacad } from "~/fonts/fonts";

const Manage = () => {
  const searchParams = useSearchParams();
  const flight = searchParams.get("flight");
  const [flightData, setFlightData] = useState<Flight | null>(null);

  useEffect(() => {
    if (flight) {
      setFlightData(JSON.parse(flight) as Flight);
    }
  }, [flight]);

  if (!flightData) {
    return;
  }

  return (
    <div className="mx-32 mb-32">
      <PlaneOverlay />
      <div className="mt-10">
        <h1 className={cn("text-6xl font-bold", afacad.className)}>
          Flight {flightData.flightNumber}
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <FlightCard flight={flightData} header={false} />
        {flightData.isCanceled
        ? <p className={cn("text-xl text-[#808080]", afacad.className)}>
          We&apos;re deeply sorry that your flight was <span className="text-[#FF8080]">canceled</span>. Here are your options.
        </p>
        : <p className={cn("text-xl text-[#808080]", afacad.className)}>
          Your flight is scheduled to depart on time. However, you can still manage your Flock services below.
        </p>}
      </div>
      <div className="my-8 flex flex-row justify-between gap-4">
        <Link
          draggable="false"
          href={`/itinerary/create?location=${flightData.origin.city}&date=${flightData.departureTime}`}
          className="w-1/3 origin-bottom translate-y-0 select-none transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer active:translate-y-0 active:scale-100"
        >
          <p className="mb-4 text-xl font-semibold">Itinerary Planning</p>
          <div className="flex h-full flex-col justify-between rounded-lg bg-[#F5F6F8] p-6 shadow-lg">
            <Image
              src="/itinerary.webp"
              alt=""
              width={"400"} height={"400"}
              className="mb-4 w-auto h-[320px] rounded object-cover"
            />
            <p>
              Are you stuck in a city that you are unfamiliar with? Have a specific
              travel plan in mind? Make an itinerary in seconds with Flock to turn your
              delay into a fun day!
            </p>
            <Button className="mt-4 bg-black text-white hover:bg-gray-600">
              Create an Itinerary
            </Button>
          </div>
        </Link>

        <Link
          href={{
            pathname: "/hotels",
            query: {
              latitude: flightData.origin.location.latitude,
              longitude: flightData.origin.location.longitude,
              airportCode: flightData.origin.code,
              flightId: flightData.flightNumber,
            },
          }}
          draggable="false"
          className="w-1/3 origin-bottom translate-y-0 select-none transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer active:translate-y-0 active:scale-100"
        >
          <p className="mb-4 text-xl font-semibold">Hotel Vouchers</p>
          <div className="flex h-full flex-col justify-between rounded-lg bg-[#F5F6F8] p-6 shadow-lg">
            <Image
              src="/hotel.jpg"
              alt=""
              width={"400"} height={"400"}
              className="mb-4 w-auto h-[320px] rounded object-cover"
            />
            <p>
              If your flight is canceled or significantly delayed due to reasons
              within American Airlines&apos; control (e.g., maintenance issues),
              American Airlines will provide hotel vouchers for you to stay comfortable
              in the meantime.
            </p>
            <Button className="mt-4 bg-black text-white hover:bg-gray-600">
              Redeem Vouchers
            </Button>
          </div>
        </Link>

        <Link
          draggable="false"
          href={{
            pathname: "/rentals",
            query: { flight: JSON.stringify(flightData) },
          }}
          className="w-1/3 origin-bottom translate-y-0 select-none transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer active:translate-y-0 active:scale-100"
        >
          <p className="mb-4 text-xl font-semibold">Car Rentals</p>
          <div className="flex h-full flex-col justify-between rounded-lg bg-[#F5F6F8] p-6 shadow-lg">
            <Image
              src="/car_rental.png"
              alt=""
              width={"400"} height={"400"}
              className="mb-4 w-auto h-[320px] rounded object-cover"
            />
            <p>
              Finding transportation in an unfamiliar city can be a grueling task.
              Flock&apos;s car rental management system helps arrange a
              car rental within minutes to provide transportation around the city you
              are delayed in.
            </p>
            <Button className="mt-4 bg-black text-white hover:bg-gray-600">
              Find a Rental
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Manage;
