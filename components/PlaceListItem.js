import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Modal from './Modal'
import axios from "axios";


const PlaceListItem = ({ cafe }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [rating, setRating] = useState(null)

    const queryClient = useQueryClient()
    const originalMutation = (newCafe) => {
        return axios.post('/api/createReview', newCafe)
    }

    const newCafe = {
        name: cafe.name,
        rating: rating,
        latitude: cafe.latitude,
        longitude: cafe.longitude,
    }

    const addCafeMutationFromList = useMutation(originalMutation, {
        // When mutate is called:
        onMutate: async newCafe => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries('cafes')

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData('cafes')
            // Optimistically update to the new value
            queryClient.setQueryData('cafes', old => [newCafe, ...old])

            // Return a context object with the snapshotted value
            return { previousTodos }
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newCafe, context) => {
            queryClient.setQueryData('cafes', context.previousTodos)
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries('cafes')
        },
    })

    return (
        <div className='px-2 py-2 flex flex-col items-start'>
            <h3 className='font-bold text-lg'>{cafe.name}</h3>

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
                    onClick={() => setDialogOpen(true)}>Rate
                </button>
            </div>
            {dialogOpen && <Modal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cafe={newCafe} addCafeMutation={addCafeMutationFromList} />}
        </div>
    )
}

export default PlaceListItem
