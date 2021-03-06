const Discord = require('discord.js');
const { Store } = require('@sapphire/pieces');
const {
	Permissions,
	Permissions: { FLAGS }
} = Discord;
const { join } = require('path');

require('./extensions/KlasaMessage');

// lib/permissions
const PermissionLevels = require('./permissions/PermissionLevels');

// lib/structures
const ArgumentStore = require('./structures/ArgumentStore');
const CommandStore = require('./structures/CommandStore');
const EventStore = require('./structures/EventStore');
const InhibitorStore = require('./structures/InhibitorStore');

// lib/util
const { DEFAULTS } = require('./util/constants');
const getRootDirectory = require('./util/RootDir');
const Logger = require('./util/Logger');

/**
 * The client for handling everything. See {@tutorial GettingStarted} for more information how to get started using this class.
 * @extends external:Client
 * @tutorial GettingStarted
 */
class KlasaClient extends Discord.Client {
	/**
	 * Defaulted as `Successfully initialized. Ready to serve ${this.guilds.size} guilds.`
	 * @typedef {(string|Function)} ReadyMessage
	 */

	/**
	 * Defaulted to KlasaClient.defaultPermissionLevels
	 * @typedef {PermissionLevels} PermissionLevelsOverload
	 */

	/**
	 * @typedef {external:DiscordClientOptions} KlasaClientOptions
	 * @property {boolean} [commandEditing=false] Whether the bot should update responses if the command is edited
	 * @property {boolean} [commandLogging=false] Whether the bot should log command usage
	 * @property {number} [commandMessageLifetime=1800] The threshold for how old command messages can be before sweeping since the last edit in seconds
	 * @property {boolean} [createPiecesFolders=true] Whether Klasa should create pieces' folder at start up or not
	 * @property {CustomPromptDefaults} [customPromptDefaults={}] The defaults for custom prompts
	 * @property {string[]} [disabledCorePieces=[]] An array of disabled core piece types, e.g., ['commands', 'arguments']
	 * @property {boolean} [noPrefixDM=false] Whether the bot should allow prefixless messages in DMs
	 * @property {string[]} [owners] The discord user id for the users the bot should respect as the owner (gotten from Discord api if not provided)
	 * @property {PermissionLevelsOverload} [permissionLevels] The permission levels to use with this bot
	 * @property {string|string[]} [prefix] The default prefix the bot should respond to
	 * @property {boolean} [production=false] Whether the bot should handle unhandled promise rejections automatically (handles when false) (also can be configured with process.env.NODE_ENV)
	 * @property {ReadyMessage} [readyMessage] readyMessage to be passed throughout Klasa's ready event
	 * @property {RegExp} [regexPrefix] The regular expression prefix if one is provided
	 * @property {number} [slowmode=0] Amount of time in ms before the bot will respond to a users command since the last command that user has run
	 * @property {boolean} [slowmodeAggressive=false] If the slowmode time should reset if a user spams commands faster than the slowmode allows for
	 * @property {boolean} [typing=false] Whether the bot should type while processing commands
	 * @property {boolean} [prefixCaseInsensitive=false] Wether the bot should respond to case insensitive prefix or not
	 */

	/**
	 * @typedef {Object} CustomPromptDefaults
	 * @property {number} [limit=Infinity] The number of re-prompts before custom prompt gives up
	 * @property {number} [time=30000] The time-limit for re-prompting custom prompts
	 * @property {boolean} [quotedStringSupport=false] Whether the custom prompt should respect quoted strings
	 */

	/**
	 * Constructs the Klasa client
	 * @since 0.0.1
	 * @param {KlasaClientOptions} [options={}] The config to pass to the new client
	 */
	constructor(options = {}) {
		super({
			...DEFAULTS.CLIENT,
			...options,
			customPromptDefaults: { ...DEFAULTS.CLIENT.customPromptDefaults, ...(options.customPromptDefaults ?? {}) }
		});

		Store.injectedContext.client = this;

		/**
		 * The options the client was instantiated with.
		 * @since 0.5.0
		 * @name KlasaClient#options
		 * @type {KlasaClientOptions}
		 */

		/**
		 * The directory where the user files are at
		 * @since 0.0.1
		 * @type {string}
		 */
		this.userBaseDirectory = getRootDirectory();

		this.logger = options.logger?.instance ?? new Logger(options.logger?.level ?? 30 /* Info */);

		/**
		 * The cache where argument resolvers are stored
		 * @since 0.5.0
		 * @type {ArgumentStore}
		 */
		this.arguments = new ArgumentStore();

		/**
		 * The cache where commands are stored
		 * @since 0.0.1
		 * @type {CommandStore}
		 */
		this.commands = new CommandStore();

		/**
		 * The cache where inhibitors are stored
		 * @since 0.0.1
		 * @type {InhibitorStore}
		 */
		this.inhibitors = new InhibitorStore();

		/**
		 * The cache where events are stored
		 * @since 0.0.1
		 * @type {EventStore}
		 */
		this.events = new EventStore();

		/**
		 * A Store registry
		 * @since 0.3.0
		 * @type {Set<Store<any>>}
		 */
		this.stores = new Set();

		/**
		 * The permissions structure for this bot
		 * @since 0.0.1
		 * @type {PermissionLevels}
		 */
		this.permissionLevels = this.validatePermissionLevels();

		/**
		 * The application info cached from the discord api
		 * @since 0.0.1
		 * @type {external:ClientApplication}
		 */
		this.application = null;

		this.registerStore(this.commands).registerStore(this.inhibitors).registerStore(this.events).registerStore(this.arguments);

		const coreDirectory = join(__dirname, '../');
		for (const store of this.stores.values()) store.registerPath(join(coreDirectory, store.name));

		/**
		 * Whether the client is truly ready or not
		 * @since 0.0.1
		 * @type {boolean}
		 */
		this.ready = false;

		/**
		 * The regexp for a prefix mention
		 * @since 0.5.0
		 * @type {RegExp}
		 */
		this.mentionPrefix = null;
	}

	/**
	 * The invite link for the bot
	 * @since 0.0.1
	 * @type {string}
	 * @readonly
	 */
	get invite() {
		const permissions = new Permissions(this.constructor.basePermissions).add(...this.commands.map((command) => command.requiredPermissions))
			.bitfield;
		return `https://discordapp.com/oauth2/authorize?client_id=${this.application.id}&permissions=${permissions}&scope=bot`;
	}

	/**
	 * The owners for this bot
	 * @since 0.5.0
	 * @type {Set<User>}
	 * @readonly
	 */
	get owners() {
		const owners = new Set();
		for (const owner of this.options.owners) {
			const user = this.users.cache.get(owner);
			if (user) owners.add(user);
		}
		return owners;
	}

	/**
	 * Obtains the OAuth Application of the bot from Discord.
	 * When ran, this function will update {@link KlasaClient#application}.
	 * @since 0.0.1
	 * @returns {external:ClientApplication}
	 */
	async fetchApplication() {
		this.application = await super.fetchApplication();
		return this.application;
	}

	/**
	 * Validates the permission structure passed to the client
	 * @since 0.0.1
	 * @returns {PermissionLevels}
	 * @private
	 */
	validatePermissionLevels() {
		const permissionLevels = this.options.permissionLevels || this.constructor.defaultPermissionLevels;
		if (!(permissionLevels instanceof PermissionLevels)) throw new Error('permissionLevels must be an instance of the PermissionLevels class');
		if (permissionLevels.isValid()) return permissionLevels;
		throw new Error(permissionLevels.debug());
	}

	/**
	 * Registers a custom store to the client
	 * @since 0.3.0
	 * @param {Store} store The store that pieces will be stored in
	 * @returns {this}
	 * @chainable
	 */
	registerStore(store) {
		this.stores.add(store);
		return this;
	}

	/**
	 * Un-registers a custom store from the client
	 * @since 0.3.0
	 * @param {Store} storeName The store that pieces will be stored in
	 * @returns {this}
	 * @chainable
	 */
	deregisterStore(storeName) {
		this.stores.delete(storeName);
		return this;
	}

	/**
	 * Use this to login to Discord with your bot
	 * @since 0.0.1
	 * @param {string} token Your bot token
	 * @returns {string}
	 */
	async login(token) {
		await Promise.all([...this.stores].map((store) => store.loadAll()));
		return super.login(token);
	}

	/**
	 * Retrieves the prefix for the guild.
	 * @param {Message} message The message that gives context.
	 */
	fetchPrefix() {
		return this.options.prefix ?? null;
	}

	/**
	 * Sweeps all text-based channels' messages and removes the ones older than the max message or command message lifetime.
	 * If the message has been edited, the time of the edit is used rather than the time of the original message.
	 * @since 0.5.0
	 * @param {number} [lifetime=this.options.messageCacheLifetime] Messages that are older than this (in seconds)
	 * will be removed from the caches. The default is based on [ClientOptions#messageCacheLifetime]{@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions?scrollTo=messageCacheLifetime}
	 * @param {number} [commandLifetime=this.options.commandMessageLifetime] Messages that are older than this (in seconds)
	 * will be removed from the caches. The default is based on {@link KlasaClientOptions#commandMessageLifetime}
	 * @returns {number} Amount of messages that were removed from the caches,
	 * or -1 if the message cache lifetime is unlimited
	 */
	sweepMessages(lifetime = this.options.messageCacheLifetime, commandLifetime = this.options.commandMessageLifetime) {
		if (typeof lifetime !== 'number' || isNaN(lifetime)) throw new TypeError('The lifetime must be a number.');
		if (lifetime <= 0) {
			this.logger.debug("Didn't sweep messages - lifetime is unlimited");
			return -1;
		}

		const lifetimeMs = lifetime * 1000;
		const commandLifetimeMs = commandLifetime * 1000;
		const now = Date.now();
		let channels = 0;
		let messages = 0;
		let commandMessages = 0;

		for (const channel of this.channels.cache.values()) {
			if (!channel.messages) continue;
			channels++;

			channel.messages.cache.sweep((message) => {
				if (
					(message.command || message.author === this.user) &&
					now - (message.editedTimestamp || message.createdTimestamp) > commandLifetimeMs
				)
					return commandMessages++;
				if (!message.command && message.author !== this.user && now - (message.editedTimestamp || message.createdTimestamp) > lifetimeMs)
					return messages++;
				return false;
			});
		}

		this.logger.debug(
			`Swept ${messages} messages older than ${lifetime} seconds and ${commandMessages} command messages older than ${commandLifetime} seconds in ${channels} text-based channels`
		);
		return messages;
	}
}

module.exports = KlasaClient;

/**
 * The base Permissions that the {@link Client#invite} asks for. Defaults to [VIEW_CHANNEL, SEND_MESSAGES]
 * @since 0.5.0
 * @type {Permissions}
 */
KlasaClient.basePermissions = new Permissions(3072);

/**
 * The default PermissionLevels
 * @since 0.2.1
 * @type {PermissionLevels}
 */
KlasaClient.defaultPermissionLevels = new PermissionLevels()
	.add(0, () => true)
	.add(6, ({ guild, member }) => guild && member.permissions.has(FLAGS.MANAGE_GUILD), { fetch: true })
	.add(7, ({ guild, member }) => guild && member === guild.owner, {
		fetch: true
	})
	.add(9, ({ author, client }) => client.owners.has(author), { break: true })
	.add(10, ({ author, client }) => client.owners.has(author));

/**
 * Emitted when Klasa is fully ready and initialized.
 * @event KlasaClient#klasaReady
 * @since 0.3.0
 */

/**
 * Emitted when an unknown command is called.
 * @event KlasaClient#commandUnknown
 * @since 0.4.0
 * @param {Message} message The message that triggered the command
 * @param {string} command The command attempted to run
 * @param {RegExp} prefix The prefix used
 * @param {number} prefixLength The length of the prefix used
 */

/**
 * Emitted when a command has been inhibited.
 * @event KlasaClient#commandInhibited
 * @since 0.3.0
 * @param {Message} message The message that triggered the command
 * @param {Command} command The command triggered
 * @param {?string[]} response The reason why it was inhibited if not silent
 */

/**
 * Emitted when a command has been run.
 * @event KlasaClient#commandRun
 * @since 0.3.0
 * @param {Message} message The message that triggered the command
 * @param {Command} command The command run
 * @param {string[]} args The raw arguments of the command
 */

/**
 * Emitted when a command has been run.
 * @event KlasaClient#commandSuccess
 * @since 0.5.0
 * @param {Message} message The message that triggered the command
 * @param {Command} command The command run
 * @param {any[]} params The resolved parameters of the command
 * @param {?any} response Usually a response message, but whatever the command returned
 */

/**
 * Emitted when a command has encountered an error.
 * @event KlasaClient#commandError
 * @since 0.3.0
 * @param {Message} message The message that triggered the command
 * @param {Command} command The command run
 * @param {any[]} params The resolved parameters of the command
 * @param {Object} error The command error
 */

/**
 * Emitted when an invalid argument is passed to a command.
 * @event KlasaClient#argumentError
 * @since 0.5.0
 * @param {Message} message The message that triggered the command
 * @param {Command} command The command run
 * @param {any[]} params The resolved parameters of the command
 * @param {string} error The argument error
 */

/**
 * Emitted when an event has encountered an error.
 * @event KlasaClient#eventError
 * @since 0.5.0
 * @param {Event} event The event that errored
 * @param {any[]} args The event arguments
 * @param {(string|Object)} error The event error
 */
