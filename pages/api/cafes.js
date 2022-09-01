import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const allCafes = await prisma.cafe.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    })
    res.json(allCafes)

}