const { Command, Stopwatch } = require('klasa');
const { pathExists } = require('fs-nextra');
const { join } = require('path');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['l'],
			permissionLevel: 10,
			guarded: true,
			description: (language) => language.get('commandLoadDescription'),
			usage: '[core] <Store:store> <path:...string>',
			usageDelim: ' '
		});
		this.regExp = /\\\\?|\//g;
	}

	async run(message, [core, store, path]) {
		path = (path.endsWith('.js') ? path : `${path}.js`).split(this.regExp);
		const timer = new Stopwatch();
		const piece = await (core ? this.tryEach(store, path) : store.load(store.userDirectory, path));

		try {
			if (!piece) throw message.language.get('commandLoadFail');
			await piece.init();
			if (this.client.shard) {
				await this.client.shard.broadcastEval(`
					if (String(this.options.shards) !== '${this.client.options.shards}') {
						const piece = this.${piece.store}.load('${piece.directory}', ${JSON.stringify(path)});
						if (piece) piece.init();
					}
				`);
			}
			return message.sendLocale('commandLoad', [{ time: timer.stop(), type: store.name, name: piece.name }]);
		} catch (error) {
			timer.stop();
			throw message.language.get('commandLoadError', { type: store.name, name: piece ? piece.name : path.join('/'), error });
		}
	}

	async tryEach(store, path) {
		for (const dir of store.coreDirectories) if (await pathExists(join(dir, ...path))) return store.load(dir, path);
		return undefined;
	}
};
