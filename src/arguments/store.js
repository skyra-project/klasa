const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		for (const store of this.context.client.stores.values()) {
			if (store.name === arg) return store;
		}
		throw await message.resolveKey('resolvers:invalidPiece', { name: possible.name, piece: 'store' });
	}
};
