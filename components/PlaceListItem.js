import Image from "next/image";
import React, { useState } from "react";
import ExpandedDetails from "./ExpandedDetails";

const PlaceListItem = ({ data, rating, reviews, distance, onSelectPlace }) => {
    let imageRef = data.photos ? data.photos[0] : null;
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div
                className={`m-4 flex flex-col relative rounded-md border ${expanded && `hover:cursor-default`} border-gray-200 pr-2 hover:cursor-pointer hover:bg-gray-50`}
                onClick={() => {
                    !expanded && onSelectPlace(data.geometry.location.lng, data.geometry.location.lat);
                    !expanded && setExpanded(true)
                }}
            >
                <div className="flex" onClick={() => setExpanded(false)}>{imageRef && (
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
                        <p>{rating / reviews} ★</p><p className="text-sm">{reviews} {reviews === 1 ? <span>review</span> : <span>reviews</span>}</p>
                        {distance && (
                            <p className="text-xs">
                                {Math.round(distance * 100) / 100}km
                                {Math.round(distance * 100) / 100 > 10 && (
                                    <span className="text-red-600">Far!</span>
                                )}
                            </p>
                        )}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`right-0 w-[20px] text-gray-400 ${expanded && `rotate-90`} duration-300`}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </div>
                {expanded && (
                    <ExpandedDetails data={data} setExpanded={setExpanded} />
                )}
            </div>
        </>
    );
};

export default PlaceListItem;
