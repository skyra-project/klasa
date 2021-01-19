const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...emoji'] });
	}

	get base() {
		return this.store.get('emoji');
	}
};
