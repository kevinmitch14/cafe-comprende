import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { CafeDTO, Review } from "../../components/Cafe/Cafe.types";
import { prisma } from "../../utils/prisma";

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
  const router = useRouter();
  console.log(props);
  const { id } = router.query as {
    id: string;
  };
  const { reviews, bookmarks } = props;

  return (
    <div className="flex">
      <div>
        <h2 className="font-bold">Reviews</h2>
        {reviews.map((review: Review) => {
          return (
            <div key={review.id}>
              <p>Place ID: {review.place_id}</p>
              <p>Rating: {review.rating}</p>
            </div>
          );
        })}
      </div>
      <hr />
      <div>
        <h2 className="font-bold">Bookmarks</h2>
        {bookmarks.map((bookmark: Bookmark) => {
          return (
            <div key={bookmark.place_id}>
              <p>Place ID: {bookmark.place_id}</p>
              <p>Name: {bookmark.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Profile> = async (
  ctx: GetServerSidePropsContext
) => {
  const { id } = ctx.params as {
    id: string;
  };
  if (id === "jsmith@example.com") {
    return {
      props: {
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
    };
  }
  const account = await prisma.user.findFirst({
    where: {
      email: {
        equals: id,
      },
    },
    include: {
      reviews: true,
      bookmarks: true,
    },
  });
  return {
    props: JSON.parse(JSON.stringify(account)),
  };
};
