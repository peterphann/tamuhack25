"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hotels() {
  const searchParams = useSearchParams();
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const airportCode = searchParams.get("airportCode");
  const [hotelResults, setHotelResults] = useState<any>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      if (!latitude || !longitude) {
        console.error("Latitude and longitude are required.");
        return;
      }

      try {
        const response = await fetch(
          `/api/hotels?latitude=${latitude}&longitude=${longitude}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hotel data");
        }

        const data = await response.json();

        // Modify prices to $100, sort by rating, and cap at 10 results
        const processedHotels = data
          .map((hotel: any) => ({ ...hotel, price: 100 }))
          .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 9);

        setHotelResults(processedHotels);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, [latitude, longitude]);

  if (!hotelResults) {
    return <p className="mx-32 mt-10 text-xl">Loading hotel data...</p>;
  }

  return (
    <div className="mx-32 mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Hotels near {airportCode || "your location"}
        </h1>
        <p className="text-xl font-medium text-gray-700">
          You have <span className="font-bold text-black">$1000</span> in
          American Airline Credits
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {hotelResults.map((hotel: any, index: number) => (
          <div key={index} className="rounded-lg bg-gray-100 p-6 shadow-md">
            {hotel.photo && (
              <img
                src={hotel.photo}
                alt={`Photo of ${hotel.name}`}
                className="mb-4 h-40 w-full rounded-lg object-cover"
              />
            )}
            <div className="mb-2 flex justify-between">
              <p className="text-xl font-bold">${hotel.price}</p>
              <p className="text-sm text-gray-500">{hotel.rating || "N/A"}/5</p>
            </div>
            <h2 className="mb-1 text-lg font-semibold">{hotel.name}</h2>
            <p className="mb-4 text-sm text-gray-500">
              {hotel.address || "Address not available"}
            </p>
            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded bg-black px-4 py-2 text-center text-white hover:bg-gray-700"
            >
              Book Hotel
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
