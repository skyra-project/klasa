const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		for (const store of this.context.client.stores.values()) {
			const piece = store.get(arg);
			if (piece) return piece;
		}
		throw await message.resolveKey('resolvers:invalidPiece', { name: possible.name, piece: 'piece' });
	}
};
