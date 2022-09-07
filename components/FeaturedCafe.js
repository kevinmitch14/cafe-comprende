/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import Modal from './Modal'
import dynamic from 'next/dynamic';
import Image from 'next/future/image';

const ToastComp = dynamic(() => import('../components/Toast'), {
    ssr: false
})

const FeaturedCafe = () => {
    const [inputValue, setInputValue] = useState("")
    const [featuredCafe, setFeaturedCafe] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [open, setOpen] = useState(false)


    function initService() {
        const options = { types: ["cafe"] }
        const input = document.getElementById("pac-input");
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', () => {
            setFeaturedCafe(autocomplete.getPlace())
            setInputValue("")
        });
    }

    const queryClient = useQueryClient()
    const originalMutation = (newCafe) => {
        return axios.post('/api/createReview', newCafe)
    }

    const addCafeMutation = useMutation(originalMutation, {
        onMutate: async newCafe => {
            await queryClient.cancelQueries('cafes')
            setFeaturedCafe(null)

            const previousTodos = queryClient.getQueryData('cafes')
            queryClient.setQueryData('cafes', old => [newCafe, ...old])

            return { previousTodos }
        },
        onError: (err, newCafe, context) => {
            queryClient.setQueryData('cafes', context.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries('cafes')
        },
    })

    const newCafe = {
        name: featuredCafe?.name,
        latitude: featuredCafe?.geometry.location.lat(),
        longitude: featuredCafe?.geometry.location.lng(),
        googlePlaceID: featuredCafe?.place_id,
    }

    if (typeof window !== 'undefined') {
        window.initService = initService;
    }

    return (
        <div className='px-2 md:px-4'>
            <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_GOOGLE_API_LOCAL : process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initService&libraries=places`} />
            <div className="relative md:self-center mt-1 w-full rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                </div>
                <input
                    id="pac-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-1 py-2"
                    type="text"
                    placeholder="Enter a location"
                />
            </div>

            {featuredCafe && (
                <div className="relative mt-4 overflow-hidden flex h-auto rounded-md border border-gray-200 hover:cursor-pointer hover:bg-gray-50">
                    <div className='absolute top-0 hover:bg-gray-100 right-0 p-1 border-b border-l rounded-bl-md' onClick={() => setFeaturedCafe(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-900">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    {featuredCafe.photos && (
                        <div className='w-2/5'>
                            <img
                                src={featuredCafe.photos[0].getUrl({ maxWidth: featuredCafe.photos[0].width, maxHeight: featuredCafe.photos[0].height })}
                                alt={"image"}
                                className="rounded-l-md h-full w-full aspect-square object-cover"
                            />
                        </div>
                    )}
                    <div className="w-3/5 p-2 px-4 flex flex-col space-y-1 items-start text-left justify-center">
                        <div>
                            <p className='font-bold'>{featuredCafe.name}</p>
                            <p className="text-xs text-gray-500">No reviews yet!</p>
                        </div>
                        <button onClick={() => setDialogOpen(true)} className="text-sm md:text-base underline">Rate this cafe</button>
                    </div>
                </div>
            )}
            {dialogOpen && <Modal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cafe={newCafe} addCafeMutation={addCafeMutation} setOpen={setOpen} />}
            {open && <ToastComp open={open} setOpen={setOpen} cafe={newCafe} />}
        </div>
    )
}

export default FeaturedCafe