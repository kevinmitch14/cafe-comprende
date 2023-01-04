import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;
    console.log(body);
    const result = await prisma.account.update({
        where: {
            id: 1
        },
        data: {
            bookmarks: {
                connect: {
                    place_id: body.place_id
                }
            }
        }

    })
    res.json(result)
}