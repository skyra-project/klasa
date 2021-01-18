const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, { emitter: process });
		this.enabled = !this.context.client.options.production;
	}

	run(err) {
		if (!err) return;
		this.context.client.emit('error', `Uncaught Promise Error: \n${err.stack || err}`);
	}
};
