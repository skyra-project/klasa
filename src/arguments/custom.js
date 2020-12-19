const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message, custom) {
		try {
			const resolved = await custom(arg, possible, message, message.params);
			return resolved;
		} catch (err) {
			if (err) throw err;
			throw await message.fetchLocale('resolver:invalidCustom', { name: possible.name, type: possible.type });
		}
	}
};
