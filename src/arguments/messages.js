const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...message'] });
	}

	get base() {
		return this.store.get('message');
	}
};
