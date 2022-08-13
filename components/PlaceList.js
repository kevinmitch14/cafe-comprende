import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import PlaceListItem from "./PlaceListItem";
import db from "../firebase";
import Filters from "./Filters";

const PlaceList = ({ onSelectPlace, nearbyCafes, activeDiv, triggerGeoLocation }) => {
    const [cafes, setCafes] = useState([]);
    const [filters, setFilters] = useState();
    const [filterString, setFilterString] = useState("")
    console.log(filterString);

    useEffect(() => {
        return onSnapshot(query(collection(db, "cafes"), orderBy("time", "desc")), (snapshot) => {
            setCafes(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);

    // switch statement to filter by filters
    const filteredCafes = () => {
        switch (filters) {
            case "rating":
                return cafes.sort((a, b) => b.rating / b.reviews - a.rating / a.reviews);
            case "popularity":
                return cafes.sort((a, b) => b.reviews - a.reviews);
            // case "distance":
            // return nearbyCafes ? nearbyCafes : cafes;
            // nearbyCafes.sort((a, b) => a.distance - b.distance);
            // case "text":
            // return cafes.filter((cafe) => cafe.name.toLowerCase().includes(filterString.toLowerCase()));
            default:
                return cafes;
        }
    };
    console.log(filteredCafes().filter((cafe) => cafe.data.name.toLowerCase().includes(filterString.toLowerCase())));
    return (
        <div>
            <Filters setFilters={setFilters} setFilterString={setFilterString} triggerGeoLocation={triggerGeoLocation} />
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
                :
                // .filter((cafe) => cafe.name.toLowerCase().includes(filterString.toLowerCase()))
                filteredCafes()
                    // .filter((cafe) => cafe.data.name.toLowerCase()
                    //     .includes(filterString.toLowerCase()))
                    .filter((cafe) => cafe.data.name.toLowerCase().includes(filterString.toLowerCase()))
                    .map(({ data, rating, reviews }) => {
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
                    })
            }
        </div>
    );
};

export default PlaceList;
