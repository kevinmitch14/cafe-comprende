import Image from "next/image";
import React from "react";
import Script from "next/script";
import FeaturedCafe from "./FeaturedCafe";


const Dashboard = () => {
    return (
        <div className="relative flex flex-col items-center justify-between gap-y-2 border-b bg-gray-50 py-4 text-center">
            <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initService&libraries=places`} />
            <Image
                src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
                alt="logo"
                height={120}
                width={120}
            />
            <h1 className="text-3xl font-bold text-gray-700">Cafe Comprende</h1>
            <p className="text-xl font-light text-gray-500">Pick a cafe, rate it!</p>
            <FeaturedCafe />
        </div>
    );
};

export default Dashboard;
