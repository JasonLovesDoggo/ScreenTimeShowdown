const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { nanoid } = require('nanoid');

module.exports.name = "/api/invite/accept";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = async function (req, res) {
    if (req.body.id) {
        try {
            const foundgroup = await prisma.group.findUnique({
                where: {
                    id: req.body.id
                }
            });
            if (!foundgroup) {
                res.sendStatus(404);
            }
            const updatedlist = foundgroup.surviving + `${req.user.id},`;
            let logid = nanoid(16);
            await prisma.groupLog.create({
                data: {
                    id: logid,
                    title: "Added user to group",
                    timestamp: `${Date.now()}`,
                    content: `${req.user.username} has been added to group ${foundgroup.name}.`,
                    groupid: foundgroup.id,
                }
            })
            const updatedgroup = await prisma.group.update({
                where: {
                    id: req.body.id
                },
                include: {
                    users: true
                },
                data: {
                    users: {
                        connect: [{ id: req.user.id }]
                    },
                    surviving: updatedlist
                }
            })
            console.log(JSON.stringify(updatedgroup))
            res.status(200).json({ message: "invitation accepted!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}