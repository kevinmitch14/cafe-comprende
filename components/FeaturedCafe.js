import Image from 'next/image';
import Script from 'next/script';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OfficeBuildingIcon, SearchCircleIcon } from '@heroicons/react/solid'
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

    const mutation = useMutation(originalMutation, {
        // When mutate is called:
        onMutate: async newCafe => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries('cafes')
            setFeaturedCafe(null)

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData('cafes')
            console.log(previousTodos)
            // Optimistically update to the new value
            queryClient.setQueryData('cafes', old => [...old, newCafe])

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
                <div className="m-4 flex w-[80%] rounded-md border border-gray-200 pr-2 hover:cursor-pointer hover:bg-gray-50">
                    {featuredCafe.photos && (
                        <Image
                            src={featuredCafe.photos[0].getUrl({ maxWidth: featuredCafe.photos[0].width, maxHeight: featuredCafe.photos[0].height })}
                            alt={"image"}
                            height={100}
                            width={150}
                        />
                    )}
                    <div className="p-4 flex flex-col gap-y-2">
                        <p>{featuredCafe.name}</p>
                        <p onClick={() => setDialogOpen(true)}>Rate this cafe</p>
                    </div>
                </div>

            )}
            <Modal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cafe={featuredCafe} />
            {/* <Transition.Root show={dialogOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setDialogOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <OfficeBuildingIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                    {featuredCafe?.name}
                                                </Dialog.Title>
                                                <div className="mt-2 ">
                                                    <p className="text-sm text-gray-500">
                                                        Blah Blah Blah, rate this cafe.
                                                    </p>
                                                    <div className="flex justify-centers gap-x-1 text-sm">
                                                        <button className='p-1 hover:bg-gray-100 rounded-lg px-4 border transition-[focus] duration-500 focus:bg-emerald-600 bold focus:text-white' onClick={(e) => setRating(1)} value={1}>1</button>
                                                        <button className='p-1 hover:bg-gray-100 rounded-lg px-4 border transition-[focus] duration-500 focus:bg-emerald-600 bold focus:text-white' onClick={(e) => setRating(2)} value={2}>2</button>
                                                        <button className='p-1 hover:bg-gray-100 rounded-lg px-4 border transition-[focus] duration-500 focus:bg-emerald-600 bold focus:text-white' onClick={(e) => setRating(3)} value={3}>3</button>
                                                        <button className='p-1 hover:bg-gray-100 rounded-lg px-4 border transition-[focus] duration-500 focus:bg-emerald-600 bold focus:text-white' onClick={(e) => setRating(4)} value={4}>4</button>
                                                        <button className='p-1 hover:bg-gray-100 rounded-lg px-4 border transition-[focus] duration-500 focus:bg-emerald-600 bold focus:text-white' onClick={(e) => setRating(5)} value={5}>5</button>
                                                    </div>
                                                    <label htmlFor="comments" className='text-sm text-gray-500'>Additional comments</label>
                                                    <textarea id="comments" name='comments' className='text-sm w-full bg-gray-100'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                mutation.mutate(newCafe)
                                                setDialogOpen(false)
                                                setInputValue("")
                                            }}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setDialogOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root> */}
        </>
    )
}

export default FeaturedCafe