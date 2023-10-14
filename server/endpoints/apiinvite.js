const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/invite";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.username && req.body.id) {
        if (req.user.username == req.body.username) {
            res.status(400).json({ error: "Cannot send invite to yourself" });
        }
        prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        }).then(async (user) => {
            let inviteid = nanoid.nanoid(16);
            const foundgroup = await prisma.group.findUnique({
                where: {
                    id: req.body.id
                }
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500).json({error: "Internal server error"})
            })
            const newinvite = await prisma.groupInvite.create({
                data: {
                    id: inviteid,
                    startdate: `${Date.now()}`,
                    enddate: `${Date.now() + 24 * 60 * 60 * 1000}`,
                    group: {
                        connect: {
                            id: foundgroup.id
                        }
                    },
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            })
            res.json({ invite: newinvite });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" })
        });
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}