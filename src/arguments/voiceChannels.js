const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {
	constructor(context) {
		super(context, { aliases: ['...voiceChannel'] });
	}

	get base() {
		return this.store.get('voiceChannel');
	}
};
