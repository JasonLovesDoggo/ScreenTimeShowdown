const {post} = require("axios");
const {instaclientid, instaclientsecret, instaredirect} = require("../config");
const {instahelper} = require("../lib/instahelper");
module.exports.name = "/oauth/instagram/callback";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return true;
}
module.exports.execute = async function (req, res) {
    let dataForm = new FormData();

    let code = req.query.code;
    dataForm.append('client_id', instaclientid);
    dataForm.append('client_secret', instaclientsecret);
    dataForm.append('grant_type', 'authorization_code');
    dataForm.append('redirect_uri', instaredirect);
    dataForm.append('code', code);

// Configure the request
    post('https://api.instagram.com/oauth/access_token', dataForm)
        .then(async function (response) { // handle success
            let access_data = JSON.parse(response.data);
            console.log(access_data);
            let timestamp = new Date().getTime();
            await instahelper(req.user.id, access_data.user_id, timestamp);
            //res.redirect(`https://screentimeshowdown.tech/instagram?access_token=${access_data.access_token}&user_id=${access_data.user.id}`);
            res.redirect(`https://screentimeshowdown.tech/`);

        })
        .catch(function (response) { // handle error
            console.log(response);
        });

    /*


            // pbody should look like this:
            // {"access_token":"8943851.83434d.697342341324jkfdjsf41afd784932a2e8",
            //   "user":
            //     {"username":"my_user_name",
            //     "bio":"blah blah...",
            //     "website":"http:\/\/www.something.com",
            //   "profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_851_73sq_115.jpg",
            //     "full_name":"Full Name",
            //     "id":"8943851"}
            //   }

        }); */
}
