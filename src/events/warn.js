const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context);
		this.enabled = this.context.client.options.consoleEvents.warn;
	}

	run(warning) {
		this.context.client.console.warn(warning);
	}
};
