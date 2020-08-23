const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, message) {
		const extendable = this.client.extendables.get(arg);
		if (extendable) return extendable;
		throw message.language.get('resolverInvalidPiece', { name: possible.name, piece: 'extendable' });
	}
};
