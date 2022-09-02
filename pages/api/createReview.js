import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const Cafe = await prisma.cafe.create({
        data:
            req.body
    })
    res.json(Cafe)
}   