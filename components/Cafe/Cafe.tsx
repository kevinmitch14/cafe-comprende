import { useState } from "react";
import { RateExistingCafeModal } from "../Modal/RateExistingCafeModal";
import { CafeProps, Review } from "./Cafe.types";

export const Cafe = ({ cafe }: { cafe: CafeProps }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const accumCafeRating = cafe.reviews.reduce(
    (prev: number, current: Review) => prev + current.rating,
    0
  );
  const numberOfCafeReviews = cafe.reviews.length;
  const averageCafeRating = accumCafeRating / numberOfCafeReviews;

  const handleDialog = () => {
    dialogOpen ? setDialogOpen(false) : setDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-1.5 items-start p-4 rounded-lg shadow-sm border mb-2">
      <h3 className="text-lg font-bold">{cafe.name}</h3>
      <p>
        Rating:{" "}
        {Number.isInteger(averageCafeRating)
          ? averageCafeRating
          : averageCafeRating.toFixed(1)}
        /5
        <span className="pl-1 text-sm text-gray-500">
          ({numberOfCafeReviews}{" "}
          {numberOfCafeReviews > 1 ? "reviews" : "review"})
        </span>
      </p>
      <div className="flex gap-x-2">
        <button
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={handleDialog}
        >
          Rate
        </button>
      </div>
      {dialogOpen && (
        <RateExistingCafeModal handleDialog={handleDialog} cafe={cafe} />
      )}
    </div>
  );
};
