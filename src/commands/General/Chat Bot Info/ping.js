const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			guarded: true,
			description: (language) => language.get('commandPingDescription')
		});
	}

	async run(message) {
		const msg = await message.sendLocale('commandPing');
		return message.sendLocale('commandPingPong', [
			{
				diff: (msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp),
				ping: Math.round(this.client.ws.ping)
			}
		]);
	}
};
