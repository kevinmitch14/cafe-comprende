import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    console.log(req.body)
    await prisma.cafe.create({
        data: req.body
    })
    const Review = await prisma.cafe.findMany({})
    res.json(Review)
}   