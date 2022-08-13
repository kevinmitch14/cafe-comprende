import { BookmarkIcon, GlobeAltIcon, XIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { arrayUnion, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import db from "../firebase";

const ExpandedDetails = ({ place, setExpanded, activeDiv }) => {
    const [reviewed, setReviewed] = useState(false);
    const { data: session } = useSession()
    console.log(session)

    const updaterHandler = () => {
        updateDoc(doc(db, "cafes", place.place_id), {
            reviews: increment(1),
            rating: increment(Number(rating)),
            time: serverTimestamp(),
            user: arrayUnion(session.user.email)
        });
    };

    const addToSavedList = () => {
        setDoc(doc(db, "accounts", session.user.email), {
            saved: arrayUnion(place.place_id)
        }, { merge: true });
    };

    const createDoc = () => {
        // setDoc(doc(db, "cafes", place.place_id), {
        //     data: place,
        //     location: place.geometry.location,
        //     time: serverTimestamp(),
        //     rating: Number(rating),
        //     reviews: 1,
        //     user: arrayUnion(session.user.email)
        // });

        setDoc(doc(db, "accounts", session.user.email), {
            data: session.user,
            time: serverTimestamp(),
            reviews: arrayUnion(place.place_id)
        });
    };

    const handleSubmit = async () => {
        const docRef = doc(db, "cafes", place.place_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            updaterHandler();
        } else {
            createDoc();
        }
        setReviewed(true)
    };

    const [rating, setRating] = useState(null);

    return (
        <div className="relative flex flex-col items-start gap-y-1 border-t p-2 py-4 text-gray-600">
            <button
                className="absolute top-4 right-2 text-gray-500 underline hover:cursor-pointer"
                onClick={() => setExpanded(false)}
            >
                <XIcon className="h-4 w-4" />
            </button>
            <div className="flex items-center justify-between gap-x-2">
                {session ? <>
                    <span>Rate this cafe</span>
                    <div className="flex">
                        <div className="flex gap-x-1">
                            <button
                                className={`+ border px-2 ${rating === "1" && `bg-emerald-200`}`}
                                onClick={(e) => setRating(e.target.value)}
                                value={1}
                            >
                                1
                            </button>
                            <button
                                className={`+ border px-2 ${rating === "2" && `bg-emerald-200`}`}
                                onClick={(e) => setRating(e.target.value)}
                                value={2}
                            >
                                2
                            </button>
                            <button
                                className={`+ border px-2 ${rating === "3" && `bg-emerald-200`}`}
                                onClick={(e) => setRating(e.target.value)}
                                value={3}
                            >
                                3
                            </button>
                            <button
                                className={`+ border px-2 ${rating === "4" && `bg-emerald-200`}`}
                                onClick={(e) => setRating(e.target.value)}
                                value={4}
                            >
                                4
                            </button>
                            <button
                                className={`+ border px-2 ${rating === "5" && `bg-emerald-200`}`}
                                onClick={(e) => setRating(e.target.value)}
                                value={5}
                            >
                                5
                            </button>
                        </div>
                        <button
                            disabled={reviewed}
                            className={`+ ml-2 rounded border bg-emerald-500 px-2 text-base text-white ${!rating && ` grayscale`
                                } ${reviewed && `grayscale`}`}
                            onClick={!reviewed ? handleSubmit : null}
                        >
                            →
                        </button>
                    </div></> : <p>Sign in to rate a cafe.</p>}
            </div>
            <p className="flex items-center gap-x-1 group hover:cursor-pointer" onClick={() => addToSavedList()}>
                <BookmarkIcon className="h-4 w-4 group-hover:text-blue-400" />
                Add to saved list
            </p>
            <p className="flex items-center gap-x-1">
                <LocationMarkerIcon className="h-4 w-4" />
                <a href={place.url} target="_blank" rel="noreferrer">
                    Directions
                </a>
            </p>
            <p className="flex items-center gap-x-1">
                <GlobeAltIcon className="h-4 w-4" />
                <a target="_blank" rel="noreferrer" href={place.website}>Website</a>
            </p>
        </div>
    );
};

export default ExpandedDetails;
