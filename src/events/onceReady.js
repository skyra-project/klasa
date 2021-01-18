const { Event, util } = require('klasa');
const { Team } = require('discord.js');
let retries = 0;

module.exports = class extends Event {
	constructor(context) {
		super(context, {
			once: true,
			event: 'ready'
		});
	}

	async run() {
		const { client } = this.context;
		try {
			await this.context.client.fetchApplication();
		} catch (err) {
			if (++retries === 3) return process.exit();
			client.emit('warning', `Unable to fetchApplication at this time, waiting 5 seconds and retrying. Retries left: ${retries - 3}`);
			await util.sleep(5000);
			return this.run();
		}

		if (!client.options.owners.length) {
			if (client.application.owner instanceof Team) client.options.owners.push(...client.application.owner.members.keys());
			else client.options.owners.push(client.application.owner.id);
		}

		client.mentionPrefix = new RegExp(`^<@!?${client.user.id}>`);

		// Init all the pieces
		util.initClean(client);
		client.ready = true;

		if (client.options.readyMessage !== null) {
			client.emit('log', util.isFunction(client.options.readyMessage) ? client.options.readyMessage(client) : client.options.readyMessage);
		}

		return client.emit('klasaReady');
	}
};
