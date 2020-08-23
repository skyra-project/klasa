const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, message) {
		const store = this.client.pieceStores.get(arg);
		if (store) return store;
		throw message.language.get('resolverInvalidPiece', { name: possible.name, piece: 'store' });
	}
};
