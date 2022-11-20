import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

// TODO add zod here
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allCafes = await prisma.cafe.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      reviews: true,
    },
  });
  res.json(allCafes);
}
