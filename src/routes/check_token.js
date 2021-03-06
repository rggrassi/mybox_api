const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(err) {            
        res.status(401).send({ success: false, message: err.message });
    }
}

module.exports = { checkToken }