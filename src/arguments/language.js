const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, message) {
		const language = this.client.languages.get(arg);
		if (language) return language;
		throw message.language.get('resolverInvalidPiece', { name: possible.name, piece: 'language' });
	}
};
