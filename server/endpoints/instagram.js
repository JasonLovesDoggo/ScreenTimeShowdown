module.exports.name = "/api/meta/webhook";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return true;
}
module.exports.execute = function (req, res) {
    console.log('Instagram request body:');
    console.log(req.body);
    res.sendStatus(200);
}
