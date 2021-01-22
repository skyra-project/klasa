const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context, { emitter: process });
		this.enabled = !this.context.client.options.production;
	}

	run(err) {
		if (!err) return;
		this.context.client.logger.error(`Uncaught Promise Error: \n${err.stack || err}`);
	}
};
