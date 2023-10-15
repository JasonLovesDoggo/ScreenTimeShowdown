const config = require("../config");
module.exports.name = "/oauth/authorize";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return true;
}
module.exports.execute = async function (req, res) {
    if (!req.userid) {
        return res.redirect('https://screentimeshowdown.tech/login?next=/oauth/authorize')
    }
    res.redirect('https://api.instagram.com/oauth/authorize' +
        `?client_id=${config.instaclientid}` +
        `&redirect_uri=${config.instaredirect}` +
        `&response_type=code` +
        `&scope=user_profile`)
}
