const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios').default;
const config = require('../config');
const { nanoid } = require('nanoid');

module.exports.name = "/api/account/topup";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return !!req.user;
}

module.exports.execute = function (req, res) {
    if (req.body.amount && Number.isInteger(parseInt(req.body.amount)) && parseInt(req.body.amount) > 0) {
        //for the purposes of this hackathon, we will be using a dummy account instead of collecting lots of data
        let transid = nanoid(12);
        axios.post('https://sandbox.pp.paybilt.com/api/v2/payment/eTransfer/', {
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
            ntf_url: `https://${config.apidomain}/api/webhook/topup`,
            udfs: [
                `stshowdown-${transid}`
            ],
            //shipping_cost: 0,
            //"bank_id": 101,
            return_url: `https://${config.apidomain}/account/topup?pending=true`,
            items: [
                {
                    "name": "Top Up",
                    "quantity": 1,
                    "description": "Top up for Screentime Showdown!",
                    "unit_price": parseInt(req.body.amount)
                }
            ]
        }, {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.paybilt.bearer}`
        }).then((axres) => {
            if (axres.data.status === "approved") {
                prisma.transaction.create({
                    data: {
                        id: transid,
                        amount: parseInt(req.body.amount),
                        udfs: `stshowdown-${transid}`,
                        paybiltid: axres.data.txid,
                        userid: req.user.id,
                        status: 'waiting...'
                    }
                }).then(() => {
                    res.json({
                        id: transid,
                        amount: parseInt(req.body.amount),
                        udfs: `stshowdown-${transid}`,
                        paybiltid: axres.data.txid,
                        redirect: axres.data.bank_payment_url
                    });
                });
            }
            else {
                console.log(axres.data);
                res.status(500).json({ status: 500, error: 'could not register payment' });
            }
        })
    }
    else {
        res.status(400).json({ error: `Invalid form` });
    }
}