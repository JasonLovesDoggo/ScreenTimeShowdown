const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios').default;
const config = require('../config');
const { nanoid } = require('nanoid');

module.exports.name = "/api/account/info";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return !!req.user;
}

module.exports.execute = function (req, res) {
    prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            transactions: true,
            groups: true,
            insta: true
        }
    }).then(user => {
        delete user.password;
        res.json(user);
    });
}