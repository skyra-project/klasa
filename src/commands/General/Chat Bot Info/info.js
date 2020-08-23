const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			guarded: true,
			description: (language) => language.get('commandInfoDescription')
		});
	}

	async run(message) {
		return message.sendLocale('commandInfo');
	}
};
