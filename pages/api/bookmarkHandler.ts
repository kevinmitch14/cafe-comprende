import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, query } = req;

  const { action } = query as {
    action: string;
  };

  if (!action || typeof action !== "string") {
    return res.status(400).json({
    })
  }
  if (action === "add") {
    const result = await prisma.user.update({
      where: {
        email: "kevinmitch14@gmail.com",
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
    res.status(200).json(result);
  }

  if (action === "remove") {
    const result = await prisma.user.update({
      where: {
        email: "kevinmitch14@gmail.com",
      },
      data: {
        bookmarks: {
          disconnect: {
            place_id: body.place_id,
          },
        },
      },
    });
    res.status(200).json(result);
  }
}
