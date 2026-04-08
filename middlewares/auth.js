const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/user/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;        // This should contain userId, username, email
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/user/login');
    }
}

module.exports = auth;