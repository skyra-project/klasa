const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context);
		this.enabled = this.context.client.options.consoleEvents.verbose;
	}

	run(log) {
		this.context.client.console.verbose(log);
	}
};
