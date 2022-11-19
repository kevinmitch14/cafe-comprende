import { prisma } from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const testing = await prisma.cafe.upsert({
    where: {
      googlePlaceID: req.body.googlePlaceID,
    },
    create: {
      googlePlaceID: req.body.googlePlaceID,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      name: req.body.name,
    },
    update: {
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
  res.json(testing);
}
