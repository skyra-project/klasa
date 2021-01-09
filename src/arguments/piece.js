const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		for (const store of this.client.pieceStores.values()) {
			const piece = store.get(arg);
			if (piece) return piece;
		}
		throw await message.resolveKey('resolver:invalidPiece', { name: possible.name, piece: 'piece' });
	}
};
