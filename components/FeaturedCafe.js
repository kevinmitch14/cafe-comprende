import Image from 'next/image';
import Script from 'next/script';
import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import Modal from './Modal'


const FeaturedCafe = () => {
    const [rating, setRating] = useState(null)
    const [inputValue, setInputValue] = useState("")
    const [featuredCafe, setFeaturedCafe] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const cancelButtonRef = useRef(null)


    function initService() {
        const options = { types: ["cafe"] }
        const input = document.getElementById("pac-input");
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', () => {
            setFeaturedCafe(autocomplete.getPlace())
        });
    }

    const queryClient = useQueryClient()
    const originalMutation = (newCafe) => {
        return axios.post('/api/createReview', newCafe)
    }

    // const { isLoading, error, data } = useQuery(['cafes'], testingFetcher)
    // console.log(isLoading, error, data)

    const addCafeMutation = useMutation(originalMutation, {
        // When mutate is called:
        onMutate: async newCafe => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries('cafes')
            setFeaturedCafe(null)

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData('cafes')
            console.log(previousTodos)
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

    const newCafe = {
        name: featuredCafe?.name,
        rating: rating,
        latitude: featuredCafe?.geometry.location.lat().toFixed(2),
        longitude: featuredCafe?.geometry.location.lng().toFixed(2),
    }

    if (typeof window !== 'undefined') {
        window.initService = initService;
    }

    return (
        <>
            <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initService&libraries=places`} />

            {/* <input
                id="pac-input"
                value={featuredCafe ? featuredCafe.name : inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-[80%] relative rounded-md border border-gray-300 p-1 py-2"
                type="text" placeholder="Enter a location"
            /> */}
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                </div>
                <input
                    id="pac-input"
                    value={featuredCafe ? featuredCafe.name : inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-1 py-2"
                    type="text"
                    placeholder="Enter a location"
                />
            </div>


            {featuredCafe && (
                <div className="mt-4 flex rounded-md border border-gray-200 pr-2 hover:cursor-pointer hover:bg-gray-50">
                    {featuredCafe.photos && (
                        <Image
                            src={featuredCafe.photos[0].getUrl({ maxWidth: featuredCafe.photos[0].width, maxHeight: featuredCafe.photos[0].height })}
                            alt={"image"}
                            height={100}
                            width={150}
                            className="rounded-l-md"
                        />
                    )}
                    <div className="p-4 items-start flex flex-col gap-y-2">
                        <p className='font-bold'>{featuredCafe.name}</p>
                        <button onClick={() => setDialogOpen(true)} className="underline">Rate this cafe</button>
                    </div>
                </div>

            )}
            {dialogOpen && <Modal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cafe={newCafe} addCafeMutation={addCafeMutation} />}
        </>
    )
}

export default FeaturedCafe