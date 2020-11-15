const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const extendable = this.client.extendables.get(arg);
		if (extendable) return extendable;
		throw await message.fetchLocale('resolverInvalidPiece', { name: possible.name, piece: 'extendable' });
	}
};
