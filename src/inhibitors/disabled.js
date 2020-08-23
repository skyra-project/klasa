const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	run(message, command) {
		if (!command.enabled) throw message.language.get('inhibitorDisabledGlobal');
		if (message.guildSettings.get('disabledCommands').includes(command.name)) throw message.language.get('inhibitorDisabledGuild');
	}
};
