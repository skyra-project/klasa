const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const argument = this.client.arguments.get(arg);
		if (argument) return argument;
		throw await message.fetchLocale('resolverInvalidPiece', { name: possible.name, piece: 'argument' });
	}
};
