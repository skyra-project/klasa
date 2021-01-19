const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	run(message, command) {
		return command.hidden && message.command !== command && !this.context.client.owners.has(message.author);
	}
};
