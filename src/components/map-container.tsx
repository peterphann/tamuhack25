import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import type { LatLngLiteral } from "@googlemaps/google-maps-services-js";

const MapContainer = ({ query }: { query: string | undefined }) => {
  const [center, setCenter] = useState<LatLngLiteral | null | undefined>(null);

  const containerStyle = {
    width: "450px",
    height: "400px",
  };

  const getCoordinates = (query: string) => {
    fetch(`/api/location?query=${query}`)
    .then(res => res.json())
    .then((data: LatLngLiteral) => setCenter(data))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    if (!query) return;
    getCoordinates(query);
  }, [query]);

  if (!query || center === null) {
    return (
      <div className="flex h-[400px] w-[450px] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (center === undefined) {
    return (
      <div className="flex h-[400px] w-[450px] items-center justify-center">
        An error occurred while retrieving the location.
      </div>
    );
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapContainer;
