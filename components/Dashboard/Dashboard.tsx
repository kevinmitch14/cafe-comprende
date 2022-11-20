import Image from "next/image";
import useWindowSize from "../../hooks/useWindowSize";
import { FeaturedCafe, CafeList } from "../../components";
import { MOBILE_BREAKPOINT } from "../../utils/constants";

export const Dashboard = () => {
  const css = { maxWidth: "100%", height: "auto" };
  const { width } = useWindowSize();
  return (
    <div className="flex w-full flex-col gap-y-2 bg-gray-50 pb-4 pt-4 text-center md:w-2/5 md:overflow-y-auto">
      <div className="flex items-center justify-center md:flex-col">
        <Image
          src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
          alt="logo"
          style={css}
          width={40}
          height={44}
          priority={true}
        />
        <h1 className="text-xl font-extrabold uppercase text-gray-700 md:text-3xl">
          Café Comprende
        </h1>
        <p className="text-md mt-2 hidden font-bold uppercase tracking-tighter text-gray-500 md:block">
          Find a cafe to suit your needs.
        </p>
      </div>
      <div className="relative flex flex-col justify-center px-4 md:px-0">
        <FeaturedCafe />
        {width > MOBILE_BREAKPOINT && <CafeList />}
      </div>
    </div>
  );
};
