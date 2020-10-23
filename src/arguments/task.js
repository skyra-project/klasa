const { Argument } = require('klasa');

module.exports = class extends Argument {
	async run(arg, possible, message) {
		const task = this.client.tasks.get(arg);
		if (task) return task;
		throw await message.fetchLocale('resolverInvalidPiece', { name: possible.name, piece: 'task' });
	}
};
