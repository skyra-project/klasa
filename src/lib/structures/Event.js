const { Piece } = require('@sapphire/pieces');

/**
 * Base class for all Klasa Events. See {@tutorial CreatingEvents} for more information how to use this class
 * to build custom events.
 * @tutorial CreatingEvents
 * @extends Piece
 */
class Event extends Piece {
	#listener;

	/**
	 * @typedef {PieceOptions} EventOptions
	 * @property {boolean} [once=false] If this event should only be run once and then unloaded
	 * @property {EventEmitter|string} [emitter=this.context.client] The emitter this event should be for (string indicates a client property)
	 * @property {string} [event=this.name] The event that should be listened to
	 */

	/**
	 * @since 0.0.1
	 * @param {PieceContext} context The context
	 * @param {EventOptions} [options={}] Optional Event settings
	 */
	constructor(context, options = {}) {
		super(context, options);

		/**
		 * The emitter this event is for
		 * @since 0.5.0
		 * @type {EventEmitter}
		 */
		this.emitter =
			typeof options.emitter === 'undefined'
				? this.context.client
				: (typeof options.emitter === 'string' ? Reflect.get(this.context.client, options.emitter) : options.emitter) ?? null;

		/**
		 * The event to listen for
		 * @since 0.5.0
		 * @type {string}
		 */
		this.event = options.event ?? this.name;

		/**
		 * If this event should only be run once and then unloaded
		 * @since 0.5.0
		 * @type {boolean}
		 */
		this.once = options.once ?? false;

		/**
		 * Stored bound on method, so it can be properly unlistened to later
		 * @since 0.5.0
		 * @type {Function}
		 * @private
		 */
		this.#listener = this.emitter && this.event ? (this.once ? this._runOnce.bind(this) : this._run.bind(this)) : null;
	}

	/**
	 * The run method to be overwritten in actual event handlers
	 * @since 0.0.1
	 * @param {*} param The event parameters emitted
	 * @returns {void}
	 * @abstract
	 */
	run() {
		// Defined in extension Classes
		throw new Error(`The run method has not been implemented by ${this.store.name}:${this.name}.`);
	}

	onLoad() {
		if (this.#listener) this.emitter[this.once ? 'once' : 'on'](this.event, this.#listener);
	}

	onUnload() {
		if (!this.once && this.#listener) this.emitter.off(this.event, this.#listener);
	}

	/**
	 * A wrapper for the run method, to easily disable/enable events
	 * @since 0.0.1
	 * @param {*} param The event parameters emitted
	 * @returns {void}
	 * @private
	 */
	async _run(...args) {
		try {
			await this.run(...args);
		} catch (err) {
			this.context.client.emit('eventError', this, args, err);
		}
	}

	/**
	 * A wrapper for the _run method for once handling
	 * @since 0.0.1
	 * @param {*} param The event parameters emitted
	 * @returns {void}
	 * @private
	 */
	async _runOnce(...args) {
		await this._run(...args);
		await this.store.unload(this);
	}

	/**
	 * Defines the JSON.stringify behavior of this event.
	 * @returns {Object}
	 */
	toJSON() {
		return {
			...super.toJSON(),
			once: this.once,
			event: this.event,
			emitter: this.emitter.constructor.name
		};
	}
}

module.exports = Event;
