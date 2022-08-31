import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const allCafes = await prisma.cafe.findMany()
    res.json(allCafes)
}