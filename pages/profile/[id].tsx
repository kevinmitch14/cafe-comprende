import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CafeDTO, Review } from "../../components/Cafe/Cafe.types";
import { prisma } from "../../utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { notifySignedOut, notifyError } from "../../components/shared/Toasts";

export type Profile = {
  id: string;
  name: string;
  email: string;
  image: string;
  reviews: Review[];
  bookmarks: Bookmark[];
};

export type Bookmark = Omit<CafeDTO, "rating"> & { updatedAt: Date };

export default function Profile(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { reviews, bookmarks } = props.userAccount;
  const hasReviews = reviews.length > 0;
  const hasBookmarks = bookmarks.length > 0;
  const css = { maxWidth: "100%", height: "auto" };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
            alt="logo"
            style={css}
            width={38}
            height={42}
            priority={true}
          />
        </Link>
        {props.userSession && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex">
                <Image
                  className="rounded-[9999px] mx-auto my-auto"
                  alt={props.userSession.user?.email || ""}
                  src={props.userSession.user?.image || ""}
                  width={32}
                  height={32}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/profile/${props.userSession.user?.email}`}>
                  <DropdownMenuItem>
                    <UserIcon className="h-4 w-4 mr-2 stroke-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() =>
                    signOut({ redirect: false })
                      .then(() => notifySignedOut())
                      .catch((error: Error) => notifyError(error.message))
                  }
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 stroke-2" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="flex">
        <div>
          <h2 className="font-bold">Reviews</h2>
          {hasReviews ? (
            reviews.map((review: Review) => {
              return (
                <div key={review.id}>
                  <p>Place ID: {review.place_id}</p>
                  <p>Rating: {review.rating}</p>
                </div>
              );
            })
          ) : (
            <p>No reviews yet!</p>
          )}
        </div>
        <hr />
        <div>
          <h2 className="font-bold">Bookmarks</h2>
          {hasBookmarks ? (
            bookmarks?.map((bookmark: Bookmark) => {
              return (
                <div key={bookmark.place_id}>
                  <p>Place ID: {bookmark.place_id}</p>
                  <p>Name: {bookmark.name}</p>
                </div>
              );
            })
          ) : (
            <p>No bookmarks yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const session = await getServerSession(context.req, context.res, authOptions);
  const { id } = context.params as {
    id: string;
  };
  // redirect to home if there is no session
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  if (id === "jsmith@example.com") {
    return {
      props: {
        userAccount: {
          reviews: [
            {
              id: 6,
              email: "kevinmitch14@gmail.com",
              place_id: "ChIJ-7S4cNcmGJYR5Unb2U_q6XU",
              rating: 4,
            },
          ],
          bookmarks: [
            {
              place_id: "ChIJ-7S4cNcmGJYR5Unb2U_q6XU",
              latitude: "-41.31782359999999",
              longitude: "-72.9820656",
              name: "Cassis Cafe",
              updatedAt: "2023-02-04T15:31:09.449Z",
            },
            {
              place_id: "ChIJ98Er0TGRW0gReN0fnKQRzv0",
              latitude: "53.2906203",
              longitude: "-8.986531400000001",
              name: "Grind Briarhill",
              updatedAt: "2023-02-05T22:50:49.148Z",
            },
          ],
        },
      },
    };
  }
  const account = await prisma.user.findFirst({
    where: {
      email: {
        equals: session.user?.email,
      },
    },
    select: {
      reviews: true,
      bookmarks: {
        select: {
          place_id: true,
          name: true,
        },
      },
    },
  });
  return {
    props: {
      userAccount: account,
      userSession: session,
    },
  };
};
