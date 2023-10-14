const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/invite";
module.exports.method = "PUT";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.username && req.body.groupid) {
        prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        }).then((user) => {
            let inviteid = nanoid.nanoid(16);
            const foundGroup = prisma.group.findUnique({
                where: {
                    id: req.body.groupid
                }
            })
            prisma.groupInvite.create({
                data: {
                    id: inviteid,
                    startdate: Date.now(),
                    enddate: Date.now() + 24 * 60 * 60 * 1000,
                    groupid: groupid,
                    group: foundGroup,
                    user: user,
                    userid: user.id
                }
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" })
        });
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}