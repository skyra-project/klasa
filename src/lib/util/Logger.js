export class Logger {
	level;

	constructor(level) {
		this.level = level;
	}

	trace(...values) {
		this.write(10, ...values);
	}

	debug(...values) {
		this.write(20, ...values);
	}

	info(...values) {
		this.write(30, ...values);
	}

	warn(...values) {
		this.write(40, ...values);
	}

	error(...values) {
		this.write(50, ...values);
	}

	fatal(...values) {
		this.write(60, ...values);
	}

	write(level, ...values) {
		if (level < this.level) return;
		const method = Logger.levels.get(level);
		if (typeof method === 'string') console[method](...values);
	}

	static levels = new Map([
		[10, 'trace'],
		[20, 'debug'],
		[30, 'info'],
		[40, 'warn'],
		[50, 'error'],
		[60, 'error']
	]);
}
