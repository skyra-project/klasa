/// <reference types="node" />

declare module 'klasa' {
	import { AliasPiece, AliasPieceOptions, AliasStore, Piece, PieceContext, PieceOptions, Store } from '@sapphire/pieces';
	import {
		APIMessage,
		Client,
		ClientOptions,
		Collection,
		DMChannel,
		Message,
		MessageAdditions,
		MessageOptions,
		PermissionResolvable,
		Permissions,
		Snowflake,
		StringResolvable,
		TextChannel,
		User
	} from 'discord.js';

	export const version: string;

	export {
		AliasPiece,
		AliasPieceOptions,
		AliasStore,
		Awaited,
		LoaderError,
		MissingExportsError,
		Piece,
		PieceContext,
		PieceOptions,
		Store,
		StoreOptions
	} from '@sapphire/pieces';
	export { KlasaClient as Client };

	// #region Classes

	export class KlasaClient extends Client {
		public constructor(options?: ClientOptions);
		public login(token?: string): Promise<string>;
		private validatePermissionLevels(): PermissionLevels;

		public sweepMessages(lifetime?: number, commandLifeTime?: number): number;
		public static basePermissions: Permissions;
		public static defaultPermissionLevels: PermissionLevels;
	}

	export interface ClientLoggerOptions {
		level?: LogLevel;
		instance?: ILogger;
	}

	// #region Extensions

	export interface CachedPrefix {
		regex: RegExp;
		length: number;
	}

	// #endregion Extensions

	// #region Permissions

	export class PermissionLevels extends Collection<number, PermissionLevel> {
		public constructor(levels?: number);

		public add(level: number, check: (message: Message) => boolean | Promise<boolean>, options?: PermissionLevelOptions): this;
		public debug(): string;
		public isValid(): boolean;
		public remove(level: number): this;
		public set(level: number, obj: PermissionLevelOptions | symbol): this;

		public run(message: Message, min: number): Promise<PermissionLevelsData>;
	}

	// #region Pieces

	export abstract class Argument extends AliasPiece {
		public constructor(context: PieceContext, options?: ArgumentOptions);
		public aliases: string[];
		public abstract run(arg: string | undefined, possible: Possible, message: Message): any;
		public static regex: MentionRegex;
		protected static minOrMax(value: number, min: number, max: number, possible: Possible, message: Message, suffix: string): Promise<boolean>;
	}

	export abstract class Command extends AliasPiece {
		public constructor(context: PieceContext, options?: CommandOptions);
		public readonly bucket: number;
		public readonly category: string;
		public readonly cooldown: number;
		public readonly subCategory: string;
		public readonly usageDelim: string | null;
		public readonly usageString: string;
		public aliases: string[];
		public requiredPermissions: Permissions;
		public cooldownLevel: 'author' | 'channel' | 'guild';
		public flagSupport: boolean;
		public fullCategory: string[];
		public guarded: boolean;
		public hidden: boolean;
		public nsfw: boolean;
		public permissionLevel: number;
		public promptLimit: number;
		public promptTime: number;
		public quotedStringSupport: boolean;
		public runIn: string[];
		public subcommands: boolean;
		public usage: CommandUsage;

		public createCustomResolver(type: string, resolver: ArgResolverCustomMethod): this;
		public customizeResponse(name: string, response: string | ((message: Message, possible: Possible) => PromiseLike<string> | string)): this;

		public definePrompt(usageString: string, usageDelim?: string): Usage;
		public run(message: Message, params: any[]): Promise<Message | Message[] | null>;
		public toJSON(): object;
	}

	export abstract class Event extends Piece {
		public constructor(context: PieceContext, options?: EventOptions);
		public emitter: NodeJS.EventEmitter;
		public event: string;
		public once: boolean;
		private _listener: Function;

		public abstract run(...params: any[]): void;
		public toJSON(): object;

		private _run(param: any): void;
		private _runOnce(...args: any[]): Promise<void>;
		private _listen(): void;
		private _unlisten(): void;
	}

	export abstract class Inhibitor extends Piece {
		public constructor(context: PieceContext, options?: InhibitorOptions);
		public spamProtection: boolean;
		public abstract run(message: Message, command: Command): void | boolean | string | Promise<void | boolean | string>;
		public toJSON(): object;
		protected _run(message: Message, command: Command): Promise<boolean | string>;
	}

	export abstract class MultiArgument extends Argument {
		public abstract readonly base: Argument;
		public run<T = any>(argument: string, possible: Possible, message: Message): Promise<Array<T>>;
	}

	// #endregion Pieces

	// #region Stores

	export class ArgumentStore extends AliasStore<Argument> {}

	export class CommandStore extends AliasStore<Command> {}

	export class EventStore extends Store<Event> {
		private _onceEvents: Set<string>;
	}

	export class InhibitorStore extends Store<Inhibitor> {
		public run(message: Message, command: Command, selective?: boolean): Promise<void>;
	}

	// #endregion Stores

	// #region Usage

	export class CommandPrompt extends TextPrompt {
		public constructor(message: Message, usage: CommandUsage, options: TextPromptOptions);
		private typing: boolean;

		public run<T = any[]>(): Promise<T>;
		private static generateNewDelim(delim: string): RegExp;
		private static delims: Map<string, RegExp>;
	}

	export class CommandUsage extends Usage {
		public constructor(client: Client, usageString: string, usageDelim: string | null, command: Command);
		public names: string[];
		public commands: string;
		public nearlyFullUsage: string;

		public createPrompt(message: Message, options?: TextPromptOptions): CommandPrompt;
		public fullUsage(message: Message): string;
		public toString(): string;
	}

	export class Possible {
		public constructor([match, name, type, min, max, regex, flags]: [string, string, string, string, string, string, string]);
		public name: string;
		public type: string;
		public min: number;
		public max: number;
		public regex: RegExp;

		private static resolveLimit(limit: string, type: string, limitType: string): number;
	}

	export class Tag {
		public constructor(members: string, count: number, required: number);
		public required: number;
		public possibles: Possible[];
		public response: string | ((message: Message) => string);

		private register(name: string, response: ArgResolverCustomMethod): boolean;
		private static pattern: RegExp;
		private static parseMembers(members: string, count: number): Possible[];
		private static parseTrueMembers(members: string): string[];
	}

	export class TextPrompt {
		public constructor(message: Message, usage: Usage, options?: TextPromptOptions);
		public readonly client: Client;
		public message: Message;
		public target: User;
		public channel: TextChannel | DMChannel;
		public usage: Usage | CommandUsage;
		public reprompted: boolean;
		public flags: Record<string, string>;
		public args: string[];
		public params: any[];
		public time: number;
		public limit: number;
		public quotedStringSupport: boolean;
		public responses: Collection<string, Message>;
		private _repeat: boolean;
		private _required: number;
		private _prompted: number;
		private _currentUsage: Tag;

		public run<T = any[]>(prompt: StringResolvable | MessageOptions | MessageAdditions | APIMessage): Promise<T>;
		private prompt(text: string): Promise<Message>;
		private reprompt(prompt: string): Promise<any[]>;
		private repeatingPrompt(): Promise<any[]>;
		private validateArgs(): Promise<any[]>;
		private multiPossibles(index: number): Promise<any[]>;
		private pushParam(param: any): any[];
		private handleError(err: string): Promise<any[]>;
		private finalize(): any[];
		private _setup(original: string): void;

		private static getFlags(content: string, delim: string): { content: string; flags: Record<string, string> };
		private static getArgs(content: string, delim: string): string[];
		private static getQuotedStringArgs(content: string, delim: string): string[];

		public static readonly flagRegex: RegExp;
	}

	export class Usage {
		public constructor(client: Client, usageString: string, usageDelim: string | null);
		public readonly client: Client;
		public deliminatedUsage: string;
		public usageString: string;
		public usageDelim: string | null;
		public parsedUsage: Tag[];
		public customResolvers: Record<string, ArgResolverCustomMethod>;

		public createCustomResolver(type: string, resolver: ArgResolverCustomMethod): this;
		public customizeResponse(name: string, response: (message: Message) => string): this;
		public createPrompt(message: Message, options?: TextPromptOptions): TextPrompt;
		public toJSON(): Tag[];
		public toString(): string;

		private static parseUsage(usageString: string): Tag[];
		private static tagOpen(usage: Record<string, any>, char: string): void;
		private static tagClose(usage: Record<string, any>, char: string): void;
		private static tagSpace(usage: Record<string, any>, char: string): void;
	}

	// #endregion Usage

	// #region Util

	export const constants: Constants;

	export class RateLimit {
		public constructor(bucket: number, cooldown: number);
		public readonly expired: boolean;
		public readonly limited: boolean;
		public readonly remainingTime: number;
		public bucket: number;
		public cooldown: number;
		private remaining: number;
		private time: number;
		public drip(): this;
		public reset(): this;
		public resetRemaining(): this;
		public resetTime(): this;
	}

	export class RateLimitManager<K = Snowflake> extends Collection<K, RateLimit> {
		public constructor(bucket: number, cooldown: number);
		public bucket: number;
		public cooldown: number;
		private _bucket: number;
		private _cooldown: number;
		private sweepInterval: NodeJS.Timer | null;
		public acquire(id: K): RateLimit;
		public create(id: K): RateLimit;
	}

	// #endregion Util

	// #endregion Classes

	// #region Typedefs

	export interface CustomPromptDefaults {
		limit?: number;
		time?: number;
		quotedStringSupport?: boolean;
	}

	export type ReadyMessage = string | ((client: Client) => string);

	// Parsers
	export interface ArgResolverCustomMethod {
		(arg: string, possible: Possible, message: Message, params: any[]): any;
	}

	export interface Constants {
		DEFAULTS: ConstantsDefaults;
		MENTION_REGEX: MentionRegex;
	}

	export interface ConstantsDefaults {
		CLIENT: Required<ClientOptions>;
	}

	// Permissions
	export interface PermissionLevel {
		break: boolean;
		check: (message: Message) => Promise<boolean> | boolean;
		fetch: boolean;
	}

	export interface PermissionLevelOptions {
		break?: boolean;
		fetch?: boolean;
	}

	export interface PermissionLevelsData {
		broke: boolean;
		permission: boolean;
	}

	// Structures
	export interface ArgumentOptions extends AliasPieceOptions {}

	export interface CommandOptions extends AliasPieceOptions {
		autoAliases?: boolean;
		requiredPermissions?: PermissionResolvable;
		bucket?: number;
		cooldown?: number;
		cooldownLevel?: 'author' | 'channel' | 'guild';
		flagSupport?: boolean;
		guarded?: boolean;
		hidden?: boolean;
		nsfw?: boolean;
		permissionLevel?: number;
		promptLimit?: number;
		promptTime?: number;
		quotedStringSupport?: boolean;
		runIn?: Array<'text' | 'dm'>;
		subcommands?: boolean;
		usage?: string;
		usageDelim?: string;
	}

	export interface InhibitorOptions extends PieceOptions {
		spamProtection?: boolean;
	}

	export interface EventOptions extends PieceOptions {
		emitter?: NodeJS.EventEmitter | FilterKeyInstances<Client, NodeJS.EventEmitter>;
		event?: string;
		once?: boolean;
	}

	export interface PieceJSON {
		enabled: boolean;
		name: string;
	}

	export interface AliasPieceJSON extends PieceJSON {
		aliases: string[];
	}

	export interface OriginalPropertyDescriptors {
		staticPropertyDescriptors: PropertyDescriptorMap;
		instancePropertyDescriptors: PropertyDescriptorMap;
	}

	// Usage
	export interface TextPromptOptions {
		channel?: TextChannel | DMChannel;
		limit?: number;
		quotedStringSupport?: boolean;
		target?: User;
		time?: number;
		flagSupport?: boolean;
	}

	// Util
	export interface MentionRegex {
		userOrMember: RegExp;
		channel: RegExp;
		emoji: RegExp;
		role: RegExp;
		snowflake: RegExp;
	}

	/**
	 * The logger levels for the [[ILogger]].
	 */
	export const enum LogLevel {
		/**
		 * The lowest log level, used when calling [[ILogger.trace]].
		 */
		Trace = 10,

		/**
		 * The debug level, used when calling [[ILogger.debug]].
		 */
		Debug = 20,

		/**
		 * The info level, used when calling [[ILogger.info]].
		 */
		Info = 30,

		/**
		 * The warning level, used when calling [[ILogger.warn]].
		 */
		Warn = 40,

		/**
		 * The error level, used when calling [[ILogger.error]].
		 */
		Error = 50,

		/**
		 * The critical level, used when calling [[ILogger.fatal]].
		 */
		Fatal = 60,

		/**
		 * An unknown or uncategorized level.
		 */
		None = 100
	}

	export interface ILogger {
		level: LogLevel;
		/**
		 * Alias of [[ILogger.write]] with [[LogLevel.Trace]] as level.
		 * @param values The values to log.
		 */
		trace(...values: readonly unknown[]): void;

		/**
		 * Alias of [[ILogger.write]] with [[LogLevel.Debug]] as level.
		 * @param values The values to log.
		 */
		debug(...values: readonly unknown[]): void;

		/**
		 * Alias of [[ILogger.write]] with [[LogLevel.Info]] as level.
		 * @param values The values to log.
		 */
		info(...values: readonly unknown[]): void;

		/**
		 * Alias of [[ILogger.write]] with [[LogLevel.Warn]] as level.
		 * @param values The values to log.
		 */
		warn(...values: readonly unknown[]): void;

		/**
		 * Alias of [[ILogger.write]] with [[LogLevel.Error]] as level.
		 * @param values The values to log.
		 */
		error(...values: readonly unknown[]): void;

		/**
		 * Alias of [[ILogger.write]] with [[LogLevel.Fatal]] as level.
		 * @param values The values to log.
		 */
		fatal(...values: readonly unknown[]): void;

		/**
		 * Writes the log message given a level and the value(s).
		 * @param level The log level.
		 * @param values The values to log.
		 */
		write(level: LogLevel, ...values: readonly unknown[]): void;
	}

	export abstract class Logger implements ILogger {
		public level: LogLevel;
		public constructor(level: LogLevel);
		public abstract trace(...values: readonly unknown[]): void;
		public abstract debug(...values: readonly unknown[]): void;
		public abstract info(...values: readonly unknown[]): void;
		public abstract warn(...values: readonly unknown[]): void;
		public abstract error(...values: readonly unknown[]): void;
		public abstract fatal(...values: readonly unknown[]): void;
		public abstract write(level: LogLevel, ...values: readonly unknown[]): void;
		protected static readonly levels: Map<LogLevel, LogMethods>;
	}

	export type LogMethods = 'trace' | 'debug' | 'info' | 'warn' | 'error';

	// Based on the built-in `Pick<>` generic
	type ValueOf<T> = T[keyof T];
	type FilterKeyInstances<O, T> = ValueOf<
		{
			[K in keyof O]: O[K] extends T ? K : never;
		}
	>;

	module 'discord.js' {
		export interface Client {
			constructor: typeof Client;
			readonly invite: string;
			readonly owners: Set<User>;
			options: Required<ClientOptions>;
			logger: ILogger;
			userBaseDirectory: string;
			arguments: ArgumentStore;
			commands: CommandStore;
			inhibitors: InhibitorStore;
			events: EventStore;
			stores: Set<Store<Piece>>;
			permissionLevels: PermissionLevels;
			application: ClientApplication;
			ready: boolean;
			mentionPrefix: RegExp | null;
			registerStore<V extends Piece>(store: Store<V>): this;
			deregisterStore<V extends Piece>(store: Store<V>): this;
			sweepMessages(lifetime?: number, commandLifeTime?: number): number;
			fetchPrefix(message: Message): Promise<string | readonly string[] | null> | string | readonly string[] | null;
			on(event: 'argumentError', listener: (message: Message, command: Command, params: any[], error: string) => void): this;
			on(event: 'commandError', listener: (message: Message, command: Command, params: any[], error: Error | string) => void): this;
			on(event: 'commandInhibited', listener: (message: Message, command: Command, response: string | Error) => void): this;
			on(event: 'commandRun', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			on(event: 'commandSuccess', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			on(event: 'commandUnknown', listener: (message: Message, command: string, prefix: RegExp, prefixLength: number) => void): this;
			on(event: 'klasaReady', listener: () => void): this;
			once(event: 'argumentError', listener: (message: Message, command: Command, params: any[], error: string) => void): this;
			once(event: 'commandError', listener: (message: Message, command: Command, params: any[], error: Error | string) => void): this;
			once(event: 'commandInhibited', listener: (message: Message, command: Command, response: string | Error) => void): this;
			once(event: 'commandRun', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			once(event: 'commandSuccess', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			once(event: 'commandUnknown', listener: (message: Message, command: string, prefix: RegExp, prefixLength: number) => void): this;
			once(event: 'klasaReady', listener: () => void): this;
			off(event: 'argumentError', listener: (message: Message, command: Command, params: any[], error: string) => void): this;
			off(event: 'commandError', listener: (message: Message, command: Command, params: any[], error: Error | string) => void): this;
			off(event: 'commandInhibited', listener: (message: Message, command: Command, response: string | Error) => void): this;
			off(event: 'commandRun', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			off(event: 'commandSuccess', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			off(event: 'commandUnknown', listener: (message: Message, command: string, prefix: RegExp, prefixLength: number) => void): this;
			off(event: 'klasaReady', listener: () => void): this;
		}

		export interface Message {
			command: Command | null;
			commandText: string | null;
			prefix: RegExp | null;
			prefixLength: number | null;
			prompter: CommandPrompt | null;
			readonly args: string[];
			readonly params: any[];
			readonly flagArgs: Record<string, string>;
			readonly reprompted: boolean;
			readonly reactable: boolean;
			parseCommand(): Promise<void>;
			usableCommands(): Promise<Collection<string, Command>>;
			hasAtLeastPermissionLevel(min: number): Promise<boolean>;
		}

		export interface ClientOptions {
			commandEditing?: boolean;
			commandLogging?: boolean;
			logger?: ClientLoggerOptions;
			commandMessageLifetime?: number;
			customPromptDefaults?: CustomPromptDefaults;
			noPrefixDM?: boolean;
			owners?: string[];
			permissionLevels?: PermissionLevels;
			prefix?: string | string[];
			prefixCaseInsensitive?: boolean;
			production?: boolean;
			readyMessage?: ReadyMessage;
			regexPrefix?: RegExp;
			slowmode?: number;
			slowmodeAggressive?: boolean;
			typing?: boolean;
		}
	}

	module '@sapphire/pieces' {
		interface PieceContextExtras {
			client: Client;
		}
	}

	// #endregion
}
