exports.DEFAULTS = {
	CLIENT: {
		commandEditing: false,
		commandLogging: false,
		commandMessageLifetime: 1800,
		noPrefixDM: false,
		prefix: '',
		readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guild${client.guilds.size === 1 ? '' : 's'}.`,
		typing: false,
		customPromptDefaults: {
			time: 30000,
			limit: Infinity,
			quotedStringSupport: false,
			flagSupport: true
		},
		owners: [],
		// eslint-disable-next-line no-process-env
		production: process.env.NODE_ENV === 'production',
		prefixCaseInsensitive: false,
		slowmode: 0,
		slowmodeAggressive: false
	}
};

exports.MENTION_REGEX = {
	userOrMember: /^(?:<@!?)?(\d{17,19})>?$/,
	channel: /^(?:<#)?(\d{17,19})>?$/,
	emoji: /^(?:<a?:\w{2,32}:)?(\d{17,19})>?$/,
	role: /^(?:<@&)?(\d{17,19})>?$/,
	snowflake: /^(\d{17,19})$/
};
