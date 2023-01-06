import { prisma } from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newReview = await prisma.cafe.upsert({
    where: {
      place_id: req.body.place_id,
    },
    create: {
      place_id: req.body.place_id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      name: req.body.name,
      reviews: {
        create: {
          rating: req.body.rating,
          Account: {
            connect: {
              id: 1,
            },
          },
        },
      },
    },
    update: {
      updatedAt: new Date(),
      reviews: {
        create: {
          rating: req.body.rating,
          Account: {
            connect: {
              id: 1,
            },
          },
        },
      },
    },
  });
  res.json(newReview);
}
