const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...piece'] });
	}

	get base() {
		return this.store.get('piece');
	}
};
