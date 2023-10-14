const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
            let transactionlist = [];
            group.users.forEach(user => {
                //let money = user.money;
                transactionlist.push(prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        money: {
                            decrement: group.bet
                        }
                    }
                }));
            });
            await prisma.$transaction(transactionlist);

            let pot = group.pot + (group.users.length * group.bet);
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
            res.json({group: updatedgroup});
        } catch (error) {
            console.log(error);
            res.send(500).json({error: error});
        }
    } else {
        res.status(400).json({error: "Invalid form"})
    }
}