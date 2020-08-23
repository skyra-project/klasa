const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(...args) {
		super(...args, { aliases: ['str'] });
	}

	run(arg, possible, message) {
		if (!arg) throw message.language.get('resolverInvalidString', { name: possible.name });
		const { min, max } = possible;
		return this.constructor.minOrMax(this.client, arg.length, min, max, possible, message, 'resolverStringSuffix') ? arg : null;
	}
};
