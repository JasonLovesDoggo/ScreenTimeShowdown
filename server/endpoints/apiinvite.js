const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');

module.exports.name = "/api/invite";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = async function (req, res) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })
    console.log(JSON.stringify(req.user))
    console.log(JSON.stringify(user));
}