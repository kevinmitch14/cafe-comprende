/* eslint-disable @next/next/no-img-element */
import Script from "next/script";
import { useState } from "react";
import { RateFeaturedCafeModal } from "../index";
import dynamic from "next/dynamic";
import { GooglePlacesAPIValidator } from "./Cafe.types";
import { XIcon } from "@heroicons/react/solid";
import Dropdown from "../DropdownMenu/DropdownMenu";

const ToastComp = dynamic(() => import("../shared/Toast"), {
  ssr: false,
  // ignore dangerous hydration
});

// TODO convert to TypeScript
export const FeaturedCafe = () => {
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [featuredCafe, setFeaturedCafe] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
        <div className="mt-4 mb-2 flex h-auto overflow-hidden rounded-md border border-gray-200 shadow-sm hover:bg-gray-50">
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
          <div className="relative flex w-4/6 flex-col gap-2 bg-white p-2 pl-4 pt-4 text-left md:justify-between">
            {/* TODO add functionality to popover.*/}
            {/* <Dropdown /> */}
            <p className="font-bold md:text-lg">
              {featuredCafe.name}
            </p>
            {/* TODO show cafes reviews here */}
            <p className="">5/5 - 3 reviews</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="rounded-md border border-emerald-600  py-1.5 
              px-3 text-sm font-bold text-emerald-600 transition-colors duration-300 hover:bg-emerald-50 "
            >
              Rate
            </button>
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
      {/* TODO fix toast comp */}
      {/* {open && <ToastComp open={true} setOpen={setOpen} cafe={newCafe} />} */}
    </div>
  );
};

export default FeaturedCafe;
