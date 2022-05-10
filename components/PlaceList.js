import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import PlaceListItem from "./PlaceListItem";
import db from "../firebase";

const PlaceList = ({ onSelectPlace, nearbyCafes }) => {
    const [cafes, setCafes] = useState([]);

    useEffect(() => {
        return onSnapshot(query(collection(db, "cafes")), (snapshot) => {
            setCafes(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);
    console.log(cafes)

    return (
        <div>
            {nearbyCafes
                ? nearbyCafes.map(({ data, distance, rating, reviews }) => (
                    <PlaceListItem
                        key={data.place_id}
                        data={data}
                        rating={rating}
                        reviews={reviews}
                        distance={distance}
                        onSelectPlace={onSelectPlace}
                    />
                ))
                : cafes.map(({ data, rating, reviews }) => {
                    return (
                        <PlaceListItem
                            key={data.place_id}
                            data={data}
                            rating={rating}
                            reviews={reviews}
                            onSelectPlace={onSelectPlace}
                        />
                    );
                })}
        </div>
    );
};

export default PlaceList;
