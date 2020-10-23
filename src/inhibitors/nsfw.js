const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	run(message, command) {
		if (command.nsfw && !message.channel.nsfw) throw await message.fetchLocale('inhibitorNsfw');
	}
};
