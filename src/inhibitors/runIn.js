const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	run(message, command) {
		if (!command.runIn.length) throw message.language.get('INHIBITOR_RUNIN_NONE', { name: command.name });
		if (!command.runIn.includes(message.channel.type)) throw message.language.get('INHIBITOR_RUNIN', { type: command.runIn.join(', ') });
	}
};
