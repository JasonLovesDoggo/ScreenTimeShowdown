const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.name = "/api/accept";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.id) {
        prisma.groupInvite.findUnique({
            where: {
                id: req.body.id
            }
        }).then((invite) => {
            prisma.group.update({
                where: {
                    id: invite.groupid
                },
                data: {
                    users: {
                        connect: [{id: invite.userid}] // Add the user to the group
                    },
                    logs: {
                        create: {
                            message: `User ${invite.userid} has accepted the invite!`,
                        }
                    }
                }
            })
            res.json({message: "invitation accepted!"});
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" })
        });
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}