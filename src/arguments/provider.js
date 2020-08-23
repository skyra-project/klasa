const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, message) {
		const provider = this.client.providers.get(arg);
		if (provider) return provider;
		throw message.language.get('resolverInvalidPiece', { name: possible.name, piece: 'provider' });
	}
};
