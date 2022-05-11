import { doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import db from "../firebase";

const ExpandedDetails = ({ place, setExpanded }) => {
    const [reviewed, setReviewed] = useState(false);

    const updaterHandler = () => {
        updateDoc(doc(db, "cafes", place.place_id), {
            reviews: increment(1),
            rating: increment(Number(rating)),
        });
    };

    const createDoc = () => {
        setDoc(doc(db, "cafes", place.place_id), {
            data: place,
            location: place.geometry.location,
            time: serverTimestamp(),
            rating: Number(rating),
            reviews: 1,
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
        <div className="relative flex flex-col items-start gap-y-1 border-t p-2 py-4 text-sm text-gray-600">
            <span
                className="absolute top-4 right-2 text-blue-500 underline hover:cursor-pointer"
                onClick={() => setExpanded(false)}
            >
                Cancel
            </span>
            <div className="flex items-center justify-between gap-x-2">
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
                </div>
            </div>
            <p>
                <a href={place.url} target="_blank" rel="noreferrer">
                    Directions
                </a>
            </p>
            <p>
                <a href={place.website}>{place.website}</a>
            </p>
        </div>
    );
};

export default ExpandedDetails;
