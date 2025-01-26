"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Hotels() {
  const searchParams = useSearchParams();
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const airportCode = searchParams.get("airportCode");
  const flightId = searchParams.get("flightId");
  const [voucherAmount, setVoucherAmount] = useState<number | null>(null);
  const [hotelResults, setHotelResults] = useState<any>(null);
  const [inputAmount, setInputAmount] = useState<string>(""); // Input value for credits
  const [generatedCode, setGeneratedCode] = useState<string>("");

  useEffect(() => {
    const fetchVoucherAmount = async () => {
      if (!flightId) {
        console.error("Flight ID is required.");
        return;
      }

      try {
        const session = await getSession();
        if (!session || !session.user?.id) {
          console.error("User session not found.");
          return;
        }

        const response = await fetch(
          `/api/voucher?userId=${session.user.id}&flightId=${flightId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch voucher amount.");
        }

        const data = await response.json();
        setVoucherAmount(data.voucherAmount || 0);
      } catch (error) {
        console.error("Error fetching voucher amount:", error);
      }
    };

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
          throw new Error("Failed to fetch hotel data.");
        }

        const data = await response.json();

        const processedHotels = data
          .map((hotel: any) => ({ ...hotel, price: 100 }))
          .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 9);

        setHotelResults(processedHotels);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchVoucherAmount();
    fetchHotels();
  }, [latitude, longitude, flightId]);

  const handleUseCredits = async () => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0 || amount > (voucherAmount || 0)) {
      alert("Please enter a valid amount within your available credits.");
      return;
    }

    // Generate random code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setGeneratedCode(code);

    try {
      const session = await getSession();
      if (!session || !session.user?.id) {
        console.error("User session not found.");
        return;
      }

      // Subtract credits from the database
      const response = await fetch(`/api/use-credits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          flightId,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to use credits.");
      }

      // Update voucher amount
      setVoucherAmount((prev) => (prev !== null ? prev - amount : null));
      alert(`Credits used successfully! Your code: ${code}`);
    } catch (error) {
      console.error("Error using credits:", error);
    }
  };

  if (voucherAmount === null || !hotelResults) {
    return <p className="mx-32 mt-10 text-xl">Loading hotel data...</p>;
  }

  return (
    <div className="mx-32 mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Hotels near {airportCode || "your location"}
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-xl font-medium text-gray-700">
            You have{" "}
            <span className="font-bold text-black">${voucherAmount}</span> in
            credits
          </p>
          {/* Dialog Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black text-white">Use Credits</Button>
            </DialogTrigger>
            <DialogContent>
              {/* <h2 className="mb-4 text-2xl font-bold">Use Your Credits</h2> */}
              <DialogTitle className="mb-4 text-2xl font-bold">
                Use Your Credits
              </DialogTitle>
              <p className="mb-4 text-sm text-gray-600">
                Enter the amount of credits you want to use (up to $
                {voucherAmount}):
              </p>
              <Input
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                placeholder="Enter amount"
                className="mb-4"
              />
              <DialogFooter>
                <Button
                  onClick={handleUseCredits}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
