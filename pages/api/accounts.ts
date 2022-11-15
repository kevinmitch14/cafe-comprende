import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accounts = await prisma.account.findMany({
    include: {
      reviews: true,
    },
  });
  res.json(accounts);
}
