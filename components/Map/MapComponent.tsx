import { Map, GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import React, { useCallback, useMemo, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerPopup from "./MarkerPopup";
import { INITIAL_VIEW_STATE } from "../../utils/constants";
import { useCafes } from "../../hooks/useCafes";
import { CafeDetailsModal } from "../Modal/CafeDetailsModal";
import { CafeProps } from "../Cafe/Cafe.types";
import { MapPoint } from "./MapPoint";
import Markers from "./Markers";

// TODO convert to Typescript
export const MapComponent = () => {
  const [cafe, setCafe] = useState<CafeProps | null>(null);
  const { data, isLoading, isError, error } = useCafes();
  const [dialogOpen, setDialogOpen] = useState(false);
  // const handleDialog = () => {
  //     dialogOpen ? setDialogOpen(false) : setDialogOpen(true)
  // }

  const handleCafeUnselect = () => {
    setCafe(null);
  };

  const selectCafe = useCallback((selectedCafe: CafeProps) => {
    setCafe(selectedCafe);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error ${error.message}</p>;
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
