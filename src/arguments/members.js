const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...member'] });
	}

	get base() {
		return this.store.get('member');
	}
};
