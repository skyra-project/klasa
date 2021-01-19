const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context);
		this.enabled = this.context.client.options.consoleEvents.log;
	}

	run(data) {
		this.context.client.console.log(data);
	}
};
