const { Command, Store, Stopwatch } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['r'],
			permissionLevel: 10,
			guarded: true,
			description: (language) => language.get('commandReloadDescription'),
			usage: '<Store:store|Piece:piece|everything:default>'
		});
	}

	async run(message, [piece]) {
		if (piece === 'everything') return this.everything(message);
		if (piece instanceof Store) {
			const timer = new Stopwatch();
			await piece.loadAll();
			await piece.init();
			if (this.client.shard) {
				await this.client.shard.broadcastEval(`
					if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.name}.loadAll().then(() => this.${piece.name}.init());
				`);
			}
			return message.sendLocale('commandReloadAll', [{ type: piece, time: timer.stop() }]);
		}

		try {
			const itm = await piece.reload();
			const timer = new Stopwatch();
			if (this.client.shard) {
				await this.client.shard.broadcastEval(`
					if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.get('${piece.name}').reload();
				`);
			}
			return message.sendLocale('commandReload', [{ type: itm.type, name: itm.name, time: timer.stop() }]);
		} catch (err) {
			piece.store.set(piece);
			return message.sendLocale('commandReloadFailed', [{ type: piece.type, name: piece.name }]);
		}
	}

	async everything(message) {
		const timer = new Stopwatch();
		await Promise.all(
			this.client.pieceStores.map(async (store) => {
				await store.loadAll();
				await store.init();
			})
		);
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') this.pieceStores.map(async (store) => {
					await store.loadAll();
					await store.init();
				});
			`);
		}
		return message.sendLocale('commandReloadEverything', [{ time: timer.stop() }]);
	}
};
