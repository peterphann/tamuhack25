"use client";

import { Afacad } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const afacad = Afacad({
  subsets: ["latin"],
});

export default function Rentals() {
  const searchParams = useSearchParams();
  const flight = searchParams.get("flight");
  const [flightData, setFlightData] = useState<any>(null);
  const [cars, setCars] = useState<any>([]);

  useEffect(() => {
    if (flight) {
      setFlightData(JSON.parse(flight as string));
    }
  }, [flight]);

  useEffect(() => {
    async function fetchCars() {
      const response = await fetch("cars.json");
      const data = await response.json();

      const randomCars = data.sort(() => 0.5 - Math.random()).slice(0, 10);
      setCars(randomCars);
    }

    fetchCars();
  }, []);

  if (!flightData) {
    return;
  }

  return (
    <div className="mx-32 my-16">
      <div className={cn("mb-6 flex items-center justify-between", afacad.className)}>
        <h1 className="text-4xl font-bold">
          Rentals near {flightData.origin.city || "your location"}
        </h1>
        <p className="text-xl font-medium text-gray-700">
          You have <span className="font-bold text-black">$1000</span> in
          American Airline Credits
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {cars.map((car: any, index: number) => (
          <div key={index} className="rounded-lg bg-gray-100 p-6 shadow-md">
            <img
              src={car.image}
              className="mb-4 h-40 w-full rounded-lg object-cover"
            />
            <div className="mb-2 flex justify-between">
              <p className="text-xl font-bold">${car.price}/day</p>
              <p className="text-sm text-gray-500">{car.rating || "N/A"}</p>
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
              className="block w-full rounded bg-black px-4 py-2 text-center text-white hover:bg-gray-700"
            >
              Rent Car
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
