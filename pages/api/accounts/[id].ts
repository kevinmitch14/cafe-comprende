import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({
    })
  }
  const account = await prisma.user.findFirst({
    where: {
      email: {
        equals: id
      }
    },
    include: {
      reviews: true,
      bookmarks: true
    }
  })
  res.status(200).json(account)
}
