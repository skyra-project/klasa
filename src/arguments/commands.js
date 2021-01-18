const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...command'] });
	}

	get base() {
		return this.store.get('command');
	}
};
