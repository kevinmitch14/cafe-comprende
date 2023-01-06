/* eslint-disable @next/next/no-img-element */
import Script from "next/script";
import { useState } from "react";
import { RateFeaturedCafeModal } from "../index";
import { CafeProps, GooglePlacesAPIValidator, Review } from "./Cafe.types";
import { XIcon } from "@heroicons/react/solid";
// TODO fix this, bookmark cafe that is not rated.
import Dropdown from "../DropdownMenu/DropdownMenu";
import { BookmarkIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../hooks/useProfile";
import { notifyAddBookmark, notifyError, notifyRemoveBookmark } from "../shared/Toasts";
import axios from "axios";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const FeaturedCafe = () => {
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [featuredCafe, setFeaturedCafe] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addBookmark = useMutation(
    () => {
      return axios.post("/api/addBookmark", {
        ...validatedCafe, latitude: validatedCafe?.geometry.location.lat(),
        longitude: validatedCafe?.geometry.location.lng(),
      });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["profile"]);
      },
      onSuccess: () => {
        notifyAddBookmark()
      },
      onError: (error: Error) => {
        notifyError(error.message)
      },
      onSettled: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );
  const removeBookmark = useMutation(
    () => {
      return axios.post("/api/removeBookmark", {
        ...validatedCafe, latitude: validatedCafe?.geometry.location.lat(),
        longitude: validatedCafe?.geometry.location.lng(),
      });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["profile"]);
      },
      onSuccess: () => {
        notifyRemoveBookmark()
      },
      onError: (error: Error) => {
        notifyError(error.message)
      },
      onSettled: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );

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
  const validatedCafe =
    featuredCafe && GooglePlacesAPIValidator.parse(featuredCafe);

  if (typeof window !== "undefined") {
    window.initService = initService;
  }
  const queryClient = useQueryClient()
  const cafeData = queryClient.getQueryData(["cafes"]) as CafeProps[]
  const isCafeRated = cafeData && cafeData.find((item: CafeProps) => item.place_id === validatedCafe?.place_id)
  const reviewCount = isCafeRated !== undefined && isCafeRated.reviews.length
  const averageRating = isCafeRated !== undefined ? isCafeRated.reviews.reduce(
    (prev: number, current: Review) => prev + current.rating,
    0
  ) : 0;

  const profileData = queryClient.getQueryData(['profile']) as Profile
  const isCafeBookmarked = profileData?.bookmarks?.some((item: CafeProps) => item.place_id === validatedCafe?.place_id);

  return (
    <div className="px-2 md:px-4">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NODE_ENV == "development"
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
            <XIcon className="h-4 w-4" />
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
          <div className="relative flex w-4/6 flex-col gap-2 bg-white py-3 px-3 text-left">
            {/* TODO add functionality to popover.*/}
            {/* <Dropdown /> */}
            <h3 className="text-lg font-bold text-left w-11/12">{featuredCafe.name}</h3>
            {isCafeRated && reviewCount > 0 ?
              <p className="text-sm font-medium">
                Rating:{" "}
                {Number.isInteger(averageRating)
                  ? 4
                  : averageRating.toFixed(1)}
                /5
                <span className="pl-1 text-sm text-gray-500">
                  ({reviewCount}{" "}
                  {reviewCount > 1 ? "reviews" : "review"})
                </span>
              </p>
              : <p className="text-sm font-medium">Not rated yet</p>}
            <div className="flex gap-x-2 mt-1">
              <button
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setDialogOpen(true)}
              >
                Rate
              </button>
              <button
                className="mt-3 flex items-center gap-1 w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => isCafeBookmarked ? removeBookmark.mutate() :
                  addBookmark.mutate()}
              >
                {addBookmark.isLoading || removeBookmark.isLoading ? <LoadingSpinner size="small" /> : isCafeBookmarked ?
                  <BookmarkIcon className="fill-blue-500 stroke-blue-500 h-4 w-4 transition-transform delay-[25ms] group-hover:scale-105" />
                  :
                  <BookmarkIcon className="h-4 w-4 transition-transform delay-[25ms] group-hover:scale-105" />
                }
              </button>
            </div>
          </div>
        </div>
      )}
      {dialogOpen && validatedCafe && (
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
    </div>
  );
};

export default FeaturedCafe;
