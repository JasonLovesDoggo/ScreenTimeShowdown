const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/creategroup";
module.exports.method = "PUT";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.name && req.body.bet && req.body.interval) {
        console.log("valid request");
        console.log(req.user.id)
        let groupid = nanoid.nanoid(16);
        prisma.group.create({
            data: {
                id: groupid,
                name: req.body.name,
                users: [req.user.id],
                startdate: '0',
                enddate: '0',
                interval: req.body.interval,
                bet: req.body.bet,
                pot: 0,
                logs: {},
                invites: {}
            }
        }).then((group) => {
            res.json({ message: 'success!', group: group });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" })
        });
    } else {
        res.status(400).json({ error: `Invalid form` });
    }
}