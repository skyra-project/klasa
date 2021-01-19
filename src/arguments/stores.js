const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...store'] });
	}

	get base() {
		return this.store.get('store');
	}
};
