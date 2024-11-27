const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.secretKey;
function createJwt(username,role) {

    const payload = {
        username: username,
        role : role
    }
    const options = {
        expiresIn : "1h"
    }
    const token = jwt.sign(payload ,secretKey , options);
    return token;
}
module.exports = createJwt;