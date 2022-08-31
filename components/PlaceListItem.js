import React, { useState } from 'react'
import Modal from './Modal'

const PlaceListItem = ({ cafe }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <div className='p-4'>
            <h3 className='font-bold text-lg'>{cafe.name}</h3>

            <div className='flex justify-between items-center'>
                <p>Rating: {cafe.rating}/5</p>
                <div className='flex gap-x-2'>
                    <button
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    </button>
                    <button
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setDialogOpen(true)}>Rate this cafe.
                    </button>
                </div>
            </div>
            {dialogOpen && <Modal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cafe={cafe} />}
        </div>
    )
}

export default PlaceListItem
