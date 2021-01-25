module.exports = (req, res, next) => {
    try {
        if (!req.signedCookies.adminId) {
            res.redirect('/sign-in');
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
}