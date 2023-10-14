const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.name = "/api/get/groups";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.id) {
        prisma.group.findUnique({
            where: {
                id: req.body.id
            }
        }).then((group) => {
            let logs = group.logs;
            if (logs.length > 10) logs = logs.slice(-10);
            res.json({ logs: logs })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" })
        });
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}