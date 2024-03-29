import { useState } from "react";
import { RateExistingCafeModal } from "../Modal/RateExistingCafeModal";
import { CafeProps, Review } from "./Cafe.types";
import { useProfile } from "../../hooks/useProfile";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { useSession } from "next-auth/react";
import LoggedOutModal from "../shared/logged-out-modal";
import { useAddBookmark, useRemoveBookmark } from "../../hooks/useBoomark";

export const Cafe = ({ cafe }: { cafe: CafeProps }) => {
  const { data: session } = useSession();
  const removeBookmark = useRemoveBookmark(cafe);
  const addBookmark = useAddBookmark(cafe);

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

  const { data: profileData } = useProfile({
    email: (session?.user?.email && session?.user?.email) as string,
    enabled: !!session?.user?.email,
  });
  const isCafeBookmarked = profileData?.bookmarks?.some(
    (item: CafeProps) => item.place_id === cafe.place_id
  );

  return (
    <div className="relative mb-3 flex flex-col items-start gap-1 rounded-lg border p-2.5 shadow-sm md:gap-2 md:p-3">
      <h3 className="w-11/12 text-left text-base font-bold md:text-lg">
        {cafe.name}
      </h3>
      <p className="text-sm font-medium">
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
      <div className="mt-1 flex gap-x-2">
        <button
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
          onClick={handleDialog}
        >
          Rate
        </button>
        <button
          className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto md:text-base"
          onClick={() =>
            session
              ? isCafeBookmarked
                ? removeBookmark.mutate()
                : addBookmark.mutate()
              : setDialogOpen(true)
          }
        >
          {addBookmark.isLoading || removeBookmark.isLoading ? (
            <LoadingSpinner size="small" />
          ) : isCafeBookmarked ? (
            <BookmarkIcon className="h-4 w-4 fill-blue-500 stroke-blue-500 stroke-2 transition-transform delay-[25ms] group-hover:scale-105" />
          ) : (
            <BookmarkIcon className="h-4 w-4 stroke-2 transition-transform delay-[25ms] group-hover:scale-105" />
          )}
        </button>
      </div>
      {dialogOpen && session && (
        <RateExistingCafeModal handleDialog={handleDialog} cafe={cafe} />
      )}
      <LoggedOutModal
        session={session}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};
