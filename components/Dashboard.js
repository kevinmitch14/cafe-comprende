import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Button, Modal, Popover, Typography } from "@mui/material";

const Dashboard = ({ onSelectPlace, triggerGeoLocation }) => {
    const [review, setReview] = useState(false);
    const { data: session } = useSession()

    return (
        <div className="flex flex-col items-center justify-between gap-y-2 border-b bg-gray-50 py-4 text-center">
            <Link href="/">
                <Image
                    src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
                    alt="logo"
                    height={120}
                    width={120}
                />
            </Link>
            <button className="bg-emerald-100 p-2" onClick={() => signIn('github')}>Login</button>
            <button className="bg-emerald-100 p-2" onClick={() => signOut()}>Logout</button>
            <h1 className="text-3xl font-bold text-gray-700">Cafe Comprende</h1>
            <p className="text-xl font-light text-gray-500">Pick a cafe, rate it!</p>
            <div className="flex gap-x-4">
                <button
                    onClick={() => triggerGeoLocation()}
                    className="my-1 rounded border border-gray-300  py-2 px-4 text-sm font-bold text-emerald-700 hover:bg-emerald-200"
                >
                    Nearby Cafes
                </button>
                {!review && (
                    <button
                        onClick={() => setReview(!review)}
                        className="my-1 rounded border border-gray-300  py-2 px-4 text-sm font-bold text-emerald-700 hover:bg-emerald-200"
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
