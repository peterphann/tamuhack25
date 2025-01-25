"use client";

import { join } from "path";
import { useState } from "react";

const UserFlights = () => {
  const [userId, setUserId] = useState("");
  const [flightData, setFlightData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFlights = async () => {
    if (!userId) {
      setError("User ID is required.");
      return;
    }

    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const response = await fetch(`/api/user-flights?user_id=${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch flights.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setFlightData(data);
      console.log(data);
    } catch (err) {
      setError("An error occurred while fetching flight data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Fetch Flights by User ID</h1>
      <div className="mb-4">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="mb-2 w-full rounded border p-2"
        />
        <button
          onClick={fetchFlights}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          Fetch Flights
        </button>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <div>{JSON.stringify(flightData)}</div>
    </div>
  );
};

export default UserFlights;
