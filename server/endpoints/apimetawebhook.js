
module.exports.name = "/api/meta/webhook";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return true;
}
const token = 'hello'
module.exports.execute = function (req, res) {
    console.log(req.body)
    if (req.query["hub.challenge"] && req.query["hub.verify_token"] === token) {
        res.send(req.query["hub.challenge"]);
    }
    /* res.json({ message: 'updated' });
            }
            else {
                res.status(404).json({ status: 404, error: 'transaction not found' });
            }
        });
    } */
    else {
        res.status(400).json({ status: 400, error: 'bad format' });
    }
}
