import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CafeDTO, Review } from "../../components/Cafe/Cafe.types";
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
import { useRouter } from "next/router";
import { useProfile } from "../../hooks/useProfile";
import { MOCK_USER_DATA } from "../../utils/constants";

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
  const router = useRouter()
  const {id:email} = router.query as {
    id: string
  }
  const css = { maxWidth: "100%", height: "auto" };
  const { data: profileData, isLoading, isError, error } = useProfile({
    email: email,
    enabled: true
  });
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error {error.message}</p>

  let reviews, bookmarks;
  if (email === "jsmith@example.com") {
    reviews = MOCK_USER_DATA.userAccount.reviews
    bookmarks = MOCK_USER_DATA.userAccount.bookmarks
  } else {
  reviews = profileData.reviews
  bookmarks = profileData.bookmarks
  }

  const hasReviews = reviews.length > 0;
  const hasBookmarks = bookmarks.length > 0;
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
  if (!session || session.user?.email !== id) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: {
      userSession: session,
    },
  };
};
