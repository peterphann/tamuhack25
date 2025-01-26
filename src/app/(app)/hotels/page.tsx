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
import { RiExternalLinkFill, RiStarFill } from "react-icons/ri";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { Afacad } from "next/font/google";

const afacad = Afacad({
  subsets: ['latin']
})

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

  const [redemptionMessage, setRedemptionMessage] = useState<string>("");

  useEffect(() => {
    const fetchVoucherAmount = async () => {
      if (!flightId) {
        console.error("Flight ID is required.");
        return;
      }

      try {
        const session = await getSession();
        if (!session?.user?.id) {
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
    if (isNaN(amount)) {
      setRedemptionMessage("Please enter a valid amount.")
      return;
    }
    if (amount <= 0) {
      setRedemptionMessage("Please enter a positive number.")
      return;
    }
    if (amount > (voucherAmount ?? 0)) {
      setRedemptionMessage("You do not have enough credits.")
      return;
    }
    setRedemptionMessage("")

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
        <h1 className={cn("text-4xl font-bold", afacad.className)}>
          Hotels near {airportCode ?? "your location"}
        </h1>
        <div className="flex items-center gap-4">
          <p className={cn("text-xl font-medium text-gray-700", afacad.className)}>
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
              <DialogTitle>
                Use Your Credits
              </DialogTitle>
              <p className="opacity-50 text-sm">
                Enter the amount of credits you want to use (up to $
                {voucherAmount}):
              </p>
              <form onSubmit={e => {e.preventDefault(); handleUseCredits()}}>
                <Input
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mb-4"
                />
                <div className="flex justify-between">
                  <div className="flex items-center w-80 text-red text-sm">
                    {redemptionMessage}
                  </div>

                  <Button
                    type="submit"
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mb-20">
        {hotelResults.map((hotel: any, index: number) => (
          <div key={index} className="rounded-lg bg-gray-100 p-6 shadow-md flex flex-col justify-between">
            <div>
            {hotel.photo && (
              <Image
                src={hotel.photo}
                alt={`Photo of ${hotel.name}`}
                width={"200"}
                height={"200"}
                className="mb-4 h-40 w-full rounded-lg object-cover"
              />
            )}
            <div className="mb-2 flex justify-between">
              <p className="text-xl font-bold">${hotel.price}</p>
              <p className="text-sm text-gray-500 flex items-center gap-x-1">
                <span>{hotel.rating || "N/A"} / 5</span>
                <RiStarFill className="opacity-50" />
              </p>
            </div>
            <h2 className="mb-1 text-lg font-semibold">{hotel.name}</h2>
            <p className="mb-4 text-sm text-gray-500">
              {hotel.address || "Address not available"}
            </p>
            </div>
            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors flex justify-center items-center space-x-2 w-full rounded bg-black px-4 py-2 text-center text-white hover:bg-zinc-800"
            >
              <p>Book Hotel</p>
              <RiExternalLinkFill />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
