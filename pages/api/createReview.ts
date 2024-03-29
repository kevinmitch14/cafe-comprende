import { prisma } from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { latitude, longitude, name, place_id } = body;

  await prisma.user.update({
    // TODO Match to user ID in future
    where: { email: 'kevinmitch14@gmail.com' },
    data: {
      reviews: {
        create: {
          rating: body.rating,
          cafe: {
            connectOrCreate: {
              where: {
                place_id: place_id,
              },
              create: {
                place_id: place_id,
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
  const accounts = await prisma.user.findMany({
    include: {
      reviews: true,
    },
  });
  res.status(200).json(accounts);
}
