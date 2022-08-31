import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const Cafe = await prisma.cafe.create({
        data:
            req.body
    })
    res.json(Cafe)
}   