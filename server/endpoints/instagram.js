const {handleloss} = require("../lib/handleloss");
module.exports.name = "/api/meta/webhook";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return true;
}
module.exports.execute = async function (req, res) {
    console.log('Instagram request body:');
    let uid = 'json'
    await handleloss(uid)
    console.debug(JSON.stringify(req.body["entry"][0]))
    res.sendStatus(200);
}
