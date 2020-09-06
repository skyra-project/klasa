const { Serializer } = require('klasa');
const { Role } = require('discord.js');

module.exports = class extends Serializer {
	async validate(data, { entry, language, guild }) {
		if (!guild) throw this.client.languages.default.get('resolverInvalidGuild', entry.key);
		if (data instanceof Role) return data;
		const role = this.constructor.regex.role.test(data)
			? guild.roles.cache.get(this.constructor.regex.role.exec(data)[1])
			: guild.roles.cache.find((rol) => rol.name === data) || null;
		if (role) return role;
		throw language.get('resolverInvalidRole', { name: entry.key });
	}

	serialize(value) {
		return value.id;
	}

	stringify(value, guild) {
		return (
			(guild && guild.roles.get(value)) || {
				name: (value && value.name) || value
			}
		).name;
	}
};
