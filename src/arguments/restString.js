const { Argument } = require('klasa');

module.exports = class extends Argument {
	constructor(context) {
		super(context, { name: '...string', aliases: ['...str'] });
	}

	get stringArg() {
		return this.store.get('string');
	}

	async run(arg, possible, message) {
		if (!arg) throw await message.resolveKey('resolvers:invalidString', { name: possible.name });
		const {
			args,
			usage: { usageDelim }
		} = message.prompter;
		const index = args.indexOf(arg);
		const rest = args.splice(index, args.length - index).join(usageDelim);
		args.push(rest);
		return this.stringArg.run(rest, possible, message);
	}
};
