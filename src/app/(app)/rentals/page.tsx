"use client";

import { Afacad } from "next/font/google";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiStarFill } from "react-icons/ri";
import type { AggregateFlightDetails, Car } from "~/app/types/types";
import { cn } from "~/lib/utils";

const afacad = Afacad({
  subsets: ["latin"],
});

export default function Rentals() {
  const searchParams = useSearchParams();
  const flight = searchParams.get("flight");
  const [flightData, setFlightData] = useState<AggregateFlightDetails | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (flight) {
      setFlightData(JSON.parse(flight) as AggregateFlightDetails);
    }
  }, [flight]);

  useEffect(() => {
    async function fetchCars() {
      const response = await fetch("cars.json");
      const data: Car[] = await response.json() as Car[];

      const randomCars = data.sort(() => 0.5 - Math.random()).slice(0, 10);
      setCars(randomCars);
    }

    fetchCars()
    .then(() => setIsLoading(false))
    .catch(err => console.error(err));
  }, []);

  if (!flightData) {
    return;
  }

  return (
    <div className="mx-32 my-10">
      <div className={cn("mb-6 flex items-center justify-between", afacad.className)}>
        <h1 className="text-4xl font-bold">
          Rentals near {flightData.origin.city || "your location"}
        </h1>
        <p className="text-xl font-medium text-gray-700">
          You have <span className="font-bold text-black">$1000</span> in
          American Airline Credits
        </p>
      </div>

      {isLoading && <p className={afacad.className}>Loading rental cars...</p>}

      <div className="grid grid-cols-3 gap-8">
        {cars.map((car: Car, index: number) => (
          <div key={index} className="rounded-lg bg-gray-100 p-6 shadow-md">
            <Image className="mb-4 h-40 w-full rounded-lg object-cover" src={car.image} alt="car" width="400" height="400"  />
            <div className="mb-2 flex justify-between">
              <p className="text-xl font-bold">${car.price}/day</p>
              <p className="text-sm text-gray-500 flex items-center gap-x-1">
                <span>{car.rating || "N/A"} / 5</span>
                <RiStarFill className="opacity-50" />
              </p>
            </div>
            <h2 className="mb-1 text-lg font-semibold">
              {car.make + " " + car.model}
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              {flightData.origin.city}
            </p>
            <a
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded bg-black px-4 py-2 text-center text-white hover:bg-zinc-800 transition-colors"
            >
              Rent Car
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
