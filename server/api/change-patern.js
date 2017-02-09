/**
 * db mock
 */
const db = require('../db');
const isValidPattern = require('../../app/utils/validator').isPatternValid;

/**
 * Login API
 */
module.exports = function (req, res) {
	if (req.session.isLoggedIn) {
			// let pattern1 = db.get('pattern');
		let pattern = req.body && req.body.pattern;
		pattern = pattern || [];

		if (isValidPattern(pattern)) {
			db.set('pattern', pattern);
	    	res.json({ message: "Pattern is successfully changed" });
		} else {
	    	res.json({ errorMessage: "Invalid pattern" });
		}
	} else {
		res.json({ errorMessage: "You are not logged in" });
	}

}