const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const user = this.constructor.regex.userOrMember.test(arg)
			? await this.client.users.fetch(this.constructor.regex.userOrMember.exec(arg)[1]).catch(() => null)
			: null;
		if (user) return user.createDM();
		throw await message.resolveKey('resolvers:invalidChannel', { name: possible.name });
	}
};
