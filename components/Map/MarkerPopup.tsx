import { Popup } from "react-map-gl";
import { useState } from "react";
import { CafeDetailsModal } from "..";
import { MarkerPopupProps } from "./Map.types";

const MarkerPopup = ({ cafe, handleCafeUnselect }: MarkerPopupProps) => {
  const [infoModal, setInfoModal] = useState(false);
  const handleDialog = () => {
    infoModal ? setInfoModal(false) : setInfoModal(true);
  };

  const averageRating = () => {
    return (
      cafe.reviews.reduce((prev, current) => prev + current.rating, 0) /
      cafe.reviews.length
    ).toFixed(2);
  };

  return (
    <Popup
      anchor="top"
      focusAfterOpen={false}
      longitude={Number(cafe.longitude)}
      latitude={Number(cafe.latitude)}
      onClose={() => handleCafeUnselect()}
      className={"w-full"}
    >
      <h3 className="pl-1 text-lg font-bold leading-tight">{cafe.name}</h3>
      <p className="pl-1 text-sm text-gray-400">Address here</p>
      <div className="h-[120px] w-full rounded-xl bg-gray-800/70"></div>
      <p>
        {averageRating()}
        /5 -{" "}
        <span className="text-sm">
          {cafe.reviews.length} {cafe.reviews.length > 1 ? "reviews" : "review"}
        </span>
      </p>
      <button
        className="text-xs text-blue-500 underline hover:cursor-pointer"
        onClick={() => handleDialog()}
      >
        More details
      </button>
      {infoModal && (
        <CafeDetailsModal cafe={cafe} handleDialog={handleDialog} />
      )}
    </Popup>
  );
};

export default MarkerPopup;
