import React, { useState } from 'react'

const ExpandedDetails = ({ data, setExpanded }) => {
    const updaterHandler = () => {
        updateDoc(doc(db, 'cafes', place.result.place_id), {
            reviews: increment(1),
            rating: increment(Number(rating))
        })
    }

    const createDoc = () => {
        setDoc(doc(db, "cafes", place.result.place_id), {
            data: place.result,
            location: place.result.geometry.location,
            time: serverTimestamp(),
            rating: Number(rating),
            reviews: 1
        })
    }

    const handleSubmit = async () => {
        const docRef = doc(db, 'cafes', place.result.place_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            updaterHandler()
        } else {
            createDoc()
        }
        setPlace(null);
        setValue("");
        setReview(false)
    };

    const [rating, setRating] = useState(null)

    return (
        <div className="border-t items-start text-sm p-2 flex flex-col gap-y-1 text-gray-600 relative">
            <span className='absolute hover:cursor-pointer top-2 right-2 text-sky-400 underline' onClick={() => setExpanded(false)}>Cancel</span>
            <div className='flex items-center gap-x-2 justify-between'>
                <span>
                    Rate this cafe
                </span>
                <div className='flex'>
                    <div className="flex gap-x-1">
                        <button className={`px-2 border + ${rating === '1' && `bg-emerald-200`}`} onClick={(e) => setRating(e.target.value)} value={1}>1</button>
                        <button className={`px-2 border + ${rating === '2' && `bg-emerald-200`}`} onClick={(e) => setRating(e.target.value)} value={2}>2</button>
                        <button className={`px-2 border + ${rating === '3' && `bg-emerald-200`}`} onClick={(e) => setRating(e.target.value)} value={3}>3</button>
                        <button className={`px-2 border + ${rating === '4' && `bg-emerald-200`}`} onClick={(e) => setRating(e.target.value)} value={4}>4</button>
                        <button className={`px-2 border + ${rating === '5' && `bg-emerald-200`}`} onClick={(e) => setRating(e.target.value)} value={5}>5</button>
                    </div>
                    <button
                        className={`ml-2 rounded border text-white bg-emerald-500 px-2 text-base + ${!rating && ` grayscale`}`}
                        onClick={handleSubmit}
                    >
                        →
                    </button>
                </div>
            </div>
            <p><a href={data.url} target="_blank" rel="noreferrer">Directions</a></p>
            <p><a href={data.website}>{data.website}</a></p>
        </div>
    )
}

export default ExpandedDetails