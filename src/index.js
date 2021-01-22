const { AliasPiece, AliasStore, LoaderError, MissingExportsError, Piece, Store } = require('@sapphire/pieces');

module.exports = {
	// KlasaClient
	KlasaClient: require('./lib/Client'),
	Client: require('./lib/Client'),

	// lib/permissions
	PermissionLevels: require('./lib/permissions/PermissionLevels'),

	// lib/structures
	Argument: require('./lib/structures/Argument'),
	ArgumentStore: require('./lib/structures/ArgumentStore'),
	Command: require('./lib/structures/Command'),
	CommandStore: require('./lib/structures/CommandStore'),
	Event: require('./lib/structures/Event'),
	EventStore: require('./lib/structures/EventStore'),
	Inhibitor: require('./lib/structures/Inhibitor'),
	InhibitorStore: require('./lib/structures/InhibitorStore'),
	MultiArgument: require('./lib/structures/MultiArgument'),

	// lib/usage
	CommandPrompt: require('./lib/usage/CommandPrompt'),
	CommandUsage: require('./lib/usage/CommandUsage'),
	Usage: require('./lib/usage/Usage'),
	Possible: require('./lib/usage/Possible'),
	Tag: require('./lib/usage/Tag'),
	TextPrompt: require('./lib/usage/TextPrompt'),

	// lib/util
	constants: require('./lib/util/constants'),
	Logger: require('./lib/util/Logger'),
	RateLimit: require('./lib/util/RateLimit'),
	RateLimitManager: require('./lib/util/RateLimitManager'),
	util: require('./lib/util/util'),

	// version
	version: require('../package').version,

	AliasPiece,
	AliasStore,
	LoaderError,
	MissingExportsError,
	Piece,
	Store
};

/**
 * @external Channel
 * @see {@link https://discord.js.org/#/docs/main/master/class/Channel}
 */
/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */
/**
 * @external DiscordClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions}
 */
/**
 * @external ClientApplication
 * @see {@link https://discord.js.org/#/docs/main/master/class/ClientApplication}
 */
/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/main/master/class/Collection}
 */
/**
 * @external DMChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/DMChannel}
 */
/**
 * @external Guild
 * @see {@link https://discord.js.org/#/docs/main/master/class/Guild}
 */
/**
 * @external GuildMember
 * @see {@link https://discord.js.org/#/docs/main/master/class/GuildMember}
 */
/**
 * @external GuildResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/GuildResolvable}
 */
/**
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
 */
/**
 * @external MessageAttachment
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageAttachment}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external MessageReaction
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageReaction}
 */
/**
 * @external MessageOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/MessageOptions}
 */
/**
 * @external Role
 * @see {@link https://discord.js.org/#/docs/main/master/class/Role}
 */
/**
 * @external StringResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/StringResolvable}
 */
/**
 * @external TextChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/TextChannel}
 */
/**
 * @external VoiceChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/VoiceChannel}
 */
/**
 * @external CategoryChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/CategoryChannel}
 */
/**
 * @external User
 * @see {@link https://discord.js.org/#/docs/main/master/class/User}
 */
/**
 * @external UserStore
 * @see {@link https://discord.js.org/#/docs/main/master/class/UserStore}
 */
/**
 * @external UserResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/class/UserResolvable}
 */
/**
 * @external Emoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/Emoji}
 */
/**
 * @external ReactionEmoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/ReactionEmoji}
 */
/**
 * @external ReactionCollector
 * @see {@link https://discord.js.org/#/docs/main/master/class/ReactionCollector}
 */
/**
 * @external Webhook
 * @see {@link https://discord.js.org/#/docs/main/master/class/Webhook}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external ShardingManager
 * @see {@link https://discord.js.org/#/docs/main/master/class/ShardingManager}
 */
/**
 * @external Permissions
 * @see {@link https://discord.js.org/#/docs/main/master/class/Permissions}
 */
/**
 * @external PermissionResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/PermissionResolvable}
 */
/**
 * @external Snowflake
 * @see {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake}
 */
/**
 * @external ExecOptions
 * @see {@link https://nodejs.org/dist/latest-v14.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback}
 */
