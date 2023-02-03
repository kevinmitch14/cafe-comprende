import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  console.log(body);
  const result = await prisma.user.update({
    where: {
      email: 'kevinmitch14@gmail.com',
    },
    data: {
      bookmarks: {
        disconnect: {
          place_id: body.place_id,
        },
      },
    },
  });
  res.json(result);
}
