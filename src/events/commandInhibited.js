const { Event } = require('klasa');

module.exports = class extends Event {
	run(message, command, response) {
		if (response && response.length) message.send(response, { allowedMentions: { users: [message.author.id], roles: [] } });
	}
};
