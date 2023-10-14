const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/group/create";
module.exports.method = "PUT";
module.exports.verify = function (req, res) {
    return req.user;
}
module.exports.execute = async function (req, res) {
    if (req.body.id) {
        try {
            const group = await prisma.group.findUnique({
                where: {
                    id: req.body.id
                },
                include: {
                    users: true
                }
            });
            // Subtract money from each user in the group
            group.users.forEach(async user => {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        money: money - bet
                    }
                })
            })
            let pot = group.pot;
            pot += group.users.length * group.bet;

            prisma.group.update({
                where: {
                    id: req.body.id
                },
                data: {
                    pot: pot
                }
            });
        } catch (error) {
            console.log(error);
            res.send(500).json({error: error});
        }
    } else {
        res.status(400).json({error: "Invalid form"})
    }
}
