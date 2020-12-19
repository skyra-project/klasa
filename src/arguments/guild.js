const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const guild = this.constructor.regex.snowflake.test(arg) ? this.client.guilds.cache.get(arg) : null;
		if (guild) return guild;
		throw await message.fetchLocale('resolver:invalidGuild', { name: possible.name });
	}
};
