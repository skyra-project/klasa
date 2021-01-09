const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const store = this.client.pieceStores.get(arg);
		if (store) return store;
		throw await message.resolveKey('resolver:invalidPiece', { name: possible.name, piece: 'store' });
	}
};
