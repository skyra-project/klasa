const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	async run(message, command) {
		if (command.nsfw && !message.channel.nsfw) throw await message.resolveKey('inhibitors:nsfw');
	}
};
