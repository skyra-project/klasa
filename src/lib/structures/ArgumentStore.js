const Argument = require('./Argument');
const { AliasStore } = require('@sapphire/pieces');

/**
 * Stores all the arguments usable in Klasa
 * @extends AliasStore
 */
class ArgumentStore extends AliasStore {
	/**
	 * Constructs our ArgumentStore for use in Klasa
	 * @since 0.5.0
	 */
	constructor() {
		super(Argument, { name: 'arguments' });
	}
}

module.exports = ArgumentStore;
