
module.exports = { 
	/**
	 * @param  {[]} pattern 
	 * @return {[boolean]}
	 */
	isPatternValid : (pattern) => {

		// Check is every number unique
		let l = pattern.length;
		while (l--) {
			if (pattern.indexOf(pattern[l]) !== l) {
				return false;
			}
		}

		// check length
		return pattern.length > 2;
	}
}