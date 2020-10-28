const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const inhibitor = this.client.inhibitors.get(arg);
		if (inhibitor) return inhibitor;
		throw await message.fetchLocale('resolverInvalidPiece', { name: possible.name, piece: 'inhibitor' });
	}
};
