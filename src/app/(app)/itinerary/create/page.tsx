"use client";
import { Afacad } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Event, Itinerary } from "~/app/types/types";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { RiSaveFill } from "react-icons/ri";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import CalendarPicker from "~/app/_components/calendar-picker";
import { format, parseISO } from "date-fns";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import Spinner from "~/app/_components/spinner";
import {
  RiMapPin2Fill,
  RiExternalLinkFill,
  RiResetLeftFill,
} from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import MapContainer from "~/app/_components/map-container";

const afacad = Afacad({
  subsets: ["latin"],
});

interface PreferenceChoices {
  food: boolean;
  entertainment: boolean;
  culture: boolean;
  shopping: boolean;
  nature: boolean;
  relaxation: boolean;
  family: boolean;
}

const getTrueKeys = (obj: PreferenceChoices): string => {
  return Object.keys(obj)
    .filter((key) => obj[key as keyof PreferenceChoices])
    .join(", ");
};

export default function ItineraryCreate() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState<string | null>(
    searchParams.get("location"),
  );
  const dateParam = searchParams.get("date");
  const [date, setDate] = useState<Date>(
    dateParam ? parseISO(dateParam) : new Date(),
  );
  const [scheduleLoad, setScheduleLoad] = useState<string>("balanced");
  const [isSaveOpen, setSaveOpen] = useState<boolean>(false);
  const [itineraryName, setItineraryName] = useState<string>("");
  const [preferences, setPreferences] = useState<PreferenceChoices>({
    food: false,
    entertainment: false,
    culture: false,
    shopping: false,
    nature: false,
    relaxation: false,
    family: false,
  });

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [alreadySaved, setAlreadySaved] = useState<boolean>(false);
  const [pageStatus, setPageStatus] = useState<string>("loaded");

  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const resetOptions = () => {
    setLocation("");
    setDate(new Date());
    setPreferences({
      food: false,
      entertainment: false,
      culture: false,
      shopping: false,
      nature: false,
      relaxation: false,
      family: false,
    });
    setScheduleLoad("balanced");
  };

  const saveItinerary = () => {
    fetch("/api/itinerary", {
      method: "POST",
      body: JSON.stringify({
        userId: session?.user.id,
        name: itineraryName === "" ? "Untitled Itinerary" : itineraryName,
        data: JSON.stringify(itinerary),
      }),
    })
      .then((data) => {
        setSaveOpen(false);
        setAlreadySaved(true);
      })
      .catch((err) => console.error(err));
  };

  const generateItinerary = () => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const formattedPreferences = getTrueKeys(preferences);
    const endpoint = `/api/itinerary/generate?location=${location}&date=${formattedDate}&preferences=${formattedPreferences}&scheduleLoad=${scheduleLoad}`;

    setPageStatus("loading");
    fetch(endpoint)
      .then((res) => res.json())
      .then((data: Itinerary) => {
        if (Object.entries(data).length === 0) return;
        setAlreadySaved(false);
        setItinerary(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageStatus("loaded"));
  };

  return (
    <div className="mx-28 my-10 grid grid-cols-2">
      <div>
        {itinerary ? (
          <div>
            <p className={"text-6xl font-bold " + afacad.className}>
              Itinerary for {itinerary.city}
            </p>
            <p className="text-base font-light opacity-50">
              You have{" "}
              <span className="text-red">
                {itinerary?.itinerary.length} activities
              </span>{" "}
              planned in {itinerary?.city}.
            </p>
          </div>
        ) : (
          <div>
            <p className={"text-6xl font-bold " + afacad.className}>Create an Itinerary</p>
            <p
              className={cn(
                "mt-2 text-xl font-light opacity-50",
                afacad.className,
              )}
            >
              Choose your settings to generate an itinerary.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6 mt-8 mr-8">
          {itinerary?.itinerary.map((item, index) => (
            <div key={index}>
              <p className="text-sm opacity-50">{item.time}</p>
              <div className="flex items-center space-x-2">
                <p className="text-xl font-semibold">{item.activity}</p>
                {item.location && (
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
        </div>
      </div>

      <div className="mt-6 flex gap-4 ml-20">
        <div className="border-l border-gray-300"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateItinerary();
          }}
          className="flex flex-col gap-4"
        >
          <div className="space-y-4">
            <div className="flex w-72 flex-col space-y-2">
              <Label>Location</Label>
              <Input
                className="bg-white"
                disabled={pageStatus === "loading"}
                value={location ?? ""}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Date</Label>
              <CalendarPicker
                disabled={pageStatus === "loading"}
                date={date}
                setDate={setDate}
              />
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xl font-semibold">Preferences</p>
            <div className="mb-2 mt-2 flex flex-wrap gap-2">
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1 bg-white">
                <Checkbox
                  disabled={pageStatus === "loading"}
                  checked={preferences.food}
                  onCheckedChange={() =>
                    setPreferences({ ...preferences, food: !preferences.food })
                  }
                  className="rounded-full border-gray-400"
                />
                <p className="text-sm">Food</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1 bg-white">
                <Checkbox
                  disabled={pageStatus === "loading"}
                  checked={preferences.entertainment}
                  onCheckedChange={() =>
                    setPreferences({
                      ...preferences,
                      entertainment: !preferences.entertainment,
                    })
                  }
                  className="rounded-full border-gray-400"
                />
                <p className="text-sm">Entertainment</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1 bg-white">
                <Checkbox
                  disabled={pageStatus === "loading"}
                  checked={preferences.culture}
                  onCheckedChange={() =>
                    setPreferences({
                      ...preferences,
                      culture: !preferences.culture,
                    })
                  }
                  className="rounded-full border-gray-400"
                />
                <p className="text-sm">Culture</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1 bg-white">
                <Checkbox
                  disabled={pageStatus === "loading"}
                  checked={preferences.shopping}
                  onCheckedChange={() =>
                    setPreferences({
                      ...preferences,
                      shopping: !preferences.shopping,
                    })
                  }
                  className="rounded-full border-gray-400"
                />
                <p className="text-sm">Shopping</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1 bg-white">
                <Checkbox
                  disabled={pageStatus === "loading"}
                  checked={preferences.nature}
                  onCheckedChange={() =>
                    setPreferences({
                      ...preferences,
                      nature: !preferences.nature,
                    })
                  }
                  className="rounded-full border-gray-400"
                />
                <p className="text-sm">Nature</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1 bg-white">
                <Checkbox
                  disabled={pageStatus === "loading"}
                  checked={preferences.relaxation}
                  onCheckedChange={() =>
                    setPreferences({
                      ...preferences,
                      relaxation: !preferences.relaxation,
                    })
                  }
                  className="rounded-full border-gray-400"
                />
                <p className="text-sm">Relaxation</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1 bg-white">
                <Checkbox
                  disabled={pageStatus === "loading"}
                  checked={preferences.family}
                  onCheckedChange={() =>
                    setPreferences({
                      ...preferences,
                      family: !preferences.family,
                    })
                  }
                  className="rounded-full border-gray-400"
                />
                <p className="text-sm">Family</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <p className="mb-2 text-xl font-semibold">Schedule Density</p>
            <RadioGroup
              disabled={pageStatus === "loading"}
              onValueChange={(value) => setScheduleLoad(value)}
              defaultValue="balanced"
              value={scheduleLoad}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="relaxed"
                  id="relaxed"
                  className="border-gray-400"
                />
                <Label htmlFor="option-one">Relaxed</Label>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <RadioGroupItem
                  value="balanced"
                  id="balanced"
                  className="border-gray-400"
                />
                <Label htmlFor="option-two">Balanced</Label>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <RadioGroupItem
                  value="packed"
                  id="packed"
                  className="border-gray-400"
                />
                <Label htmlFor="option-two">Packed</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-3 flex items-center space-x-3">
            <Button
              disabled={pageStatus === "loading"}
              type="submit"
              className="w-52"
            >
              {pageStatus === "loading" ? (
                <Spinner />
              ) : (
                <span>Generate Itinerary</span>
              )}
            </Button>
            <Button
              disabled={pageStatus === "loading" || !itinerary || alreadySaved}
              type="button"
              onClick={() => setSaveOpen(true)}
            >
              <RiSaveFill />
            </Button>
            <Button
              disabled={pageStatus === "loading" || !itinerary}
              type="button"
              variant={"destructive"}
              onClick={resetOptions}
            >
              <RiResetLeftFill />
            </Button>

            <Dialog open={isSaveOpen} onOpenChange={setSaveOpen}>
              <DialogContent onCloseAutoFocus={() => setItineraryName("")}>
                <DialogHeader>
                  <DialogTitle className="mb-4">
                    Create a name for this itinerary:
                  </DialogTitle>

                  <div>
                    <Label className="opacity-50">Name</Label>
                    <Input
                      value={itineraryName}
                      onChange={(e) => setItineraryName(e.target.value)}
                      placeholder="Untitled Itinerary"
                    />
                    <Button
                      disabled={alreadySaved}
                      type="button"
                      onClick={saveItinerary}
                      className="mt-6 w-28"
                    >
                      Save
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog open={mapVisible} onOpenChange={setMapVisible}>
              <DialogContent onCloseAutoFocus={() => setCurrentEvent(null)}>
                <DialogTitle className="mb-3">
                  <p>{currentEvent?.activity}</p>
                  <p className="opacity-50 text-sm font-normal mt-1">{currentEvent?.location}</p>
                </DialogTitle>

                <div className="flex justify-center">
                  <MapContainer query={currentEvent?.location} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </div>
    </div>
  );
}
