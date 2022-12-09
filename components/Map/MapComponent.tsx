import { Map, GeolocateControl, NavigationControl } from "react-map-gl";
import React, { useCallback, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerPopup from "./MarkerPopup";
import { INITIAL_VIEW_STATE } from "../../utils/constants";
import { CafeProps } from "../Cafe/Cafe.types";
import Markers from "./Markers";
import { useCafes } from "../../hooks/useCafes";
import { LoadingSpinner } from "../../utils/LoadingSpinner";

export const MapComponent = () => {
  const [cafe, setCafe] = useState<CafeProps | null>(null);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const handleDialog = () => {
  //     dialogOpen ? setDialogOpen(false) : setDialogOpen(true)
  // }
  const handleCafeUnselect = () => {
    setCafe(null);
  };

  const { isLoading, isError, error, data } = useCafes();

  const selectCafe = useCallback((selectedCafe: CafeProps) => {
    setCafe(selectedCafe);
  }, []);

  if (isError)
    return <div className="h-full w-full">Error ${error.message}</div>;
  if (isLoading)
    return (
      // TODO revisit
      // <div className="flex h-full w-full items-center justify-center">
      // </div>
      <svg
        className="mx-auto mt-8 h-6 w-6 animate-spin text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  return (
    <div className="h-full w-full">
      <Map
        style={{ width: "100%", height: "100%" }}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      >
        <GeolocateControl
          position="top-left"
          trackUserLocation={true}
          fitBoundsOptions={{ maxZoom: 12 }}
        />
        <NavigationControl position="top-right" />
        <Markers data={data} selectCafe={selectCafe} />
        {cafe && (
          <MarkerPopup cafe={cafe} handleCafeUnselect={handleCafeUnselect} />
        )}
      </Map>
    </div>
  );
};
