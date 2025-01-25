"use client";

import { useState } from "react";

const FlightSearch = () => {
  const [date, setDate] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/flights?date=${date}&flightNumber=${flightNumber}`,
      );
      const data = await response.json();

      if (response.ok) {
        setFlightData(data);
        setError(null);
      } else {
        setFlightData(null);
        setError(data.error || "An unknown error occurred.");
      }
    } catch (err) {
      setError("Failed to fetch flight data.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Search for Flight</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mr-2 border p-2"
      />
      <input
        type="text"
        placeholder="Flight Number"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        className="mr-2 border p-2"
      />
      <button
        onClick={handleSearch}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Search
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {flightData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Flight Details</h2>
          <pre className="rounded bg-gray-100 p-4">
            {JSON.stringify(flightData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
