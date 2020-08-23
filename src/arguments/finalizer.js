const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, message) {
		const finalizer = this.client.finalizers.get(arg);
		if (finalizer) return finalizer;
		throw message.language.get('resolverInvalidPiece', { name: possible.name, piece: 'finalizer' });
	}
};
