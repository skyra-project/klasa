const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const date = new Date(arg);
		if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
		throw await message.resolveKey('resolvers:invalidDate', { name: possible.name });
	}
};
