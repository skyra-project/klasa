const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(context) {
		super(context, { aliases: ['num', 'number'] });
	}

	async run(arg, possible, message) {
		const { min, max } = possible;
		const number = parseFloat(arg);
		if (isNaN(number)) throw await message.resolveKey('resolvers:invalidFloat', { name: possible.name });
		return (await this.constructor.minOrMax(number, min, max, possible, message)) ? number : null;
	}
};
