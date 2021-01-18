const { Colors, Event } = require('klasa');

module.exports = class extends Event {
	constructor(context) {
		super(context, { event: 'commandSuccess' });
		this.enabled = this.context.client.options.commandLogging;
		this.reprompted = [new Colors({ background: 'blue' }), new Colors({ background: 'red' })];
		this.user = new Colors({ background: 'yellow', text: 'black' });
		this.shard = new Colors({ background: 'cyan', text: 'black' });
		this.channel = {
			text: new Colors({ background: 'green', text: 'black' }),
			dm: new Colors({ background: 'magenta' })
		};
	}

	run(message, command, response, timer) {
		const { type } = message.channel;
		const shard = message.guild ? message.guild.shardID : 0;
		this.context.client.emit(
			'log',
			[
				this.shard.format(`[${shard}]`),
				`${command.name}(${message.args ? message.args.join(', ') : ''})`,
				this.reprompted[Number(message.reprompted)].format(`[${timer.stop()}]`),
				this.user.format(`${message.author.username}[${message.author.id}]`),
				this.channel[type].format(this[type](message))
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
