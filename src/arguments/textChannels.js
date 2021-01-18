const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...textChannel'] });
	}

	get base() {
		return this.store.get('textChannel');
	}
};
