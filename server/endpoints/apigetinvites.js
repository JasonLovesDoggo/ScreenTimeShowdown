const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.name = "/api/get/invites";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    prisma.user.findUnique({
        where: {
            username: req.user.username
        }
    }).then((user) => {
        res.json({ invites: user.invites })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    });
}