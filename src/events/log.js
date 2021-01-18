const { Event } = require('klasa');

module.exports = class extends Event {
	run(data) {
		this.context.client.console.log(data);
	}

	onLoad() {
		if (!this.context.client.options.consoleEvents.log) this.disable();
	}
};
