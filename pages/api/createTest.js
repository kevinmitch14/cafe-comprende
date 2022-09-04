import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const testing = await prisma.cafe.upsert({
        where: {
            googlePlaceID: req.body.googlePlaceID
        },
        create: {
            googlePlaceID: req.body.googlePlaceID,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
        },
        update: {
            reviews: {
                create: {
                    rating: req.body.rating,
                    Account: {
                        connect: {
                            id: 1
                        }
                    }
                }
            }
        }
    })
    res.json(testing)
}   