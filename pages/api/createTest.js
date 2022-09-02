import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const Review = await prisma.cafe.create({
        data:
            req.body
    })
    res.json(Review)
}   