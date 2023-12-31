const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    //To protect certain routes where only authorized people can access the protected routes
    const token = req.header("x-jwtoken");
    try {
        const payload = jwt.verify(token, "pkey");
        req.user = payload;
        next();
    } catch (error) {
        res.send({ status: false, msg: "Invalid token" })
    }


}

module.exports = authenticate;