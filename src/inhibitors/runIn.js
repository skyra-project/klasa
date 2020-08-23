const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	run(message, command) {
		if (!command.runIn.length) throw message.language.get('inhibitorRuninNone', { name: command.name });
		if (!command.runIn.includes(message.channel.type)) throw message.language.get('inhibitorRunin', { type: command.runIn.join(', ') });
	}
};
