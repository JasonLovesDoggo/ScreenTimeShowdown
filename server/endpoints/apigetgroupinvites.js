const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.name = "/api/get/group/invites";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.groupid) {
        prisma.group.findUnique({
            where: {
                id: req.body.groupid
            }
        }).then((group) => {
            res.json({ invites: group.invites })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" })
        });
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}