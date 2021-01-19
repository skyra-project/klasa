const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const emoji = this.constructor.regex.emoji.test(arg) ? this.context.client.emojis.cache.get(this.constructor.regex.emoji.exec(arg)[1]) : null;
		if (emoji) return emoji;
		throw await message.resolveKey('resolvers:invalidEmoji', { name: possible.name });
	}
};
