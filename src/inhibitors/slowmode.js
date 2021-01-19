const { Inhibitor, RateLimitManager } = require('klasa');

module.exports = class extends Inhibitor {
	constructor(context) {
		super(context, { spamProtection: true });
		this.slowmode = new RateLimitManager(1, this.context.client.options.slowmode);
		this.aggressive = this.context.client.options.slowmodeAggressive;
		this.enabled = this.context.client.options.slowmode > 0;
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
