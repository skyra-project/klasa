const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	async run(message, command) {
		if (!command.runIn.length) throw await message.fetchLocale('inhibitorRuninNone', { name: command.name });
		if (!command.runIn.includes(message.channel.type)) throw await message.fetchLocale('inhibitorRunin', { type: command.runIn.join(', ') });
	}
};
