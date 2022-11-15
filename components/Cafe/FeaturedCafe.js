/* eslint-disable @next/next/no-img-element */
import Script from "next/script";
import { useState } from "react";
import { RatingModal } from "..";
import dynamic from "next/dynamic";
import Image from "next/image";

const ToastComp = dynamic(() => import("../../utils/Toast"), {
  ssr: false,
  // ignore dangerous hydration
});


export const FeaturedCafe = () => {
  const [inputValue, setInputValue] = useState("");
  const [featuredCafe, setFeaturedCafe] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    dialogOpen ? setDialogOpen(false) : setDialogOpen(true);
  };

  function initService() {
    const options = { types: ["cafe"] };
    const input = document.getElementById("pac-input");
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener("place_changed", () => {
      setFeaturedCafe(autocomplete.getPlace());
      setInputValue("");
    });
  }

  const newCafe = {
    name: featuredCafe?.name,
    latitude: featuredCafe?.geometry.location.lat(),
    longitude: featuredCafe?.geometry.location.lng(),
    googlePlaceID: featuredCafe?.place_id,
  };

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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <span className="text-gray-500 sm:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </div>
        <input
          id="pac-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-1 py-2 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          type="text"
          placeholder="Enter a location"
        />
      </div>

      {featuredCafe && (
        <div className="mt-4 mb-2 flex h-auto overflow-hidden rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:bg-gray-50">
          {featuredCafe.photos && (
            <div className="w-2/6">
              <img
                src={featuredCafe.photos[0].getUrl({
                  maxWidth: featuredCafe.photos[0].width,
                  maxHeight: featuredCafe.photos[0].height,
                })}
                alt={"image"}
                className="aspect-square h-full w-full rounded-l-md object-cover"
              />
              {/* <Image
                                src={featuredCafe.photos[0].getUrl({ maxWidth: featuredCafe.photos[0].width, maxHeight: featuredCafe.photos[0].height })}
                                alt={"image"}
                                className="rounded-l-md h-full w-full aspect-video object-cover"
                                height={40}
                                width={40}
                                layout={'responsive'}
                            /> */}
            </div>
          )}
          <div className="flex w-4/6 flex-col justify-between gap-y-4 bg-white px-3 pb-2 pt-6 text-left">
            <div>
              <p className="truncate font-bold">{featuredCafe.name}</p>
              <p className="text-xs text-gray-500">No reviews yet!</p>
            </div>
            <div className="flex gap-x-2">
              <button
                onClick={() => setDialogOpen(true)}
                className="flex-1 rounded-md border border-emerald-500 bg-emerald-500 py-1.5 px-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-emerald-500"
              >
                Rate
              </button>
              <button
                onClick={() => setFeaturedCafe(null)}
                className="flex-1 rounded-md border border-red-600 bg-red-600 py-1.5 px-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {dialogOpen && (
        <RatingModal
          handleDialog={handleDialog}
          setFeaturedCafe={setFeaturedCafe}
          cafe={newCafe}
          setOpen={setOpen}
        />
      )}
      {open && <ToastComp open={true} setOpen={setOpen} cafe={newCafe} />}
    </div>
  );
};

export default FeaturedCafe;
