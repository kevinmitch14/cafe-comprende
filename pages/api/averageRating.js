import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    const result = await prisma.review.aggregate({
        where: {
            placeID: "ChIJVYf8RdO1aZYRSUttJccyIVU"
        },
        _avg: {
            rating: true
        }
    })
    res.json(result)
}