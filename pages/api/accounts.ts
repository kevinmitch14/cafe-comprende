import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accounts = await prisma.account.findFirst({
    where: {
      id: 1
    },
    include: {
      reviews: true,
      bookmarks: true
    },
  });
  res.json(accounts);
}
