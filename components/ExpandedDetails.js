import React, { useState } from "react";

const ExpandedDetails = ({ data, setExpanded }) => {
    const updaterHandler = () => {
        updateDoc(doc(db, "cafes", place.result.place_id), {
            reviews: increment(1),
            rating: increment(Number(rating)),
        });
    };

    const createDoc = () => {
        setDoc(doc(db, "cafes", place.result.place_id), {
            data: place.result,
            location: place.result.geometry.location,
            time: serverTimestamp(),
            rating: Number(rating),
            reviews: 1,
        });
    };

    const handleSubmit = async () => {
        const docRef = doc(db, "cafes", place.result.place_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            updaterHandler();
        } else {
            createDoc();
        }
        setPlace(null);
        setValue("");
        setReview(false);
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
                        className={`+ ml-2 rounded border bg-emerald-500 px-2 text-base text-white ${!rating && ` grayscale`
                            }`}
                        onClick={handleSubmit}
                    >
                        →
                    </button>
                </div>
            </div>
            <p>
                <a href={data.url} target="_blank" rel="noreferrer">
                    Directions
                </a>
            </p>
            <p>
                <a href={data.website}>{data.website}</a>
            </p>
        </div>
    );
};

export default ExpandedDetails;
