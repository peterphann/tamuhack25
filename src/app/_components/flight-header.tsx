import Link from "next/link";

interface Props {
  flight: any;
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
        <p className="group cursor-pointer rounded-3xl bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300">
          Manage{" "}
          <span className="duration-100 ease-in-out group-hover:ml-2">
            &#8594;
          </span>
        </p>
      </Link>
      {flight.canceled && (
        <p className="flex-1 text-right text-red">Canceled</p>
      )}
    </div>
  );
};

export default FlightHeader;
