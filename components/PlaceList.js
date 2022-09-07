import { useQuery } from "react-query";
import { useRef, useState } from 'react'
import { ViewListIcon } from '@heroicons/react/solid'
import PlaceListItem from "./PlaceListItem";


const PlaceList = () => {
    const [rating, setRating] = useState(null)

    const cancelButtonRef = useRef(null)
    const [checked, setChecked] = useState(false)
    const handleCheck = (e) => {
        if (e.target.checked === true) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }


    const { isLoading, isError, data, error } = useQuery(['cafes'], () =>
        fetch('/api/cafes').then(res =>
            res.json()
        )
    )

    if (isError) return 'An error has occurred: ' + error.message

    return (
        <div className="py-2">
            <label className="md:hidden flex pl-2 items-center text-blue-500" htmlFor="list">
                {checked ? <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Close List</span></> :
                    <><ViewListIcon className="h-4 w-4" /><span>List View</span></>}
            </label>
            <input className="hidden peer" type={"checkbox"} id="list" ref={cancelButtonRef} onChange={(e) => handleCheck(e)}></input>
            <div className="divide-y divide-solid hidden md:block w-full duration-500 peer-checked:h-auto peer-checked:block">
                {isLoading && <p>Loading</p>}
                {data && data.map((cafe, index) => {
                    return (
                        <PlaceListItem key={index} cafe={cafe} />
                    )
                })}
            </div>
        </div>
    )

}



export default PlaceList;
