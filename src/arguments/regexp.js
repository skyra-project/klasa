const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(...args) {
		super(...args, { aliases: ['reg', 'regex'] });
	}

	async run(arg, possible, message) {
		const results = possible.regex.exec(arg);
		if (results !== null) return results;
		throw await message.resolveKey('resolvers:invalidRegexMatch', { name: possible.name, pattern: possible.regex.toString() });
	}
};
