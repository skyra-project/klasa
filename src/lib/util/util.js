const { promisify } = require('util');
const { exec } = require('child_process');
const { Guild, GuildMember, GuildChannel, Message } = require('discord.js');

const zws = String.fromCharCode(8203);
let sensitivePattern;
const TOTITLECASE = /[A-Za-zÀ-ÖØ-öø-ÿ]\S*/g;
const REGEXPESC = /[-/\\^$*+?.()|[\]{}]/g;

/**
 * Contains static methods to be used throughout klasa
 */
class Util {
	/**
	 * @typedef {(external:Guild|external:Message|external:GuildChannel)} GuildResolvable
	 */

	/**
	 * This class may not be initiated with new
	 * @since 0.0.1
	 * @throws {Error}
	 * @private
	 */
	constructor() {
		throw new Error('This class may not be initiated with new');
	}

	/**
	 * Cleans a string from regex injection
	 * @since 0.0.1
	 * @param {string} str The string to clean
	 * @returns {string}
	 */
	static regExpEsc(str) {
		return str.replace(REGEXPESC, '\\$&');
	}
}

module.exports = Util;
