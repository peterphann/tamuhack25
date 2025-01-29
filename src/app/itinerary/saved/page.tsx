"use client"

import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill, RiAddLargeFill, RiMapPin2Fill, RiExternalLinkFill } from "react-icons/ri";
import type { Event } from "~/types/types";
import type { ItineraryData } from '~/types/internal-api-types';
import { Separator } from "~/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import type { Itinerary } from "@prisma/client";
import { afacad } from "~/fonts/fonts";
import MapWindow from "~/components/map-window";

const Itineraries = () => {
    const { data: session } = useSession();
    const [itineraries, setItineraries] = useState<Itinerary[] | null>(null);
    const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
    const [itineraryOpen, setItineraryOpen] = useState<boolean>(false);

    const [mapVisible, setMapVisible] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

    const deleteItinerary = (id: number) => {
        fetch(`/api/itinerary`, {
            method: 'DELETE',
            body: JSON.stringify({
                userId: session?.user.id,
                itineraryId: id
            })
        })
        .then(() => {
            setItineraries(prev => prev ? prev.filter((itinerary) => itinerary.itineraryId !== id) : []);
        })
        .catch(err => console.error(err));
    }

    const fetchUserItineraries = () => {
        fetch(`/api/itinerary?userId=${session?.user.id ?? ""}`)
        .then(res => res.json())
        .then((data: Itinerary[]) => {
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

        {itineraries?.map((itinerary: Itinerary, index) => (
            <div key={index}>
                <div className="flex justify-between items-center pr-8">
                    <div className="transition-transform hover:cursor-pointer hover:scale-[1.02] active:scale-100" onClick={() => {setItineraryOpen(true); setSelectedItinerary(itinerary)}}>
                        <p className="text-sm opacity-25">Created {format(itinerary.dateCreated, 'MMMM d, yyyy')}</p>
                        <h2 className="text-2xl mt-2 font-medium">{itinerary.name}</h2>
                        <div className="flex gap-x-4 text-sm">
                            <p className="w-60">{((JSON.parse(itinerary.itineraryData as string)) as ItineraryData).city}</p>
                            <p className="w-60">{format(parseISO(((JSON.parse(itinerary.itineraryData as string)) as ItineraryData).date), 'MMMM d, yyyy')}</p>
                            <p className="w-60">{((JSON.parse(itinerary.itineraryData as string)) as ItineraryData).events.length} events</p>
                        </div>
                    </div>

                    <div onClick={() => deleteItinerary(itinerary.itineraryId)} className="transition-opacity text-rose-600 hover:opacity-50 hover:cursor-pointer">
                        <RiDeleteBin6Fill className="w-6 h-6" />
                    </div>
                </div>

                <Separator className="my-4" />
            </div>
        ))}

        {itineraries && <Link className="opacity-75 text-sm transition-opacity inline-flex items-center space-x-2 hover:opacity-50" href={"/itinerary/create"}>
            {itineraries.length > 0
            ? <p>Searching for a new adventure?</p>
            : <p>You have no saved itineraries!</p>}
            <RiAddLargeFill />
        </Link>}
        
        <MapWindow open={mapVisible} onOpenChange={setMapVisible} event={currentEvent} />
            
        <Sheet open={itineraryOpen} onOpenChange={setItineraryOpen}>
            {selectedItinerary
            ? <SheetContent>
                <SheetHeader>
                <SheetTitle className="text-2xl mb-2">{selectedItinerary.name}</SheetTitle>

                    <Separator className="y-4" />


                    <div className="mb-4 py-2">
                        <p className="text-sm opacity-50">{((JSON.parse(selectedItinerary.itineraryData as string)) as ItineraryData).city}</p>
                        <p className="text-sm opacity-50">Scheduled for {format(parseISO(((JSON.parse(selectedItinerary.itineraryData as string)) as ItineraryData).date), 'MMMM d, yyyy')}</p>
                        <p className="text-sm opacity-50">Created on {format(selectedItinerary.dateCreated, 'MMMM d, yyyy')}</p>
                    </div>

                    <Separator className="y-4" />

                    {((JSON.parse(selectedItinerary.itineraryData as string)) as ItineraryData).events.map((item, index) => (
                        <div key={index}>
                            <p className="text-xs opacity-50 pt-4">{item.time}</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-lg font-semibold">{item.activity}</p>
                                {item.website && (
                                <div className="hover:cursor-pointer" onClick={() => {setMapVisible(true); setCurrentEvent(item)}}>
                                    <RiMapPin2Fill className="h-5 w-5 opacity-30 hover:opacity-20 transition-opacity" />
                                </div>
                                )}
                                {item.website && (
                                <a
                                    href={item.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <RiExternalLinkFill className="h-5 w-5 opacity-30 hover:opacity-20 transition-opacity" />
                                </a>
                                )}
                            </div>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    ))}
                </SheetHeader>
            </SheetContent>
            : <SheetContent>
                <SheetHeader>
                <SheetTitle>You do not have an itinerary selected.</SheetTitle>
                <SheetDescription>
                    How are you even in this window?
                </SheetDescription>
                </SheetHeader>
            </SheetContent>}
            </Sheet>
    </div>
}

export default Itineraries;