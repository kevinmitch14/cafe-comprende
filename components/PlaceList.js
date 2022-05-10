import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import PlaceListItem from "./PlaceListItem";
import db from "../firebase";

const PlaceList = ({ onSelectPlace, nearbyCafes, activeDiv }) => {
    const [cafes, setCafes] = useState([]);
    console.log(activeDiv)

    useEffect(() => {
        return onSnapshot(query(collection(db, "cafes")), (snapshot) => {
            setCafes(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);

    return (
        <div>
            {nearbyCafes
                ? nearbyCafes.map(({ data, distance, rating, reviews }) => (
                    <PlaceListItem
                        key={data.place_id}
                        data={data}
                        activeDiv={activeDiv}
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
                            activeDiv={activeDiv}
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
