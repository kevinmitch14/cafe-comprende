import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Modal from './Modal'
import axios from "axios";

const PlaceListItem = ({ cafe }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const queryClient = useQueryClient()
    const originalMutation = (newCafe) => {
        return axios.post('/api/createTest', newCafe)
    }

    const newCafe = {
        name: cafe.name,
        latitude: cafe.latitude,
        longitude: cafe.longitude,
        googlePlaceID: cafe.googlePlaceID,
    }

    const cafeRating =
        cafe.reviews?.length > 0 &&
        cafe.reviews.reduce((prev, current) => prev + current.rating, 0)
    const cafeNumberOfReviews = cafe.reviews?.length
    const averageRating = cafeRating / cafeNumberOfReviews

    const addCafeMutationFromList = useMutation(originalMutation, {
        // When mutate is called:
        onMutate: async newCafe => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries('cafes')

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData('cafes')
            // Optimistically update to the new value
            // queryClient.setQueryData('cafes', old => [newCafe, ...old])

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
            <p>Rating: {[1, 2, 3, 4, 5].includes(averageRating) ? averageRating : averageRating.toFixed(1)}/5<span className='pl-1 text-sm text-gray-500'>({cafe.reviews?.length} {cafe.reviews?.length > 1 ? 'reviews' : 'review'})</span></p>
            <div className='flex gap-x-2'>
                <button
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-1.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setDialogOpen(true)}>Rate
                </button>
            </div>
            {dialogOpen && <Modal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cafe={newCafe} addCafeMutation={addCafeMutationFromList} />}
        </div>
    )
}

export default PlaceListItem
