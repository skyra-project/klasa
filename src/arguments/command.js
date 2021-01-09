const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(...args) {
		super(...args, { aliases: ['cmd'] });
	}

	async run(arg, possible, message) {
		const command = this.client.commands.get(arg.toLowerCase());
		if (command) return command;
		throw await message.resolveKey('resolver:invalidPiece', { name: possible.name, piece: 'command' });
	}
};
