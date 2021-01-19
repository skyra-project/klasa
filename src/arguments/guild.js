const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const guild = this.constructor.regex.snowflake.test(arg) ? this.context.client.guilds.cache.get(arg) : null;
		if (guild) return guild;
		throw await message.resolveKey('resolvers:invalidGuild', { name: possible.name });
	}
};
