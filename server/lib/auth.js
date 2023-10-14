const jwt = require('jsonwebtoken');
const secret = require('../secret');

module.exports.authorization = (req, res, next) => {
    return new Promise((resolve, reject) => {
        if (req.headers.authorization && req.headers.authorization.split(' ').length == 2) {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret.jwt, (err, user) => {
                if (err) {
                    next();
                }
                else {
                    req.user = user;
                    next();
                }
            })
        }
        else {
            next();
        }
    })
}