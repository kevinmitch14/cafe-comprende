import React, { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import PlaceListItem from "./PlaceListItem";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import Image from "next/image";

const Autocomplete = ({ onSelectPlace, setCafes }) => {
    const [place, setPlace] = useState(null);
    console.log(place);

    const [image, setImage] = useState(null);

    const handleSubmit = () => {
        setDoc(doc(db, "cafes", place.result.name), {
            data: place.result,
        });
        setPlace(null);
        setValue("");
    };

    const fetchExtraData = async (place) => {
        const proxyurl = "https://young-basin-20621.herokuapp.com/";
        const url =
            "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
            place.place_id +
            `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`; // site that doesn’t send Access-Control-*
        const response = await fetch(proxyurl + url);
        const data = await response.json();
        setPlace(data);
        onSelectPlace(
            data.result.geometry.location.lng,
            data.result.geometry.location.lat
        );
        // setImage(fetchImage(place).then((data) => data))
        // handleSubmit()
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
            // componentRestrictions: { country: "us" },
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
                    <p>
                        {suggestion.structured_formatting.main_text} -{" "}
                        {suggestion.structured_formatting.secondary_text}
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
                <div className="m-4 flex items-center rounded-md border border-gray-200 pr-2 hover:cursor-pointer hover:bg-gray-50">
                    {place.result.photos && (
                        <Image
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&maxheight=150&photo_reference=${place.result.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                            alt={"image"}
                            height={100}
                            width={100}
                        />
                    )}
                    <div>
                        <p className="p-4">{place.result.name}</p>
                        <select
                            name="rating"
                            id="rating"
                            className="rounded border bg-white px-2 py-1 text-base"
                        >
                            <option disabled>Rating</option>
                            <option value="1" className="bg-red-200">
                                1
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button
                            className="rounded border bg-white px-2 py-1 text-base"
                            onClick={handleSubmit}
                        >
                            Submit Rating
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Autocomplete;
