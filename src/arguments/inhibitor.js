const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const inhibitor = this.context.client.inhibitors.get(arg);
		if (inhibitor) return inhibitor;
		throw await message.resolveKey('resolvers:invalidPiece', { name: possible.name, piece: 'inhibitor' });
	}
};
