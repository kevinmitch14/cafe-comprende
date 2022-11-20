import React, { memo } from "react";
import { Marker } from "react-map-gl";
import { CafeProps } from "../Cafe/Cafe.types";
import { MapPoint } from "./MapPoint";
import { useMap } from "react-map-gl";

type MarkerProps = {
  data: CafeProps[] | undefined;
  selectCafe: (cafe: CafeProps) => void;
};

const Markers = memo(function Markers({ data, selectCafe }: MarkerProps) {
  const { current: map } = useMap();
  return (
    <div>
      {data?.map((cafe) => {
        return (
          <Marker
            key={cafe.place_id}
            latitude={cafe.latitude}
            longitude={cafe.longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              selectCafe(cafe);
              map?.flyTo({
                center: [cafe.longitude, cafe.latitude],
                zoom: 5,
              });
            }}
          >
            <MapPoint />
          </Marker>
        );
      })}
      ;
    </div>
  );
});

export default Markers;
