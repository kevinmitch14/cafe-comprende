import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    await prisma.account.update({
        // Match user ID
        where: { id: 1 },
        data: {
            reviews: {
                create: {
                    rating: req.body.rating,
                    Cafe: {
                        connectOrCreate: {
                            where: {
                                googlePlaceID: req.body.googlePlaceID,
                            },
                            create: {
                                googlePlaceID: req.body.googlePlaceID,
                                latitude: req.body.latitude,
                                longitude: req.body.longitude,
                                name: req.body.name,
                            },
                        }
                    }
                }
            }
        }

    })
    const accounts = await prisma.account.findMany({
        include: {
            reviews: true
        }
    })
    res.json(accounts)
}   