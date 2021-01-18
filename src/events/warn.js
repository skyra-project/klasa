const { Event } = require('klasa');

module.exports = class extends Event {
	run(warning) {
		this.context.client.console.warn(warning);
	}

	onLoad() {
		this.enabled = this.context.client.options.consoleEvents.warn;
	}
};
