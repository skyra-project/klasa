const { Event } = require('klasa');

module.exports = class extends Event {
	run(failure) {
		this.context.client.console.wtf(failure);
	}

	onLoad() {
		this.enabled = this.context.client.options.consoleEvents.wtf;
	}
};
