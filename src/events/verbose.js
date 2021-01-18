const { Event } = require('klasa');

module.exports = class extends Event {
	run(log) {
		this.context.client.console.verbose(log);
	}

	onLoad() {
		this.enabled = this.context.client.options.consoleEvents.verbose;
	}
};
