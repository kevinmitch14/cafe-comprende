import { useQuery } from "react-query";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OfficeBuildingIcon, ViewListIcon } from '@heroicons/react/solid'
import Modal from "./Modal";
import PlaceListItem from "./PlaceListItem";


const PlaceList = () => {
    const [rating, setRating] = useState(null)

    const cancelButtonRef = useRef(null)
    const [checked, setChecked] = useState(false)
    console.log(checked)
    const handleCheck = (e) => {
        if (e.target.checked === true) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }


    const { isLoading, error, data } = useQuery(['cafes'], () =>
        fetch('/api/cafes').then(res =>
            res.json()
        )
    )

    if (isLoading) return

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="py-2">
            <label className="md:hidden flex pl-2 items-center text-blue-500" htmlFor="list">
                {checked ? <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                    <span>Close List</span></> :
                    <><ViewListIcon className="h-4 w-4" /><span>List View</span></>}
            </label>
            <input className="hidden peer" type={"checkbox"} id="list" ref={cancelButtonRef} onChange={(e) => handleCheck(e)}></input>
            <div className="divide-y hidden w-full h-0 duration-500 peer-checked:h-auto peer-checked:block">
                {/* <div className="divide-y"> */}
                {data.map((cafe, index) => {
                    return (
                        <PlaceListItem key={index} cafe={cafe} />
                    )
                })}
            </div>
        </div>
    )

}



export default PlaceList;
