"use client";
import { Afacad } from "next/font/google";
import { useState, useEffect } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";

const afacad = Afacad({
  subsets: ["latin"],
});

export default function ItineraryCreate() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchItinerary() {
      try {
        const response = await fetch("/itinerary.json"); // Fetch from public directory
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    }

    fetchItinerary();
  }, []);

  if (!data) {
    return <p>Loading itinerary...</p>;
  }

  return (
    <div className="mx-24 my-16">
      <p className={"text-6xl font-bold " + afacad.className}>
        Itinerary for {data.city}
      </p>
      <p className="text-xl font-light opacity-50">
        You have{" "}
        <span className="text-red">{data.itinerary.length} activities</span>{" "}
        planned in {data.city}.
      </p>
      <div className="mt-6 flex gap-4">
        <div className="flex w-2/3 flex-col gap-6">
          {data.itinerary.map((item, index) => (
            <div key={index}>
              <p className="text-xl font-semibold">
                {new Date(item.time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
                – {item.activity}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div className="border-l border-gray-300"></div>
        <div className="flex w-1/3 flex-col gap-4">
          <div>
            <p className="text-xl font-semibold">Preferences</p>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox className="rounded-full border-gray-400" />
                <p className="text-sm">Food</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox className="rounded-full border-gray-400" />
                <p className="text-sm">Entertainment</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox className="rounded-full border-gray-400" />
                <p className="text-sm">Culture</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox className="rounded-full border-gray-400" />
                <p className="text-sm">Shopping</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox className="rounded-full border-gray-400" />
                <p className="text-sm">Nature</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox className="rounded-full border-gray-400" />
                <p className="text-sm">Relaxation</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox className="rounded-full border-gray-400" />
                <p className="text-sm">Family</p>
              </div>
            </div>
          </div>
          <Separator></Separator>
          <div>
            <p className="mb-2 text-xl font-semibold">Intensity</p>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                  className="border-gray-400"
                />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                  className="border-gray-400"
                />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                  className="border-gray-400"
                />
                <Label htmlFor="option-two">Packed</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
