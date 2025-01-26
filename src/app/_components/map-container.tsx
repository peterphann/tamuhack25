import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const MapContainer = ({query}: {query: string | undefined}) => {
  const [center, setCenter] = useState(null);

  const containerStyle = {
    width: "450px",
    height: "400px",
  };

  const convertQuery = (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCenter(data.results[0].geometry.location)
    })
    .catch(err => console.error(err));
  }

  useEffect(() => {
    if (!query) return;
    convertQuery(query);
  }, [])

  if (!query) {
    return <div className="w-[450px] h-[400px] flex justify-center items-center">
      Loading...
    </div>
  }

  return (
    
      <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={center}>
        <Marker position={center} />
      </GoogleMap>

  );
};

export default MapContainer;
