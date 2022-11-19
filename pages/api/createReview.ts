import { prisma } from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { latitude, longitude, name, googlePlaceID } = body;

  await prisma.account.update({
    // TODO Match to user ID in future
    where: { id: 1 },
    data: {
      reviews: {
        create: {
          rating: body.rating,
          Cafe: {
            connectOrCreate: {
              where: {
                googlePlaceID: googlePlaceID,
              },
              create: {
                googlePlaceID: googlePlaceID,
                latitude: latitude,
                longitude: longitude,
                name: name,
              },
            },
          },
        },
      },
    },
  });
  const accounts = await prisma.account.findMany({
    include: {
      reviews: true,
    },
  });
  res.status(200).json(accounts);
}
