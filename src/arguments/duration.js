const { Argument, Duration } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const date = new Duration(arg).fromNow;
		if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
		throw await message.resolveKey('resolver:invalidDuration', { name: possible.name });
	}
};
