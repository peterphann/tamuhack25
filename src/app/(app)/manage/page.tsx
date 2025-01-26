"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Afacad } from "next/font/google";
import FlightCard from "~/app/_components/flight-card";
import Link from "next/link";
import PlaneOverlay from "~/app/_components/plane-overlay";

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
    return;
  }

  return (
    <div className="mx-32 mb-32">
      <PlaneOverlay />
      <div className="mt-10">
        <h1 className={"text-6xl font-bold " + afacad.className}>
          Flight {flightData.flight_id}
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <FlightCard flight={flightData} index={0} header={false} />
        <p className={"text-xl text-[#808080] " + afacad.className}>
          Sorry your flight was <span className="text-[#FF8080]">canceled</span>
          . Here are your options...
        </p>
      </div>
      <div className="my-8 flex flex-row justify-between gap-4">
        <Link
          draggable="false"
          href={`/itinerary/create?location=${flightData.origin.city}&date=${flightData.departureTime}`}
          className="w-1/3 origin-bottom translate-y-0 select-none transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer active:translate-y-0 active:scale-100"
        >
          <p className="mb-4 text-xl font-semibold">Itinerary Planning</p>
          <div className="flex h-full flex-col justify-between rounded-lg bg-[#F5F6F8] p-6 shadow-lg">
            <img
              src="itinerary.webp"
              alt=""
              className="mb-4 h-[320px] rounded object-cover"
            />
            <p>
              Are you stuck in a city you are unfamiliar with? Make an itinerary
              with Flock to turn your delay into a fun day!
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
              flightId: flightData.flight_id,
            },
          }}
          draggable="false"
          className="w-1/3 origin-bottom translate-y-0 select-none transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer active:translate-y-0 active:scale-100"
        >
          <p className="mb-4 text-xl font-semibold">Hotel Voucher</p>
          <div className="flex h-full flex-col justify-between rounded-lg bg-[#F5F6F8] p-6 shadow-lg">
            <img
              src="hotel.jpg"
              alt=""
              className="mb-4 h-[320px] rounded object-cover"
            />
            <p>
              If your flight is canceled or significantly delayed due to reasons
              within American Airlines&apos; control (e.g., maintenance issues),
              and you are away from your home city, the airline will provide...
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
            <img
              src="car_rental.png"
              alt=""
              className="mb-4 h-[320px] rounded object-cover"
            />
            <p>
              We know that it can be challenging to find transportation in a new
              city. Use Flock&apos;s car rental management system to arrange a
              car rental within minutes and have transportation to travel around
              the city you are delayed in.
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
