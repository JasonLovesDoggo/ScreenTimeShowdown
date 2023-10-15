const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secret = require('../secret')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.name = "/api/login";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return true;
}

module.exports.execute = function (req, res) {
    if (req.body.username && req.body.password) {
        prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (!user) {
                res.status(401).json({ error: "Incorrect password or username" });
            }
            else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        res.status(500).json({ error: `Server error` })
                    }
                    else {
                        if (!result) {
                            res.status(401).json({ error: "Incorrect username or email" });
                        }
                        else {

                            let token = jwt.sign({
                                username: user.username,
                                id: user.id,
                                money: user.money,
                                admin: user.admin,
                                registertime: `${parseInt(user.registertime)}`
                            }, secret.jwt);
                            res.json({ token: token });
                        }
                    }
                });
            }
        }).catch(err => res.status(500).json({ error: `Server error` }));
    }
    else {
        res.status(400).json({ error: `Invalid form` });
    }
}
