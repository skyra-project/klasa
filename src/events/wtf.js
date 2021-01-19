const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context);
		this.enabled = this.context.client.options.consoleEvents.wtf;
	}

	run(failure) {
		this.context.client.console.wtf(failure);
	}
};
