const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const role = this.constructor.regex.role.test(arg) ? message.guild.roles.cache.get(this.constructor.regex.role.exec(arg)[1]) : null;
		if (role) return role;
		throw await message.fetchLocale('resolverInvalidRole', { name: possible.name });
	}
};
