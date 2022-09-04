import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    const accounts = await prisma.account.findMany({
        include: {
            reviews: true
        }
    })

    res.json(accounts)
}