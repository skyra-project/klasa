const { AliasPiece } = require('@sapphire/pieces');
const { MENTION_REGEX } = require('../util/constants');

/**
 * Base class for all Klasa Arguments. See {@tutorial CreatingArguments} for more information how to use this class
 * to build custom arguments.
 * @tutorial CreatingArguments
 * @extends AliasPiece
 */
class Argument extends AliasPiece {
	/**
	 * The run method to be overwritten in actual Arguments
	 * @since 0.5.0
	 * @param {string} argument The string argument string to resolve
	 * @param {Possible} possible This current usage possible
	 * @param {Message} message The message that triggered the command
	 * @abstract
	 */
	async run() {
		// Defined in extension Classes
		throw new Error(`The run method has not been implemented by ${this.type}:${this.name}.`);
	}

	/**
	 * Checks min and max values
	 * @since 0.5.0
	 * @param {number} value The value to check against
	 * @param {?number} min The minimum value
	 * @param {?number} max The maximum value
	 * @param {Possible} possible The id of the current possible usage
	 * @param {Message} message The message that triggered the command
	 * @param {string} suffix An error suffix
	 * @returns {boolean}
	 * @private
	 */
	static async minOrMax(value, min = null, max = null, possible, message, suffix) {
		suffix = suffix ? await message.resolveKey(suffix) : '';
		if (min !== null && max !== null) {
			if (value >= min && value <= max) return true;
			if (min === max)
				throw await message.resolveKey(possible.inclusive ? 'resolvers:minmaxExactlyInclusive' : 'resolvers:minmaxExactlyExclusive', {
					name: possible.name,
					min,
					suffix
				});
			throw await message.resolveKey(possible.inclusive ? 'resolvers:minmaxBothInclusive' : 'resolvers:minmaxBothExclusive', {
				name: possible.name,
				min,
				max,
				suffix
			});
		} else if (min !== null) {
			if (value >= min) return true;
			throw await message.resolveKey(possible.inclusive ? 'resolvers:minmaxMinInclusive' : 'resolvers:minmaxMinExclusive', {
				name: possible.name,
				min,
				suffix
			});
		} else if (max !== null) {
			if (value <= max) return true;
			throw await message.resolveKey(possible.inclusive ? 'resolvers:minmaxMaxInclusive' : 'resolvers:minmaxMaxExclusive', {
				name: possible.name,
				max,
				suffix
			});
		}
		return true;
	}
}

/**
 * Standard regular expressions for matching mentions and snowflake ids
 * @since 0.5.0
 * @type {Object}
 * @property {RegExp} userOrMember Regex for users or members
 * @property {RegExp} channel Regex for channels
 * @property {RegExp} emoji Regex for custom emojis
 * @property {RegExp} role Regex for roles
 * @property {RegExp} snowflake Regex for simple snowflake ids
 * @static
 */
Argument.regex = MENTION_REGEX;

module.exports = Argument;
