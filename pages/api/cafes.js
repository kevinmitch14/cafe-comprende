import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const allCafes = await prisma.cafe.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            reviews: true,
        }
    })
    res.json(allCafes)

}