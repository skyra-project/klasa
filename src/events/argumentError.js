const { Event } = require('klasa');

module.exports = class extends Event {
	run(message, command, params, error) {
		message.send(error, { allowedMentions: { users: [message.author.id], roles: [] } }).catch((err) => this.client.emit('wtf', err));
	}
};
