/**
 * DB mock
 * @type {Object}
 */
let data = {
	// Default patter
	pattern: [0,1,2]
};

module.exports = {
	get: (key) => {
		return data[key];
	},
	set: (key, value) => {
		data[key] = value;
	}
}