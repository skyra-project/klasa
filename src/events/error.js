const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context);
		this.enabled = this.context.client.options.consoleEvents.error;
	}

	run(err) {
		this.context.client.console.error(err);
	}
};
