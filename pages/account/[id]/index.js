/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import db from '../../../firebase'
import AccountListItem from '../../../components/AccountListItem'
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import Account from '../../../components/Account';
import { useSession } from 'next-auth/react';
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';


const initialViewState = {
    latitude: 52.7751,
    longitude: 12.4193,
    zoom: 3,
    bearing: 0,
    pitch: 0,
};

const index = () => {
    const [account, setAccount] = useState(null)
    const [tab, setTab] = useState('reviews')
    const { data: session } = useSession()
    const [pins, setPins] = useState([])
    const mapRef = useRef();
    const geoRef = useRef();

    const mapPins = pins.map(({ data }) => (
        <Marker
            key={data.place_id}
            longitude={data.geometry.location.lng}
            latitude={data.geometry.location.lat}
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(data);
                setActiveDiv(data.place_id);
            }}
        >
        </Marker>
    ))


    useEffect(() => {
        console.log(100)
        account?.reviews.forEach(async ({ place }) => {
            const cafeRef = doc(db, 'cafes', place)
            const cafeSnap = await getDoc(cafeRef)
            console.log(cafeSnap.data())
            setPins(prev => [...prev, cafeSnap.data()])
        })
    }, [account?.reviews])

    useEffect(() => {
        const docRef = doc(db, "accounts", "kevinmitch14@gmail.com")
        const handler = async () => {
            const docSnap = await getDoc(docRef)
            setAccount(docSnap.data())
        }
        handler()
    }, [])

    // convert timestamp to date
    const convertTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000)
        const year = date.getFullYear()
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const day = ("0" + date.getDate()).slice(-2)
        const hours = ("0" + date.getHours()).slice(-2)
        const minutes = ("0" + date.getMinutes()).slice(-2)
        const seconds = ("0" + date.getSeconds()).slice(-2)
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }


    if (account && session) {
        return (
            <div className='flex'>
                <div className='w-[40%] relative py-4'>
                    <div className='items-center'>
                        <Account />
                        <Link href='/'>
                            <ChevronDoubleLeftIcon className="h-7 w-7 border border-gray-300 text-gray-800 hover:bg-gray-100 hover:cursor-pointer rounded-lg p-1 absolute top-4 left-4" />
                        </Link>
                        <p className='text-center font-medium text-lg'>{session.user.email}</p>

                    </div>
                    <div className='flex text-center py-4 pt-6 divide-x border-b border-gray-200'>
                        <button className='flex-1' onClick={() => setTab('reviews')}><p>My Reviews</p></button>
                        <button className='flex-1' onClick={() => setTab('saved')}><p>Saved Cafes</p></button>
                    </div>
                    <div className='px-6'>
                        {tab === 'reviews' ? account.reviews.map((review, index) => {
                            return (
                                <div key={index} className='bg-gray-100 my-2 py-4 px-2'>
                                    <AccountListItem place={review.place} />
                                    <p>Date: {convertTimestamp(review.time)}</p>
                                    <p>Rating: {review.rating}</p>
                                </div>

                            )
                        }) : account.saved.map((place, index) => {
                            return (
                                <div key={index} className='bg-gray-100 my-2 py-4 px-2'>
                                    <AccountListItem place={place} />
                                </div>
                            )

                        })}
                    </div>
                </div>
                <Map
                    ref={mapRef}
                    style={{ width: "70vw", height: "100vh" }}
                    initialViewState={initialViewState}
                    mapStyle="mapbox://styles/mapbox/streets-v8"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                >
                    <GeolocateControl
                        ref={geoRef}
                        position="top-left"
                        fitBoundsOptions={{ maxZoom: 12 }}
                        onGeolocate={(e) => setUserLocation(e.coords)}
                    />
                    <NavigationControl position="top-left" />
                    {mapPins}
                </Map>
            </div >
        )
    }
    return (
        <div>
            <p>You must be signed in to view account details...</p>
        </div>
    )
}

export default index