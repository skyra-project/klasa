const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		if (arg.toLowerCase() === possible.name.toLowerCase()) return possible.name;
		throw await message.resolveKey('resolver:invalidLiteral', { name: possible.name });
	}
};
