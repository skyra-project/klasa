const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			guarded: true,
			description: (language) => language.get('COMMAND_PING_DESCRIPTION')
		});
	}

	async run(message) {
		const msg = await message.sendLocale('COMMAND_PING');
		return message.sendLocale('COMMAND_PINGPONG', [
			{
				diff: (msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp),
				ping: Math.round(this.client.ws.ping)
			}
		]);
	}
};
