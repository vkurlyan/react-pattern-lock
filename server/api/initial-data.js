
/**
 * Initial data API
 */
module.exports = function (req, res) {
   	res.json({ isLoggedIn: req.session.isLoggedIn });
}