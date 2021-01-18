const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const channel = this.constructor.regex.channel.test(arg)
			? await this.context.client.channels.fetch(this.constructor.regex.channel.exec(arg)[1]).catch(() => null)
			: null;
		if (channel && channel.type === 'voice') return channel;
		throw await message.resolveKey('resolvers:invalidChannel', { name: possible.name });
	}
};
