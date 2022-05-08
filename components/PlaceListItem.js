import Image from "next/image";
import React from "react";

const PlaceListItem = ({ data, distance, onSelectPlace }) => {
    let imageRef = data.photos ? data.photos[0] : null;
    console.log(imageRef);
    return (
        <div
            className="m-4 flex items-center rounded-md border border-gray-200 pr-2 hover:cursor-pointer hover:bg-gray-50"
            onClick={() =>
                onSelectPlace(data.geometry.location.lng, data.geometry.location.lat)
            }
        >
            {imageRef && (
                <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${imageRef.width}&maxheight=${imageRef.height}&photo_reference=${imageRef.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                    alt={"image"}
                    height={100}
                    width={150}
                // width={imageRef.width}
                />
            )}
            <div className="flex flex-1 flex-col gap-y-1 p-4 py-4 text-gray-600">
                <p>{data.name}</p>
                {distance && (
                    <p className="text-xs">
                        {Math.round(distance * 100) / 100}km
                        {Math.round(distance * 100) / 100 > 5 && (
                            <span className="text-red-600">Far!</span>
                        )}
                    </p>
                )}
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="right-0 w-[20px] text-gray-400"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                ></path>
            </svg>
        </div>
    );
};

export default PlaceListItem;
