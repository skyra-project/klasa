const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const event = this.context.client.events.get(arg);
		if (event) return event;
		throw await message.resolveKey('resolvers:invalidPiece', { name: possible.name, piece: 'event' });
	}
};
