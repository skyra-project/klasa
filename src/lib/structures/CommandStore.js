const Command = require('./Command');
const { AliasStore } = require('@sapphire/pieces');

/**
 * Stores all the commands usable in Klasa
 * @extends AliasStore
 */
class CommandStore extends AliasStore {
	/**
	 * Constructs our CommandStore for use in Klasa
	 * @since 0.0.1
	 */
	constructor() {
		super(Command, { name: 'commands' });
	}
}

module.exports = CommandStore;
