const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...event'] });
	}

	get base() {
		return this.store.get('event');
	}
};
