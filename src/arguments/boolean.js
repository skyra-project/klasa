const { Argument } = require('klasa');
const truths = ['1', 'true', '+', 't', 'yes', 'y'];
const falses = ['0', 'false', '-', 'f', 'no', 'n'];

module.exports = class extends Argument {
	constructor(...args) {
		super(...args, { aliases: ['bool'] });
	}

	async run(arg, possible, message) {
		const boolean = String(arg).toLowerCase();
		if (truths.includes(boolean)) return true;
		if (falses.includes(boolean)) return false;
		throw await message.fetchLocale('resolverInvalidBool', { name: possible.name });
	}
};
