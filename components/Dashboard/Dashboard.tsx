import Image from "next/image";
import useWindowSize from "../../hooks/useWindowSize";
import { FeaturedCafe, CafeList } from "../../components";
import { MOBILE_BREAKPOINT } from "../../utils/constants";
import { useSession, signIn, signOut } from "next-auth/react";

export const Dashboard = () => {
  const css = { maxWidth: "100%", height: "auto" };
  const { width } = useWindowSize();
  const { data: session } = useSession();
  return (
    <div className="flex w-full flex-col gap-y-2 bg-gray-50 pb-4 pt-4 text-center md:w-2/5 md:overflow-y-auto">
      {session ? (
        <>
          <div className="flex justify-between px-2">
            <div className="flex items-center gap-x-2">
              <Image
                className="rounded-[9999px]"
                alt={session.user?.email || ""}
                src={session.user?.image || ""}
                width={32}
                height={32}
              />
            </div>
            <button
              className="inline-flex self-end justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <button
          className="mr-2 rounded-md border self-end border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0"
          onClick={() => signIn("google")}
        >
          Sign In
        </button>
      )}
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
