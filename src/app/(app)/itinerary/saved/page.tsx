"use client"

import type { itineraries } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { Afacad } from "next/font/google";
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import type { Itinerary } from "~/app/types/types";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

const afacad = Afacad({
  subsets: ["latin"],
});

export default function Itineraries() {
    const { data: session } = useSession();
    const [itineraries, setItineraries] = useState<itineraries[] | null>(null);

    const deleteItinerary = (id: number) => {
        fetch(`/api/itinerary`, {
            method: 'DELETE',
            body: JSON.stringify({
                userId: session?.user.id,
                itineraryId: id
            })
        })
        .then(() => {
            setItineraries(prev => prev?.filter((itinerary: itineraries) => itinerary.itinerary_id !== id));
        })
        .catch(err => console.error(err));
    }

    const fetchUserItineraries = () => {
        fetch(`/api/itinerary?user_id=${session?.user.id ?? ""}`)
        .then(res => res.json())
        .then((data: itineraries[]) => {
            setItineraries(data);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        if (session?.user?.id) {
            fetchUserItineraries();
        }
    }, [session])

    return <div className="mx-28 my-10">
        <h1 className={cn("font-bold text-6xl mb-2", afacad.className)}>Saved Itineraries</h1>
        <p className={cn("text-xl font-light opacity-50 mb-4", afacad.className)}>
            Manage your previously saved itineraries.
          </p>

        {!itineraries && <p>Loading your saved itineraries...</p>}

        {itineraries?.map((itinerary: itineraries, index) => (
            <div key={index}>
                <div className="flex justify-between items-center pr-8">
                    <div>
                        <p className="text-sm opacity-25">Created {format(itinerary.date_created, 'MMMM d, yyyy')}</p>
                        <h2 className="text-2xl font-medium">{itinerary.name}</h2>
                        <div className="flex gap-x-4 text-sm">
                            <p className="w-60">{((JSON.parse(itinerary.itinerary_data as string)) as Itinerary).city}</p>
                            <p className="w-60">{format(parseISO(((JSON.parse(itinerary.itinerary_data as string)) as Itinerary).date), 'MMMM d, yyyy')}</p>
                            <p className="w-60">{((JSON.parse(itinerary.itinerary_data as string)) as Itinerary).itinerary.length} events</p>
                        </div>
                    </div>

                    <div onClick={() => deleteItinerary(itinerary.itinerary_id)} className="transition-opacity text-rose-600 hover:opacity-50 hover:cursor-pointer">
                        <RiDeleteBin6Fill className="w-6 h-6" />
                    </div>
                </div>

                <Separator className="my-4" />
            </div>
        ))}
    </div>
}