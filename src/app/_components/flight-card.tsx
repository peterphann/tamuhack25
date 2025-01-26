export default function FlightCard({flight: any}) {

    return <div className="mt-12 flex flex-col">
    <div className="flex items-center gap-4">
      <p className="text-lg font-bold">Flight {flight.flight_id}</p>
      <a href={"/manage"}>
        <p className="group cursor-pointer rounded-3xl bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300">
          Manage{" "}
          <span className="duration-100 ease-in-out group-hover:ml-2">
            &#8594;
          </span>
        </p>
      </a>
      {flight.canceled && (
        <p className="flex-1 text-right text-red">Status: canceled</p>
      )}
    </div>

    <div className="my-4 grid grid-cols-[2fr_7fr_2fr] items-center justify-between rounded bg-slate-100 p-4 px-8 shadow-md">
      <div className="flex flex-col">
        <p className="font-light">
          {parseDate(flight.departureTime).date}
        </p>
        <p className="text-lg font-semibold">
          {parseDate(flight.departureTime).time}
        </p>
        <p className="font-light">
          {flight.destination.city}, , US ({flight.destination.code})
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <img src="beeline1.svg" alt="" className="w-5/12" />
        <p className="w-2/12 rounded-lg border border-solid border-slate-400 bg-white px-3 py-1 text-lg font-semibold">
          {flight.duration.hours} hr {flight.duration.minutes} min
        </p>
        <img src="beeline2.svg" alt="" className="w-5/12" />
      </div>
      <div className="flex flex-col text-right">
        <p className="font-light">
          {parseDate(flight.arrivalTime).date}
        </p>
        <p className="text-lg font-semibold">
          {parseDate(flight.arrivalTime).time}
        </p>
        <p className="font-light">
          {flight.origin.city}, , US ({flight.origin.code})
        </p>
      </div>
    </div>
  </div>
}