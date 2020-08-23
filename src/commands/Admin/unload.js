const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['u'],
			permissionLevel: 10,
			guarded: true,
			description: (language) => language.get('commandUnloadDescription'),
			usage: '<Piece:piece>'
		});
	}

	async run(message, [piece]) {
		if ((piece.type === 'event' && piece.name === 'message') || (piece.type === 'monitor' && piece.name === 'commandHandler')) {
			return message.sendLocale('commandUnloadWarn');
		}
		piece.unload();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.get('${piece.name}').unload();
			`);
		}
		return message.sendLocale('commandUnload', [{ type: piece.type, name: piece.name }]);
	}
};
