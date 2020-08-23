const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, message) {
		for (const store of this.client.pieceStores.values()) {
			const piece = store.get(arg);
			if (piece) return piece;
		}
		throw message.language.get('resolverInvalidPiece', { name: possible.name, piece: 'piece' });
	}
};
