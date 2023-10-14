const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

module.exports.name = "/api/register";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return true;
}

module.exports.execute = function (req, res) {
    if (req.body.username && req.body.password) {
        if (!/^\w+$/.test(req.body.username) || req.body.username.length > 32) {
            res.status(400).json({ error: `Usernames can only contain alphanumeric characters or underscores and must be at most 32 characters` });
        }
        else if (!/^[\w$&+,:;=?@#|'<>.^*()%!-]+$/.test(req.body.password) || req.body.password.length < 8) {
            res.status(400).json({ error: `Passwords can only contain alphanumeric characters or underscores and must be at least 8 characters` });
        }
        else {
            bcrypt.hash(req.body.password, 10, function (err, pwdhash) {
                if (err) {
                    res.status(500).json({ error: `Server error` });
                }
                else {
                    let userid = nanoid.nanoid(16);
                    prisma.user.create({
                        data: {
                            id: userid,
                            username: req.body.username,
                            password: pwdhash,
                            registertime: `${Date.now()}`
                        }
                    }).then(() => {
                        res.json({ message: 'success!', userid: userid });
                    }).catch(() => res.status(500).json({ error: "Internal server error" }));
                }
            });
        }
    }
    else {
        res.status(400).json({ error: `Invalid form` });
    }
}