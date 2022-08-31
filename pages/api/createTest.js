import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const Review = await prisma.cafe.create({
        data:
            req.body
    })
    res.json(Review)
}   