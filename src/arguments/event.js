const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const event = this.client.events.get(arg);
		if (event) return event;
		throw await message.fetchLocale('resolverInvalidPiece', { name: possible.name, piece: 'event' });
	}
};
