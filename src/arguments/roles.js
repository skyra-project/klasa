const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...role'] });
	}

	get base() {
		return this.store.get('role');
	}
};
