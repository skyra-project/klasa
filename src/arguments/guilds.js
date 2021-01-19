const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...guild'] });
	}

	get base() {
		return this.store.get('guild');
	}
};
