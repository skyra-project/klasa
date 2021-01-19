const Event = require('./Event');
const { Store } = require('@sapphire/pieces');

/**
 * Stores all the events that a part of Klasa
 * @extends Store
 */
class EventStore extends Store {
	/**
	 * Constructs our EventStore for use in Klasa
	 * @since 0.0.1
	 */
	constructor() {
		super(Event, { name: 'events' });
	}
}

module.exports = EventStore;
