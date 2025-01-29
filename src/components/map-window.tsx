import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import type { Event } from "~/types/types";
import MapContainer from "./map-container";

interface MapWindowProps {
    open: boolean;
    onOpenChange(this: void, open: boolean): void;
    event: Event | null;
}

const MapWindow = ({ open, onOpenChange, event }: MapWindowProps) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="">
        <DialogTitle className="mb-3">
          <p>{event?.activity}</p>
          <a href={`https://www.google.com/maps/place/${event?.location}`} target="_blank" rel="noreferrer noopener" className="mt-1 text-sm font-normal opacity-50 hover:underline">
            {event?.location}
          </a>
        </DialogTitle>

        <div className="flex justify-center">
          <MapContainer query={event?.location} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapWindow;
