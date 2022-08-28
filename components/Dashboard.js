import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import { signIn, signOut, useSession } from "next-auth/react";
import { BeakerIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/outline'
import Account from "./Account";
import Script from "next/script";
import FeaturedCafe from "./FeaturedCafe";


const Dashboard = ({ onSelectPlace, triggerGeoLocation }) => {
    return (
        <div className="relative flex flex-col items-center justify-between gap-y-2 border-b bg-gray-50 py-4 text-center">
            <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initService&libraries=places`} />
            <Link href="/">
                <Image
                    src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
                    alt="logo"
                    height={120}
                    width={120}
                />
            </Link>
            <Account />
            <h1 className="text-3xl font-bold text-gray-700">Cafe Comprende</h1>
            <p className="text-xl font-light text-gray-500">Pick a cafe, rate it!</p>
            <FeaturedCafe />
        </div>
    );
};

export default Dashboard;
