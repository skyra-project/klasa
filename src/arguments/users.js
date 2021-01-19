const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...user'] });
	}

	get base() {
		return this.store.get('user');
	}
};
