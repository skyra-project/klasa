const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const language = this.client.languages.get(arg);
		if (language) return language;
		throw await message.fetchLocale('resolverInvalidPiece', { name: possible.name, piece: 'language' });
	}
};
