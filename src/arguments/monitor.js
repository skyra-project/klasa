const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const monitor = this.client.monitors.get(arg);
		if (monitor) return monitor;
		throw await message.fetchLocale('resolver:invalidPiece', { name: possible.name, piece: 'monitor' });
	}
};
