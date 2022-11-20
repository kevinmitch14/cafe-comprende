import Head from "next/head";
import { Dashboard, MapComponent, MobileList } from "../components";
import useWindowSize from "../hooks/useWindowSize";
import { MOBILE_BREAKPOINT } from "../utils/constants";

export default function Home() {
  const { height, width } = useWindowSize();
  return (
    <main
      style={{ height: `${height}px` }}
      className="flex flex-col md:flex-row"
    >
      <Head>
        {process.env.NODE_ENV == "production" ? (
          <title>Cafe Comprende</title>
        ) : (
          <title>LOCALHOST CAFE</title>
        )}
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
        />
      </Head>
      <Dashboard />
      <MapComponent />
      {width < MOBILE_BREAKPOINT && <MobileList />}
    </main>
  );
}
