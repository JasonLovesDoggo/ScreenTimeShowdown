const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/invite";
module.exports.method = "PUT";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.inviteid) {
        prisma.invite.findUnique({
            where: {
                id: req.body.inviteid
            }
        }).then((invite) => {
            const user = invite.user;
            const users = invite.group.users;
            prisma.group.update({
                where: {
                    id: invite.group.id
                },
                data: {
                    users: [...users, user],
                    logs: [...group.logs, `${user.id} joined!`]
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