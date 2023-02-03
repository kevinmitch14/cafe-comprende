import Image from "next/image";
import useWindowSize from "../../hooks/useWindowSize";
import { FeaturedCafe, CafeList } from "../../components";
import { MOBILE_BREAKPOINT } from "../../utils/constants";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export const Dashboard = () => {
  const css = { maxWidth: "100%", height: "auto" };
  const { width } = useWindowSize();
  const { data: session } = useSession();
  return (
    <div className="flex w-full flex-col gap-y-2 bg-gray-50 px-4 pb-4 pt-4 text-center md:w-2/5 md:overflow-y-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
            alt="logo"
            style={css}
            width={38}
            height={42}
            priority={true}
          />
          <h1 className="hidden md:block text-2xl font-extrabold uppercase text-gray-800 md:text-base">
            Café Comprende
          </h1>
        </div>
        {session ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex">
                <Image
                  className="rounded-[9999px] mx-auto my-auto"
                  alt={session.user?.email || ""}
                  src={session.user?.image || ""}
                  width={32}
                  height={32}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => signOut()}>
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 stroke-2" />
                  <span>Log Out</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <UserIcon className="h-4 w-4 mr-2 stroke-2" />
                  <Link href={"/profile/${id}"}>Profile</Link>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <button
            className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )}
      </div>
      {/* <div className="flex items-center justify-center md:flex-col px-4"> */}
      <p className="text-sm md:text-base font-semibold text-left mt-2 hidden tracking-tighter text-gray-500 md:block">
        Finding your next cafe to work from has never been easier.
      </p>
      {/* </div> */}
      <div className="relative flex flex-col justify-center md:px-0">
        <FeaturedCafe />
        {width > MOBILE_BREAKPOINT && <CafeList />}
      </div>
    </div>
  );
};
