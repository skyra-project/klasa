const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(context) {
		super(context, { aliases: ['cmd'] });
	}

	async run(arg, possible, message) {
		const command = this.context.client.commands.get(arg.toLowerCase());
		if (command) return command;
		throw await message.resolveKey('resolvers:invalidPiece', { name: possible.name, piece: 'command' });
	}
};
