const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.name = "/api/accept";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.id) {
        prisma.invite.findUnique({
            where: {
                id: req.body.id
            }
        }).then((invite) => {
            const user = invite.user;
            prisma.group.update({
                where: {
                    id: invite.group.id
                },
                data: {
                    users: {
                        connect: [user] // Add the user to the group
                    },
                    logs: {
                        push: {
                            message: `User ${user.username} has accepted the invite!`,
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