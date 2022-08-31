import Head from "next/head";
import MapComponent from "../components/MapComponent";
import { useRef, useCallback, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useMutation, useQuery } from "react-query";
import PlaceList from "../components/PlaceList";



export default function Home() {
  return (
    <div>
      <Head>
        <title>Cafe Comprende</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
        />
      </Head>
      <main className="flex">
        <MapComponent />
        <div className="h-[100vh] w-[30vw] overflow-scroll">
          <Dashboard />
          <PlaceList />
        </div>
      </main>
    </div>
  );
}
