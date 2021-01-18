const { Inhibitor, RateLimitManager } = require('klasa');

module.exports = class extends Inhibitor {
	constructor(...args) {
		super(...args, { spamProtection: true });
		this.slowmode = new RateLimitManager(1, this.context.client.options.slowmode);
		this.aggressive = this.context.client.options.slowmodeAggressive;

		if (!this.context.client.options.slowmode) this.disable();
	}

	run(message) {
		if (this.context.client.owners.has(message.author)) return;

		const rateLimit = this.slowmode.acquire(message.author.id);

		try {
			rateLimit.drip();
		} catch (err) {
			if (this.aggressive) rateLimit.resetTime();
			throw true;
		}
	}
};
