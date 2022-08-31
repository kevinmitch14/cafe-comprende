import { useQuery } from "react-query";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OfficeBuildingIcon } from '@heroicons/react/solid'
import Modal from "./Modal";
import PlaceListItem from "./PlaceListItem";


const PlaceList = () => {
    const [rating, setRating] = useState(null)
    const cancelButtonRef = useRef(null)

    const { isLoading, error, data } = useQuery(['cafes'], () =>
        fetch('/api/cafes').then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="divide-y">
            {data.map((cafe, index) => {
                return (
                    <PlaceListItem key={index} cafe={cafe} />
                )
            })}
        </div>
    )

}



export default PlaceList;
