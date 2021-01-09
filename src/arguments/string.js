const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(...args) {
		super(...args, { aliases: ['str'] });
	}

	async run(arg, possible, message) {
		if (!arg) throw await message.resolveKey('resolvers:invalidString', { name: possible.name });
		const { min, max } = possible;
		return (await this.constructor.minOrMax(this.client, arg.length, min, max, possible, message, 'resolverStringSuffix')) ? arg : null;
	}
};
