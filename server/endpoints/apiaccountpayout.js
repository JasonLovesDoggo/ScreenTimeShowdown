const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios').default;
const config = require('../config');
const { nanoid } = require('nanoid');

module.exports.name = "/api/account/payout";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return !!req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.amount && Number.isInteger(parseInt(req.body.amount)) && parseInt(req.body.amount) > 0) {
        prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        }).then((user) => {
            if (user.money < parseInt(req.body.amount)) {
                res.status(401).json({ status: 401, error: 'You do not have enough money' });
            }
            else {
                //for the purposes of this hackathon, we will be using a dummy account instead of collecting lots of data
                let transid = nanoid(12);
                axios.post('https://sandbox.pp.paybilt.com/api/v2/payout/eTransfer/', {
                    email: `dummy@${config.apidomain}`,
                    phone: "4034881071",
                    first_name: "John",
                    last_name: "Wick",
                    address: "3291 Craven Place",
                    city: "Medicine Hat",
                    state: "Alberta",
                    country: "CA",
                    zip_code: "T1A 0N1",
                    ip_address: "127.0.0.1",
                    ntf_url: `https://${config.apidomain}/api/webhook/payout`,
                    udfs: [
                        `stshowdown-${transid}`
                    ],
                    //shipping_cost: 0,
                    //"bank_id": 101,
                    //return_url: `https://${config.apidomain}/account/topup?pending=true`,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.paybilt.bearer}`
                    }
                }).then((axres) => {
                    if (axres.data.status === "approved") {
                        prisma.user.update({
                            where: {
                                id: user.id
                            },
                            data: {
                                money: {
                                    decrement: parseInt(req.body.amount)
                                }
                            }
                        }).then(() => {
                            res.json({
                                amount: parseInt(req.body.amount),
                                paybiltid: axres.data.txid
                            });
                        });
                    }
                    else {
                        console.log(axres.data);
                        res.status(500).json({ status: 500, error: 'could not register payout' });
                    }
                })
            }
        })
    }
    else {
        res.status(400).json({ error: `Invalid form` });
    }
}