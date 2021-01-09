const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const finalizer = this.client.finalizers.get(arg);
		if (finalizer) return finalizer;
		throw await message.resolveKey('resolvers:invalidPiece', { name: possible.name, piece: 'finalizer' });
	}
};
