
process.env.NODE_ENV = "production";

const express = require("express");
const fs = require('fs');
const path = require('path');
const auth = require('./lib/auth');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: true }));
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(auth.authorization);

//app.use('/site/files', express.static('static'));

var endpoints = {};
fs.readdirSync("./endpoints/").forEach(function (file) {
    let m = require("./endpoints/" + file);
    if (m.name == null || m.execute == null || m.method == null) {
        console.error(`\x1b[31mInvalid endpoint: ${file}\x1b[0m`);
    } else if (m.name in endpoints && endpoints[m.name] == m.method) {
        console.error(
            `\x1b[31mDuplicate endpoint: ${file} (${m.method} ${m.name})\x1b[0m`
        );
    } else {
        endpoints[m.name] = m.method;
        app[m.method.toLowerCase()](m.name, (req, res, next) => {
            if (m.verify(req, res, next)) {
                try {
                    m.execute(req, res, next);
                }
                catch (err) {
                    console.log(err);
                    res.status(500).json({ status: 500, error: err });
                }
            }
            else {
                res.status(403).json({ status: 403, error: 'Access denied' });
            }
        });
        console.log(`Loaded endpoint: ${m.method} ${file} (${m.name})`);
    }
});

//app.use(express.static('./client/dist', { extensions: ["html"] }));

app.use('/', function (req, res) {
    //res.sendFile(path.join(__dirname + `/client/dist/index.html`));
    res.json({ urbad: true });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
