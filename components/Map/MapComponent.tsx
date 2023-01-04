import { Map, GeolocateControl, NavigationControl } from "react-map-gl";
import React, { useCallback, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerPopup from "./MarkerPopup";
import { INITIAL_VIEW_STATE } from "../../utils/constants";
import { CafeProps } from "../Cafe/Cafe.types";
import Markers from "./Markers";
import { useCafes } from "../../hooks/useCafes";

export const MapComponent = () => {
  const [cafe, setCafe] = useState<CafeProps | null>(null);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const handleDialog = () => {
  //     dialogOpen ? setDialogOpen(false) : setDialogOpen(true)
  // }
  const handleCafeUnselect = () => {
    setCafe(null);
  };

  const { data } = useCafes();

  const selectCafe = useCallback((selectedCafe: CafeProps) => {
    setCafe(selectedCafe);
  }, []);

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
        {data && <Markers data={data} selectCafe={selectCafe} />}
        {cafe && (
          <MarkerPopup cafe={cafe} handleCafeUnselect={handleCafeUnselect} />
        )}
      </Map>
    </div>
  );
};
