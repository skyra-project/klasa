const { Event } = require('klasa');

module.exports = class extends Event {
	run(message, command, params, error) {
		message.sendMessage(error, { allowedMentions: { users: [], roles: [] } }).catch((err) => this.client.emit('wtf', err));
	}
};
