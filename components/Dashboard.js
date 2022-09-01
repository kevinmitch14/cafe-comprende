import Image from "next/future/image";
import React from "react";
import Script from "next/script";
import FeaturedCafe from "./FeaturedCafe";
import PlaceList from "./PlaceList";


const Dashboard = () => {
    const css = { maxWidth: '100%', height: 'auto' }

    return (
        <div className="sticky top-0 w-full flex flex-col justify-between gap-y-2 bg-gray-50 pt-4 text-center">
            <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initService&libraries=places`} />
            <div className="flex justify-center md:flex-col items-center">
                <Image
                    src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
                    alt="logo"
                    style={css}
                    width={30}
                    height={32}
                />
                <h1 className="text-xl md:text-3xl font-bold text-gray-700">Café Comprende</h1>
                <p className="hidden md:block text-xl font-light text-gray-500">Pick a cafe, rate it!</p>
            </div>
            <div className="flex relative px-4 md:px-0 flex-col justify-center">
                <FeaturedCafe />
                <PlaceList />
            </div>
        </div>
    );
};

export default Dashboard;
