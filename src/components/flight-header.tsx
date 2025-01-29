import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import type { Flight } from "../types/types";

interface FlightHeaderProps {
  flight: Flight;
}

const FlightHeader = ({ flight }: FlightHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-lg font-bold">Flight {flight.flightNumber}</p>
      <Link
        href={{
          pathname: "/manage",
          query: { flight: JSON.stringify(flight) },
        }}
      >
        <p className="group flex cursor-pointer items-center justify-between rounded-3xl bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300">
          Manage{" "}
          <RiArrowRightSLine className="ease-in-out ml-0.5 inline-block h-4 w-4 duration-100 group-hover:ml-2" />
        </p>
      </Link>
      {flight.isCanceled ? (
        <p className="flex-1 text-right text-red">Canceled</p>
      ) : (
        <p className="flex-1 text-right text-green-500">On Time</p>
      )}
    </div>
  );
};

export default FlightHeader;
