import React, { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { doc, setDoc, addDoc, serverTimestamp, updateDoc, increment, getDoc } from "firebase/firestore";
import db from "../firebase";
import Image from "next/image";


const Autocomplete = ({ onSelectPlace, setCafes, setReview }) => {
    const [place, setPlace] = useState(null);
    const [rating, setRating] = useState(null)
    console.log(rating)
    const [image, setImage] = useState(null);


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

    const fetchExtraData = async (place) => {
        const proxyurl = "https://young-basin-20621.herokuapp.com/";
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`; // site that doesn’t send Access-Control-*
        const response = await fetch(proxyurl + url);
        const data = await response.json();
        setPlace(data);
        onSelectPlace(
            data.result.geometry.location.lng,
            data.result.geometry.location.lat
        );
    };

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            offset: 3,
            types: ["cafe"],
        },
        debounce: 300,
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = (suggestion) => {
        setValue(suggestion.description, false);
        clearSuggestions();
        fetchExtraData(suggestion);
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            return (
                <li
                    className="border p-1 text-sm hover:cursor-pointer hover:bg-gray-100"
                    key={suggestion.place_id}
                    onClick={() => handleSelect(suggestion)}
                >
                    <p>{suggestion.structured_formatting.main_text} -{" "}{suggestion.structured_formatting.secondary_text}
                    </p>
                </li>
            );
        });

    return (
        <div className="w-[100%]">
            <input
                className="w-[70%] rounded-md border border-gray-300 p-1"
                value={value}
                onChange={handleInput}
                placeholder="Search a cafe to rate..."
            />
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
            {place && (
                <div className="m-4 flex rounded-md border border-gray-200 pr-2 hover:cursor-pointer hover:bg-gray-50">
                    {place.result.photos && (
                        <Image
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&maxheight=150&photo_reference=${place.result.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                            alt={"image"}
                            height={100}
                            width={100}
                        />
                    )}
                    <div className="p-4">
                        <p>{place.result.name}</p>
                        <div className="flex">
                            <select name="rating" id="rating" className="rounded border bg-white h-8" onChange={(e) => setRating(e.target.value)}>
                                <option disabled defaultValue={'Rating'}>Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button
                                className="rounded border bg-white p-1 px-2 text-base h-8"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Autocomplete;
