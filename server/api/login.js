/**
 * db mock
 */
const db = require('../db');

/**
 * Login API
 */
module.exports = function (req, res) {
	let pattern1 = db.get('pattern');
	let pattern2 = req.body && req.body.pattern;
	pattern2 = pattern2 || [];

	if (pattern1.join(',') === pattern2.join(',')) {
	    req.session.isLoggedIn = true;
    	res.json({ isLoggedIn: true });
	} else {
		// Deley
		setTimeout(() => {
    		res.json({ isLoggedIn: false, message: "Wrong pattern" });
		}, 1500);
	}
}