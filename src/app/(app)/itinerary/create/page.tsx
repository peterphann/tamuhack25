"use client";
import { Afacad } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Itinerary } from "~/app/types/types";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import CalendarPicker from "~/app/_components/calendar-picker";
import { format, parseISO } from "date-fns";
import { Button } from "~/components/ui/button";

const afacad = Afacad({
  subsets: ["latin"],
});

interface PreferenceChoices {
  food: boolean,
  entertainment: boolean
  culture: boolean,
  shopping: boolean,
  nature: boolean,
  relaxation: boolean,
  family: boolean
}

const getTrueKeys = (obj: PreferenceChoices): string => {
  return Object.keys(obj)
    .filter((key) => obj[key as keyof PreferenceChoices])
    .join(", ");
}

export default function ItineraryCreate() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState<string | null>(searchParams.get("location"));
  const dateParam = searchParams.get("date")
  const [date, setDate] = useState<Date>(dateParam ? parseISO(dateParam) : new Date());
  const [scheduleLoad, setScheduleLoad] = useState<string>("balanced");
  const [preferences, setPreferences] = useState<PreferenceChoices>({
    food: false,
    entertainment: false,
    culture: false,
    shopping: false,
    nature: false,
    relaxation: false,
    family: false
  });


  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const generateItinerary = () => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const formattedPreferences = getTrueKeys(preferences);
    const endpoint = `/api/itinerary/generate?location=${location}&date=${formattedDate}&preferences=${formattedPreferences}&scheduleLoad=${scheduleLoad}`
    
    fetch(endpoint)
      .then(res => res.json())
      .then((data: Itinerary) => {
        if (Object.entries(data).length === 0) return;
        setItinerary(data);
      })
      .catch(err => console.error(err))
  } 

  return (
    <div className="mx-28 my-10">
      {itinerary ? <div>
        <p className={"text-6xl font-bold " + afacad.className}>
        Itinerary for {itinerary.city}
      </p>
      <p className="text-base font-light opacity-50">
        You have{" "}
        <span className="text-red">{itinerary?.itinerary.length} activities</span>{" "}
        planned in {itinerary?.city}.
      </p>
      </div> : <div>
      <p className={"text-6xl font-bold " + afacad.className}>
        Create an Itinerary
      </p>
      <p className="text-base font-light opacity-50">
        Choose your settings to generate an itinerary.
      </p>
      </div>}
      <div className="mt-6 flex gap-4">
        <div className="flex w-2/3 flex-col gap-6">
          {itinerary?.itinerary.map((item, index) => (
            <div key={index}>
              <p className="text-xl font-semibold">
                {item.time}{" "}
                – {item.activity}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div className="border-l border-gray-300"></div>
        <form onSubmit={e => {e.preventDefault(); generateItinerary()}} className="flex flex-col gap-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2 w-72">
              <Label>Location</Label>
              <Input value={location ?? ""} onChange={e => setLocation(e.target.value)} />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Date</Label>
              <CalendarPicker date={date} setDate={setDate} />
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xl font-semibold">Preferences</p>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox checked={preferences.food} onCheckedChange={() => setPreferences({...preferences, food: !preferences.food})} className="rounded-full border-gray-400" />
                <p className="text-sm">Food</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox checked={preferences.entertainment} onCheckedChange={() => setPreferences({...preferences, entertainment: !preferences.entertainment})} className="rounded-full border-gray-400" />
                <p className="text-sm">Entertainment</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox checked={preferences.culture} onCheckedChange={() => setPreferences({...preferences, culture: !preferences.culture})} className="rounded-full border-gray-400" />
                <p className="text-sm">Culture</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox checked={preferences.shopping} onCheckedChange={() => setPreferences({...preferences, shopping: !preferences.shopping})} className="rounded-full border-gray-400" />
                <p className="text-sm">Shopping</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox checked={preferences.nature} onCheckedChange={() => setPreferences({...preferences, nature: !preferences.nature})} className="rounded-full border-gray-400" />
                <p className="text-sm">Nature</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox checked={preferences.relaxation} onCheckedChange={() => setPreferences({...preferences, relaxation: !preferences.relaxation})} className="rounded-full border-gray-400" />
                <p className="text-sm">Relaxation</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-2xl border px-2 py-1">
                <Checkbox checked={preferences.family} onCheckedChange={() => setPreferences({...preferences, family: !preferences.family})} className="rounded-full border-gray-400" />
                <p className="text-sm">Family</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <p className="mb-2 text-xl font-semibold">Intensity</p>
            <RadioGroup onValueChange={value => setScheduleLoad(value)} defaultValue="balanced" value={scheduleLoad}>
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
          <Button type="submit" className="w-52 mt-3">Generate Itinerary</Button>
        </form>
      </div>
    </div>
  );
}
