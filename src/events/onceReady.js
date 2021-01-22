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
			await client.fetchApplication();
		} catch (err) {
			if (++retries === 3) return process.exit();
			client.logger.warn(`Unable to fetchApplication at this time, waiting 5 seconds and retrying. Retries left: ${3 - retries}`);
			await util.sleep(5000);
			return this.run();
		}

		if (!client.options.owners.length) {
			if (client.application.owner instanceof Team) client.options.owners.push(...client.application.owner.members.keys());
			else client.options.owners.push(client.application.owner.id);
		}

		client.mentionPrefix = new RegExp(`^<@!?${client.user.id}>`);

		// Init all the pieces
		client.ready = true;

		if (client.options.readyMessage !== null) {
			client.logger.info(typeof client.options.readyMessage === 'function' ? client.options.readyMessage(client) : client.options.readyMessage);
		}

		return client.emit('klasaReady');
	}
};
