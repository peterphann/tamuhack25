import Image from 'next/image';
import type { Flight } from '../types/types';
import FlightHeader from './flight-header';

interface FlightCardProps {
  flight: Flight;
  header: boolean;
}

const parseDate = (timestamp: string): { date: string; time: string } => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

const FlightCard = ({ flight, header = true }: FlightCardProps) => {
  return (
    <div className="mt-2 flex flex-col">
      {header && <FlightHeader flight={flight} />}
      <div className="my-4 grid grid-cols-[2fr_7fr_2fr] items-center justify-between rounded bg-slate-100 p-4 px-8 shadow-md">
        <div className="flex flex-col">
          <p className="font-light">{parseDate(flight.departureTime).date}</p>
          <p className="text-lg font-semibold">
            {parseDate(flight.departureTime).time}
          </p>
          <p className="font-light">
            {flight.origin.city}, US ({flight.origin.code})
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Image
            src="beeline1.svg"
            alt=""
            width={'20'}
            height={'20'}
            className="h-auto w-5/12"
          />
          <p className="flex w-fit justify-center rounded-lg border border-solid border-slate-400 bg-white px-3 py-1 text-center text-xs font-semibold">
            {flight.duration.hours} hr {flight.duration.minutes} min
          </p>
          <Image
            src="beeline2.svg"
            alt=""
            width={'20'}
            height={'20'}
            className="h-auto w-5/12"
          />
        </div>
        <div className="flex flex-col text-right">
          <p className="font-light">{parseDate(flight.arrivalTime).date}</p>
          <p className="text-lg font-semibold">
            {parseDate(flight.arrivalTime).time}
          </p>
          <p className="font-light">
            {flight.destination.city}, US ({flight.destination.code})
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
