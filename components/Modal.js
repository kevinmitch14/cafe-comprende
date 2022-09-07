import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OfficeBuildingIcon } from '@heroicons/react/solid'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const Modal = ({ dialogOpen, cafe, setDialogOpen, setOpen, setFeaturedCafe }) => {
    const cancelButtonRef = useRef(null)
    const [rating, setRating] = useState(null)
    const [loading, setLoading] = useState(false)

    const queryClient = useQueryClient()
    const originalMutation = (newCafe) => {
        return axios.post('/api/createReview', newCafe)
    }

    const addCafeMutation = useMutation(originalMutation, {
        onMutate: async newCafe => {
            await queryClient.cancelQueries('cafes')
            // setFeaturedCafe(null)
            setLoading(true)
            const previousTodos = queryClient.getQueryData('cafes')
            // queryClient.setQueryData('cafes', old => [newCafe, ...old])
            // return { previousTodos }
        },
        onError: (err, newCafe, context) => {
            queryClient.setQueryData('cafes', context.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries('cafes')
            setLoading(false)
            setDialogOpen(false)
            setOpen(true)
            setFeaturedCafe(null)
        },
    })

    return (
        <Transition.Root show={dialogOpen} as={Fragment}>
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
                    <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
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
                                                {cafe?.name}
                                            </Dialog.Title>
                                            <div className="mt-2 ">
                                                <p className="text-sm text-gray-500">
                                                    Blah Blah Blah, rate this cafe.
                                                </p>
                                                <div className="flex justify-center gap-x-1 text-sm">
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
                                        className="w-full min-w-[80px] inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            addCafeMutation.mutate({ ...cafe, rating })
                                            // setDialogOpen(false)
                                            // setOpen(true)
                                        }}
                                    >
                                        {loading ?
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            :
                                            'Submit'}
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
        </Transition.Root >
    )
}

export default Modal