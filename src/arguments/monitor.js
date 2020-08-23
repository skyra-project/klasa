const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, message) {
		const monitor = this.client.monitors.get(arg);
		if (monitor) return monitor;
		throw message.language.get('resolverInvalidPiece', { name: possible.name, piece: 'monitor' });
	}
};
