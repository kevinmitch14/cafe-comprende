import { prisma } from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newReview = await prisma.cafe.upsert({
    where: {
      place_id: req.body.cafe.place_id,
    },
    create: {
      place_id: req.body.cafe.place_id,
      latitude: req.body.cafe.latitude,
      longitude: req.body.cafe.longitude,
      name: req.body.cafe.name,
      reviews: {
        create: {
          rating: req.body.cafe.rating,
          account: {
            connect: {
              email: req.body.email,
            },
          },
        },
      },
    },
    update: {
      updatedAt: new Date(),
      reviews: {
        create: {
          rating: req.body.cafe.rating,
          account: {
            connect: {
              email: "kevinmitch14@gmail.com",
            },
          },
        },
      },
    },
  });
  res.status(200).json(newReview);
}
