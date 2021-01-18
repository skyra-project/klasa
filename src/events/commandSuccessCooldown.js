const { RateLimitManager, Event } = require('klasa');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, { event: 'commandSuccess' });
		this.cooldowns = new WeakMap();
	}

	run(message, command) {
		if (command.cooldown <= 0 || this.context.client.owners.has(message.author)) return;

		try {
			this.getCooldown(message, command).drip();
		} catch (err) {
			this.context.client.emit('error', `${message.author.username}[${message.author.id}] has exceeded the RateLimit for ${message.command}`);
		}
	}

	getCooldown(message, command) {
		let cooldownManager = this.cooldowns.get(command);
		if (!cooldownManager) {
			cooldownManager = new RateLimitManager(command.bucket, command.cooldown * 1000);
			this.cooldowns.set(command, cooldownManager);
		}
		return cooldownManager.acquire(message.guild ? message[command.cooldownLevel].id : message.author.id);
	}
};
