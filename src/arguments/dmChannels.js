const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...dmChannel'] });
	}

	get base() {
		return this.store.get('dmChannel');
	}
};
