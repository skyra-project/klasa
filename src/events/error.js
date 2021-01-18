const { Event } = require('klasa');

module.exports = class extends Event {
	run(err) {
		this.context.client.console.error(err);
	}

	onLoad() {
		if (!this.context.client.options.consoleEvents.error) this.disable();
	}
};
