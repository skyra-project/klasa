const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			guarded: true,
			description: (language) => language.get('commandDisableDescription'),
			usage: '<Piece:piece>'
		});
	}

	async run(message, [piece]) {
		if ((piece.type === 'event' && piece.name === 'message') || (piece.type === 'monitor' && piece.name === 'commandHandler')) {
			return message.sendLocale('commandDisableWarn');
		}
		piece.disable();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.get('${piece.name}').disable();
			`);
		}
		return message.sendLocale('commandDisable', [{ type: piece.type, name: piece.name }], {
			code: 'diff'
		});
	}
};
