import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  console.log(body);
  const result = await prisma.account.update({
    where: {
      id: 1,
    },
    data: {
      bookmarks: {
        connectOrCreate: {
          where: {
            place_id: body.place_id,
          },
          create: {
            place_id: req.body.place_id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
          },
        },
      },
    },
  });
  res.json(result);
}
