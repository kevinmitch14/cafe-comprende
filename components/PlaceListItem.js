import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import ExpandedDetails from "./ExpandedDetails";

const PlaceListItem = ({ data, rating, reviews, distance, activeDiv, onSelectPlace }) => {
    let imageRef = data.photos ? data.photos[0] : null;
    const [expanded, setExpanded] = useState(false);

    const divRef = useRef()
    const expandRef = useRef()

    useEffect(() => {
        if (expandRef.current)
            expandRef.current.scrollIntoView({ block: "end" });
    }, [expanded])


    useEffect(() => {
        if (activeDiv === data.place_id) {
            divRef.current.click()
        }
    }, [activeDiv, data.place_id])

    // round number to one decimal place
    const round = (num) => {
        return Math.round(num * 10) / 10;
    }

    return (
        <>
            <div
                ref={divRef}
                className={`${data.place_id} m-4 flex flex-col relative rounded-md border ${expanded && `hover:cursor-default`} border-gray-200 pr-2 ${activeDiv === data.place_id && `bg-gray-100 border-2 border-black`} hover:cursor-pointer hover:bg-gray-50`}
                onClick={() => {
                    !expanded && onSelectPlace(data.geometry.location.lng, data.geometry.location.lat);
                    !expanded && setExpanded(true);
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

                    <div className={`flex flex-1 flex-col gap-y-1 p-4 py-4 text-gray-600}`}>
                        <p>{data.name}</p>
                        <p>{Math.round((rating / reviews) * 10) / 10} ★<span className="text-sm pl-3">{reviews} {reviews === 1 ? <span>review</span> : <span>reviews</span>}</span></p>
                        {distance && (
                            <p className="text-xs">
                                {Math.round(distance * 100) / 100}km
                                {Math.round(distance * 100) / 100 > 10 && (
                                    <span className="text-red-600 pl-2">Far!</span>
                                )}
                            </p>
                        )}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`right-0 w-[20px] text-gray-400 ${expanded && `rotate-90`} hover:cursor-pointer duration-300`}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </div>
                {expanded && (
                    <div ref={expandRef}>
                        <ExpandedDetails place={data} setExpanded={setExpanded} />
                    </div>
                )}
            </div>
        </>
    );
};

export default PlaceListItem;
