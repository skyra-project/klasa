const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...channel'] });
	}

	get base() {
		return this.store.get('channel');
	}
};
