import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import type { AggregateFlightDetails } from "../types/types";

interface Props {
  flight: AggregateFlightDetails;
}

const FlightHeader = ({ flight }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-lg font-bold">Flight {flight.flight_id}</p>
      <Link
        href={{
          pathname: "/manage",
          query: { flight: JSON.stringify(flight) },
        }}
      >
        <p className="flex items-center justify-between group cursor-pointer rounded-3xl bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300">
          Manage{" "}
          <RiArrowRightSLine className="w-4 h-4 inline-block duration-100 ease-in-ou ml-0.5 group-hover:ml-2"/>
        </p>
      </Link>
      {flight.canceled && (
        <p className="flex-1 text-right text-red">Canceled</p>
      )}
    </div>
  );
};

export default FlightHeader;
