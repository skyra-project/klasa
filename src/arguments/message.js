const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(context) {
		super(context, { aliases: ['msg'] });
	}

	async run(arg, possible, message) {
		const msg = this.constructor.regex.snowflake.test(arg) ? await message.channel.messages.fetch(arg).catch(() => null) : undefined;
		if (msg) return msg;
		throw await message.resolveKey('resolvers:invalidMessage', { name: possible.name });
	}
};
