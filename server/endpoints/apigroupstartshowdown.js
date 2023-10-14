const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/group/startshowdown";
module.exports.method = "POST";
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
                let money = user.money;
                let bet = group.bet;
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        money: money - bet
                    }
                })
                console.log(JSON.stringify(user));
            })
            let pot = group.pot + (group.users.length * group.bet);
            console.log(pot);
            let enddate = Date.now() + group.interval;

            const updatedgroup = await prisma.group.update({
                where: {
                    id: req.body.id
                },
                data: {
                    startdate: `${Date.now()}`,
                    enddate: `${enddate}`,
                    pot: pot
                }
            });
            console.log(JSON.stringify(updatedgroup));
            res.json({group: updatedgroup});
        } catch (error) {
            console.log(error);
            res.send(500).json({error: error});
        }
    } else {
        res.status(400).json({error: "Invalid form"})
    }
}