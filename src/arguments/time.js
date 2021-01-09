const { Argument } = require('klasa');

module.exports = class extends Argument {
	get date() {
		return this.store.get('date');
	}

	get duration() {
		return this.store.get('duration');
	}

	async run(arg, possible, message) {
		let date;
		try {
			date = await this.date.run(arg, possible, message);
		} catch {
			try {
				date = await this.duration.run(arg, possible, message);
			} catch {
				// noop
			}
		}
		if (date && !isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
		throw await message.resolveKey('resolver:invalidTime', { name: possible.name });
	}
};
