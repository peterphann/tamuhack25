"use client"

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Afacad } from "next/font/google"
import { signIn } from "next-auth/react";
import { cn } from "~/lib/utils";

const afacad = Afacad({
    subsets: ['latin']
})

export default function Home() {

  return (
    <>
    <div className="plane fixed top-0 left-0 -z-50">
      <Image src={"/plane.png"} alt="Plane Banner" width="3000" height="1250" />
    </div>

    <div className={"mx-32 mt-10"}>
      <h1 className={"text-6xl font-bold " + afacad.className}>
        Make delays more managable!
      </h1>

      <h2 className="mt-4 text-xl w-5/12">
        Get easy access to hotel vouchers and itinerary planning in the city you&apos;re delayed in.
      </h2>

      <Button className="mt-8" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        <Image className="w-4 h-4" src={"/american.png"} alt="AA" width="50" height="50" />
        <p>Sign in via American Airlines</p>
      </Button>
    </div>

    <div className={cn("flex flex-col mx-32 mt-80 my-32 gap-y-16", afacad.className)}>
      <div className="flex justify-between items-center gap-x-12">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-2xl font-bold">Hotel Vouchers</h3>
          <h4 className="text-4xl font-bold">View and accept hotel vouchers</h4>
          <p className="text-xl w-2/3">Flock provides a convenient way to redeem vouchers from any delayed/cancelled flight and send the money to your bank account.</p>
        </div>

        <Image className="w-4/5 object-contain shadow-lg rounded-md" src={"/hotels.png"} alt="hotels" width="1920" height="1080" />
      </div>

      <div className="flex justify-between items-center gap-x-12">
        <Image className="w-4/5 object-contain shadow-lg rounded-md" src={"/hotels.png"} alt="hotels" width="1920" height="1080" />

        <div className="flex flex-col gap-y-2">
          <h3 className="text-2xl font-bold">Hotel Vouchers</h3>
          <h4 className="text-4xl font-bold">View and accept hotel vouchers</h4>
          <p className="text-xl w-2/3">Flock provides a convenient way to redeem vouchers from any delayed/cancelled flight and send the money to your bank account.</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-x-12">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-2xl font-bold">Hotel Vouchers</h3>
          <h4 className="text-4xl font-bold">View and accept hotel vouchers</h4>
          <p className="text-xl w-2/3">Flock provides a convenient way to redeem vouchers from any delayed/cancelled flight and send the money to your bank account.</p>
        </div>

        <Image className="w-4/5 object-contain shadow-lg rounded-md" src={"/hotels.png"} alt="hotels" width="1920" height="1080" />
      </div>
    </div>
    </>

  );
}
