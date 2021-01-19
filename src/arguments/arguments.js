const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...argument'] });
	}

	get base() {
		return this.store.get('argument');
	}
};
