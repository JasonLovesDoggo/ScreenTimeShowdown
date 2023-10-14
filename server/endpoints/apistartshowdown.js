const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/startshowdown";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.id) {
        prisma.group.update({
            where: {
                id: req.body.id
            },
            data: {
                startdate: Date.now(),
                enddate: Date.now() + interval,
                pot: bet * users.length
            }
        }).catch(() => res.status(500).json({ error : "Internal server error" }));

        prisma.group.findUnique({
            where: {
                id: req.body.id
            },
        }).then((group) => {
            console.log(JSON.stringify(group));
            if (!group) {
                res.status(401).json({ error: "Group was not found" });
            } else {
                group.users.forEach(user => {
                    console.log(user);
                    prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            money: money - bet
                        }
                    })
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: `${err}` })
        });
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}