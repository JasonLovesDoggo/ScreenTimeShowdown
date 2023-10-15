const {post} = require("axios");
const {instaclientid, instaclientsecret, instaredirect} = require("../config");
module.exports.name = "/oauth/instagram/callback";
module.exports.method = "GET";
module.exports.verify = function (req, res) {
    return true;
}
module.exports.execute = async function (req, res) {
    let code = req.query.code;
    console.log(code);

    let dataForm = new FormData();
    dataForm.append('client_id', instaclientid);
    dataForm.append('client_secret', instaclientsecret);
    dataForm.append('grant_type', 'authorization_code');
    dataForm.append('redirect_uri', instaredirect);
    dataForm.append('code', code);

// Configure the request
    post('https://api.instagram.com/oauth/access_token', dataForm)//todo the data param might be the issue\???
        .then(function (response) { // handle success
            console.log(JSON.parse(response.data));
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
