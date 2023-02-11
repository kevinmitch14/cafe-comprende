/* eslint-disable @next/next/no-img-element */
import Script from "next/script";
import { useState } from "react";
import { RateFeaturedCafeModal } from "../index";
import { CafeProps, GooglePlacesAPIValidator, Review } from "./Cafe.types";
// TODO fix this, bookmark cafe that is not rated.
import { BookmarkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "../../hooks/useProfile";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { useSession } from "next-auth/react";
import LoggedOutModal from "../shared/logged-out-modal";
import { useAddBookmark, useRemoveBookmark } from "../../hooks/useBoomark";

export const FeaturedCafe = () => {
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [featuredCafe, setFeaturedCafe] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const validatedCafe =
    featuredCafe && GooglePlacesAPIValidator.parse(featuredCafe);

  const CafeDTO = {
    latitude: validatedCafe?.geometry.location.lat() as number,
    longitude: validatedCafe?.geometry.location.lng() as number,
    name: validatedCafe?.name as string,
    place_id: validatedCafe?.place_id as string,
  };

  const removeBookmark = useRemoveBookmark(CafeDTO);
  const addBookmark = useAddBookmark(CafeDTO);

  const { data: session } = useSession();

  const handleDialog = () => {
    dialogOpen ? setDialogOpen(false) : setDialogOpen(true);
  };

  const handleSubmitReview = () => {
    featuredCafe && setFeaturedCafe(null);
    setInputValue("");
  };

  const handleInputCancel = handleSubmitReview;

  function initService() {
    const options = { types: ["cafe"] };
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener("place_changed", () => {
      setFeaturedCafe(autocomplete.getPlace());
      setInputValue(autocomplete.getPlace().name);
    });
  }

  if (typeof window !== "undefined") {
    window.initService = initService;
  }
  const queryClient = useQueryClient();
  const cafeData = queryClient.getQueryData(["cafes"]) as CafeProps[];
  const isCafeRated =
    cafeData &&
    cafeData.find(
      (item: CafeProps) => item.place_id === validatedCafe?.place_id
    );
  const reviewCount = isCafeRated !== undefined && isCafeRated.reviews.length;
  const averageRating =
    isCafeRated !== undefined
      ? isCafeRated.reviews.reduce(
          (prev: number, current: Review) => prev + current.rating,
          0
        )
      : 0;

  const { data: profileData } = useProfile({
    email: (session?.user?.email && session?.user?.email) as string,
    enabled: !!session?.user?.email,
  });
  const isCafeBookmarked = profileData?.bookmarks?.some(
    (item: CafeProps) => item.place_id === validatedCafe?.place_id
  );

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.NODE_ENV == "development"
            ? process.env.NEXT_PUBLIC_GOOGLE_API_LOCAL
            : process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        }&callback=initService&libraries=places`}
      />
      <div className="relative mt-1 w-full rounded-md shadow-sm md:self-center">
        {inputValue !== "" && (
          <button
            onClick={() => handleInputCancel()}
            className=" absolute inset-y-0 right-4 flex items-center"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
        <input
          id="pac-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-1 py-2 pl-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          type="text"
          placeholder="Enter a location"
        />
      </div>

      {featuredCafe && (
        <div className="mt-4 mb-2 flex overflow-hidden rounded-md border border-gray-200 shadow-sm hover:bg-gray-50">
          {/* TODO fix image */}
          {featuredCafe.photos && (
            <div className="w-2/6">
              <img
                src={featuredCafe?.photos[0]?.getUrl({
                  maxWidth: featuredCafe?.photos[0].width,
                  maxHeight: featuredCafe?.photos[0].height,
                })}
                alt={"image"}
                className="aspect-square h-full w-full rounded-l-md object-cover"
              />
            </div>
          )}
          <div className="relative flex w-4/6 flex-col gap-1 bg-white p-2.5 text-left md:gap-2 md:p-3">
            {/* TODO add functionality to popover.*/}
            {/* <Dropdown /> */}
            <h3 className="w-11/12 text-left text-base font-bold md:text-lg">
              {featuredCafe.name}
            </h3>
            {isCafeRated && reviewCount > 0 ? (
              <p className="text-sm font-medium">
                Rating:{" "}
                {Number.isInteger(averageRating) ? 4 : averageRating.toFixed(1)}
                /5
                <span className="pl-1 text-sm text-gray-500">
                  ({reviewCount} {reviewCount > 1 ? "reviews" : "review"})
                </span>
              </p>
            ) : (
              <p className="text-sm font-medium">Not rated yet</p>
            )}
            <div className="mt-1 flex gap-x-2">
              <button
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                onClick={() => setDialogOpen(true)}
              >
                Rate
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto md:text-base"
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
          </div>
        </div>
      )}
      {dialogOpen && session && validatedCafe && (
        <RateFeaturedCafeModal
          handleDialog={handleDialog}
          handleSubmitReview={handleSubmitReview}
          cafe={{
            ...validatedCafe,
            latitude: validatedCafe?.geometry.location.lat(),
            longitude: validatedCafe?.geometry.location.lng(),
          }}
        />
      )}
      <LoggedOutModal
        session={session}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

export default FeaturedCafe;
