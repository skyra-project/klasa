const { parse } = require('url');
const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(context) {
		super(context, { aliases: ['url'] });
	}

	async run(arg, possible, message) {
		const res = parse(arg);
		const hyperlink = res.protocol && res.hostname ? arg : null;
		if (hyperlink !== null) return hyperlink;
		throw await message.resolveKey('resolvers:invalidUrl', { name: possible.name });
	}
};
