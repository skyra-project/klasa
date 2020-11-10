const { Extendable } = require('klasa');
const { User, TextChannel, DMChannel, APIMessage } = require('discord.js');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, { appliesTo: [User, TextChannel, DMChannel] });
	}

	sendCode(code, content, options = {}) {
		return this.send(APIMessage.transformOptions(content, options, { code }));
	}

	sendEmbed(embed, content, options = {}) {
		return this.send(APIMessage.transformOptions(content, options, { embed }));
	}

	sendFile(attachment, name, content, options = {}) {
		return this.send(
			APIMessage.transformOptions(content, options, {
				files: [{ attachment, name }]
			})
		);
	}

	sendFiles(files, content, options = {}) {
		return this.send(APIMessage.transformOptions(content, options, { files }));
	}

	async sendLocale(key, args = [], options = {}) {
		if (!Array.isArray(args)) [options, args] = [args, []];
		return this.send(APIMessage.transformOptions(await this.fetchLocale(key, ...args), undefined, options));
	}

	sendMessage(content, options) {
		return this.send(content, options);
	}

	/**
	 * Retrieves the localized message.
	 * @since 0.5.0
	 * @param {string} key The Language key to send
	 * @param {Array<*>} [localeArgs] The language arguments to pass
	 * @returns {Promise<string>}
	 */
	async fetchLocale(key, ...localeArgs) {
		const languageKey = await this.client.fetchLanguage({ channel: this, guild: this.guild || null });
		const language = this.client.languages.get(languageKey);
		if (!language) throw new Error(`The language '${language}' is not available.`);

		return language.get(key, ...localeArgs);
	}
};
