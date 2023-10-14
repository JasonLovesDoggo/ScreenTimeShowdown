const secret = require('./secret');

module.exports = {
    paybilt: {
        bearer: secret.paybilt
    },
    apidomain: 'api.screentimeshowdown.tech',
    cohere: {
        apikey: secret.cohere
    }
}