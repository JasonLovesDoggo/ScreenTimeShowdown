const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.name = "/api/accept";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = async function (req, res) {
    if (req.body.id, req.body.key) {
        try {
            const foundgroup = await prisma.group.findUnique({
                where: {
                    id: req.body.id
                }
            });
            if (!foundgroup) {
                res.sendStatus(404);
            }
            if (foundgroup.key !== req.body.key) {
                res.sendStatus(403);
            }
            prisma.group.update({
                where: {
                    id: req.body.id
                },
                data: {
                    users: {
                        connect: [{id: req.user.id}]
                    }
                }
            })
            res.json({message: "invitation accepted!"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}