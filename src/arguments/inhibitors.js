const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...inhibitor'] });
	}

	get base() {
		return this.store.get('inhibitor');
	}
};
