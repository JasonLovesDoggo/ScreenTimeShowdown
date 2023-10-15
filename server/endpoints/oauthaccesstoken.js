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
    code = code.substring(0, code.length - 2);
    console.log(code);

    let data = {'client_id' : instaclientid,
        'client_secret' : instaclientsecret,
        'grant_type' : 'authorization_code',
        'redirect_uri' : instaredirect,
        'code' : code,
    };

// Configure the request
    post('https://api.instagram.com/oauth/access_token', )//todo this micleaght be the issue\???
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
