"use client"

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Afacad } from "next/font/google"
import { signIn, useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiCalendarTodoFill, RiCarFill, RiArrowRightSLine, RiHotelBedFill } from "react-icons/ri";
import MapContainer from "../_components/map-container";

const afacad = Afacad({
    subsets: ['latin']
})

export default function Home() {
  const {data: session, status} = useSession()
  
  return (
    <>
    <motion.div initial={{opacity: 0, top: -80}} animate={{opacity: 1, top: 0}} transition={{duration: 5, delay: 0.5, type: "spring"}} className="plane absolute top-0 left-0 w-full h-auto -z-50">
      <Image src={"/plane.png"} alt="Plane Banner" width="3000" height="1250" />
    </motion.div>

    <div className={"mx-28 mt-10"}>
      <motion.div initial={{opacity: 0, translateY: 20}} animate={{opacity: 1, translateY: 0}} transition={{duration: 3, delay: 0.5, type: "spring"}}>
        <h1 className={"text-6xl font-bold " + afacad.className}>
          Make delays more managable!
        </h1>
      </motion.div>

      <motion.div initial={{opacity: 0, translateY: 15}} animate={{opacity: 1, translateY: 0}} transition={{duration: 3, delay: 1.5, type: "spring"}}>
      <h2 className="mt-4 text-xl w-5/12">
        Get easy access to itinerary planning, hotel vouchers, and car rentals in the city you&apos;re delayed in.
      </h2>
      </motion.div>
      

      <motion.div initial={{opacity: 0, translateY: 10}} animate={{opacity: 1, translateY: 0}} transition={{duration: 3, delay: 2.5, type: "spring"}}>
        {session
        ? <Link href={"/dashboard"}>
          <Button className="mt-8 group pr-3">
            Dashboard
            <RiArrowRightSLine className="transition-all group-hover:ml-2" />
          </Button> 
        </Link>
        : <Button className="mt-8" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          <Image className="w-4 h-4" src={"/american.png"} alt="AA" width="50" height="50" />
          <p>Sign in via American Airlines</p>
        </Button>}
      </motion.div>
    </div>

    <div className={cn("flex flex-col mx-28 mt-48 mb-32 gap-y-32", afacad.className)}>
      <div className="flex justify-between items-center gap-x-12">
        <div className="flex flex-col gap-y-2 w-1/3 relative">
          <RiCalendarTodoFill className="w-80 h-80 -z-50 opacity-[0.03] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          <h3 className="text-2xl font-bold">Itinerary Planning</h3>
          <h4 className="text-4xl font-bold">Plan out your itinerary</h4>
          <p className="text-xl">Make the most out of the city you are delayed in! Flock&apos;s built in itenery planning turns your delay into a fun day!</p>
        </div>

        <Image className="w-2/3 object-contain shadow-lg rounded-md hover:-translate-y-2 hover:translate-x-2 hover:scale-[1.01] duration-700" src={"/itinerary.png"} alt="hotels" width="1920" height="1080" />
      </div>

      <div className="flex justify-between items-center gap-x-12">
        <Image className="w-2/3 object-contain shadow-lg rounded-md hover:-translate-y-2 hover:-translate-x-2 hover:scale-[1.03] duration-700" src={"/hotels.png"} alt="hotels" width="1920" height="1080" />

        <div className="flex flex-col gap-y-2 w-1/3 relative">
          <RiHotelBedFill className="w-80 h-80 -z-50 opacity-[0.03] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <h3 className="text-2xl font-bold">Hotel Vouchers</h3>
          <h4 className="text-4xl font-bold">View and accept hotel vouchers</h4>
          <p className="text-xl">Flock provides a convenient way to redeem vouchers from any delayed/cancelled flight and send the money to your bank account.</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-x-12">
        <div className="flex flex-col gap-y-2 w-1/3 relative">
          <RiCarFill className="w-80 h-80 -z-50 opacity-[0.03] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <h3 className="text-2xl font-bold">Car Rentals</h3>
          <h4 className="text-4xl font-bold">Find and manage car rentals</h4>
          <p className="text-xl">We know that it can be challenging to find transportation in a new city. Flock’s car rental management makes it easy to get the transportation you need.</p>
        </div>

        <Image className="w-2/3 object-contain shadow-lg rounded-md hover:-translate-y-2 hover:translate-x-3 scale-[1.025] duration-700" src={"/rental.png"} alt="hotels" width="1920" height="1080" />
      </div>
    </div>
    </>

  );
}
