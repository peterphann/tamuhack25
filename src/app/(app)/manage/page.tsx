import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Image from "next/image";
import { afacad } from "~/app/layout";
import { Button } from "~/components/ui/button";

export default async function Manage() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div className={"mx-32 mt-10"}>
        <h1 className={"text-6xl font-bold " + afacad.className}>
          Flight UA1358
        </h1>
      </div>
      <div className={"mx-32 mt-4"}>
        <p className={"text-xl text-[#808080] " + afacad.className}>
          Sorry your flight was <span className="text-[#FF8080]">canceled</span>
          . Here are your options...
        </p>
      </div>

      <div className={"mx-32 mt-8 flex flex-row justify-between gap-4"}>
        
        <div className="w-1/3 opacity-75 hover:opacity-100 hover:-translate-y-2 translate-y-0 transition-all hover:cursor-pointer duration-500 origin-bottom hover:scale-[1.02]">
          <p className=" text-xl font-semibold mb-2">Hotel Voucher</p>
          <div className="bg-[#F5F6F8] rounded-lg p-6 h-96 shadow-lg">
            <p>
              If your flight is canceled or significantly delayed due to reasons
              within American Airlines&apos; control (e.g., maintenance issues),
              and you are away from your home city, the airline will provide...
            </p>
            <ul className=" list-disc list-outside pl-4 mt-4">
              <li>A voucher for an approved hotel with available rooms.</li>
              <li>Transportation to and from the hotel.</li>
              <li>Meal vouchers if the delay exceeds 3 hours.</li>
            </ul>
            <Button className=" bg-black text-white hover:bg-gray-600 mt-4">Redeem Vouchers</Button>
          </div>
        </div>
        
        <div className="w-1/3 opacity-75 hover:opacity-100 hover:-translate-y-2 translate-y-0 transition-all hover:cursor-pointer duration-500 origin-bottom hover:scale-[1.02]">
          <p className="text-xl font-semibold mb-2">Itinerary Planning</p>
          <div className="bg-[#F5F6F8] rounded-lg p-6 h-96 shadow-lg">
          <p>Are you stuck in a city you are unfamiliar with? Make an itenerary with Flock to turn your delay into a fun day!</p>
          <Button className=" bg-black text-white hover:bg-gray-600 mt-4">Redeem Vouchers</Button>
          </div>
        </div>
        
        <div className="w-1/3 opacity-75 hover:opacity-100 hover:-translate-y-2 translate-y-0 transition-all hover:cursor-pointer duration-500 origin-bottom hover:scale-[1.02]">
          <p className="text-xl font-semibold mb-2">Car Rentals</p>
          <div className="bg-[#F5F6F8] rounded-lg p-6 h-96 shadow-lg">
            <p>We know that it can be challenging to find transportation in a new city. Use Flock&apos;s car rental management system to arrange a car rental within minutes and have transportation to travel around the city you are delayed in </p>
            <Button className=" bg-black text-white hover:bg-gray-600 mt-4">Redeem Vouchers</Button>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
