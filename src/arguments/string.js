const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(context) {
		super(context, { aliases: ['str'] });
	}

	async run(arg, possible, message) {
		if (!arg) throw await message.resolveKey('resolvers:invalidString', { name: possible.name });
		const { min, max } = possible;
		return (await this.constructor.minOrMax(arg.length, min, max, possible, message, 'resolvers:stringSuffix')) ? arg : null;
	}
};
