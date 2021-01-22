const { bgBlue, bgRed, bgGreen, bgMagenta, bgYellow, black, bgCyan } = require('colorette');
const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context, { event: 'commandSuccess' });
		this.enabled = this.context.client.options.commandLogging;
		this.reprompted = [bgBlue, bgRed];
		this.channel = {
			text: bgGreen,
			dm: bgMagenta
		};
	}

	run(message, command, response, timer) {
		const { type } = message.channel;
		const shard = message.guild ? message.guild.shardID : 0;
		this.context.client.logger.debug(
			'log',
			[
				black(bgCyan(`[${shard}]`)),
				`${command.name}(${message.args ? message.args.join(', ') : ''})`,
				this.reprompted[Number(message.reprompted)](`[${timer.stop()}]`),
				black(bgYellow(`${message.author.username}[${message.author.id}]`)),
				this.channel[type](this[type](message))
			].join(' ')
		);
	}

	text(message) {
		return `${message.guild.name}[${message.guild.id}]`;
	}

	dm() {
		return 'Direct Messages';
	}
};
