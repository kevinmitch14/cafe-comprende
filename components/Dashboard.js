import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import { signIn, signOut, useSession } from "next-auth/react";

import { BeakerIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/outline'

import Account from "./Account";


const Dashboard = ({ onSelectPlace, triggerGeoLocation }) => {
    const [review, setReview] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-between gap-y-2 border-b bg-gray-50 py-4 text-center">
            <Link href="/">
                <Image
                    src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
                    alt="logo"
                    height={120}
                    width={120}
                />
            </Link>
            <Account />
            {/* <button className="bg-emerald-100 p-2 absolute top-0 right-0" onClick={() => signIn('google')}>Login with Google</button> */}
            {/* <button className="bg-emerald-100 p-2" onClick={() => signOut()}>Logout</button> */}
            <h1 className="text-3xl font-bold text-gray-700">Cafe Comprende</h1>
            <p className="text-xl font-light text-gray-500">Pick a cafe, rate it!</p>
            <div className="flex gap-x-4">
                {/* <button
                    onClick={() => triggerGeoLocation()}
                    className="my-1 rounded border border-gray-300  py-2 px-4 text-sm font-bold text-emerald-700 hover:bg-emerald-100"
                >
                    Nearby Cafes
                </button> */}
                {!review && (
                    <button
                        onClick={() => setReview(!review)}
                        className="my-1 rounded border border-gray-300  py-2 px-4 text-sm font-bold text-emerald-700 hover:bg-emerald-100"
                    >
                        Add Review +
                    </button>
                )}
            </div>
            {review && <Autocomplete onSelectPlace={onSelectPlace} setReview={setReview} />}
        </div>
    );
};

export default Dashboard;
