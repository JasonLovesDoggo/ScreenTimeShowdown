const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios').default;
const config = require('../config');
const { nanoid } = require('nanoid');

module.exports.name = "/api/webhook/topup";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return true;
}

module.exports.execute = function (req, res) {
    if (req.body.udfs && req.body.udfs[0] && req.body.tx_action && req.body.status) {
        prisma.transaction.findUnique({
            where: {
                udfs: req.body.udfs[0]
            },
            include: {
                user: true
            }
        }).then(async (trans) => {
            if (trans && !['completed', 'failed'].includes(trans.status)) {
                //credit to account or change status
                if (req.body.tx_action === "request") {
                    await prisma.transaction.update({
                        where: {
                            udfs: req.body.udfs[0]
                        },
                        data: {
                            status: req.body.status === "approved" ? "waiting..." : "failed"
                        }
                    })
                }
                else if (req.body.tx_action === "payment") {
                    if (req.body.status === "approved") {
                        await prisma.user.update({
                            where: {
                                id: trans.user.id
                            },
                            data: {
                                money: {
                                    increment: trans.amount
                                }
                            }
                        });
                    }
                    await prisma.transaction.update({
                        where: {
                            udfs: req.body.udfs[0]
                        },
                        data: {
                            status: req.body.status === "approved" ? "completed" : (req.body.status === "pending" ? 'pending approval' : 'failed')
                        }
                    })
                }
                res.json({ message: 'updated' });
            }
            else {
                res.status(404).json({ status: 404, error: 'transaction not found' });
            }
        });
    }
    else {
        res.status(400).json({ status: 400, error: 'bad format' });
    }
}