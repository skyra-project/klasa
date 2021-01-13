/// <reference types="node" />

declare module 'klasa' {
	import { ExecOptions } from 'child_process';
	import {
		APIMessage,
		Client,
		ClientOptions,
		Collection,
		DMChannel,
		EmojiResolvable,
		Guild,
		GuildResolvable,
		Message,
		MessageAdditions,
		MessageEmbed,
		MessageOptions,
		MessageReaction,
		MessageType,
		PermissionResolvable,
		Permissions,
		ReactionCollector,
		Snowflake,
		StringResolvable,
		TextChannel,
		User
	} from 'discord.js';

	export const version: string;

	// #region Classes

	export class KlasaClient extends Client {
		public constructor(options?: ClientOptions);
		public login(token?: string): Promise<string>;
		private validatePermissionLevels(): PermissionLevels;

		public sweepMessages(lifetime?: number, commandLifeTime?: number): number;
		public static basePermissions: Permissions;
		public static defaultPermissionLevels: PermissionLevels;
		public static plugin: symbol;
		public static use(mod: any): typeof KlasaClient;
	}

	export { KlasaClient as Client };
	export { Util as util };

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

	export abstract class Piece {
		public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string, options?: PieceOptions);
		public readonly client: KlasaClient;
		public readonly type: string;
		public readonly path: string;
		public file: string[];
		public name: string;
		public enabled: boolean;
		public store: Store<string, this>;
		public directory: string;

		public reload(): Promise<this>;
		public unload(): void;
		public enable(): this;
		public disable(): this;
		public init(): Promise<any>;
		public toJSON(): PieceJSON;
		public toString(): string;
	}

	export abstract class AliasPiece extends Piece {
		public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string, options?: AliasPieceOptions);
		public aliases: Array<string>;
		public toJSON(): AliasPieceJSON;
	}

	export abstract class Argument extends AliasPiece {
		public constructor(store: ArgumentStore, file: string[], directory: string, options?: ArgumentOptions);
		public aliases: string[];
		public abstract run(arg: string | undefined, possible: Possible, message: Message): any;
		public static regex: MentionRegex;
		private static minOrMax(
			client: KlasaClient,
			value: number,
			min: number,
			max: number,
			possible: Possible,
			message: Message,
			suffix: string
		): Promise<boolean>;
	}

	export abstract class Command extends AliasPiece {
		public constructor(store: CommandStore, file: string[], directory: string, options?: CommandOptions);
		public readonly bucket: number;
		public readonly category: string;
		public readonly cooldown: number;
		public readonly subCategory: string;
		public readonly usageDelim: string | null;
		public readonly usageString: string;
		public aliases: string[];
		public requiredPermissions: Permissions;
		public cooldownLevel: 'author' | 'channel' | 'guild';
		public deletable: boolean;
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
		public toJSON(): PieceCommandJSON;
	}

	export abstract class Event extends Piece {
		public constructor(store: EventStore, file: string[], directory: string, options?: EventOptions);
		public emitter: NodeJS.EventEmitter;
		public event: string;
		public once: boolean;
		private _listener: Function;

		public abstract run(...params: any[]): void;
		public toJSON(): PieceEventJSON;

		private _run(param: any): void;
		private _runOnce(...args: any[]): Promise<void>;
		private _listen(): void;
		private _unlisten(): void;
	}

	export abstract class Inhibitor extends Piece {
		public constructor(store: InhibitorStore, file: string[], directory: string, options?: InhibitorOptions);
		public spamProtection: boolean;
		public abstract run(message: Message, command: Command): void | boolean | string | Promise<void | boolean | string>;
		public toJSON(): PieceInhibitorJSON;
		protected _run(message: Message, command: Command): Promise<boolean | string>;
	}

	export abstract class Monitor extends Piece {
		public constructor(store: MonitorStore, file: string[], directory: string, options?: MonitorOptions);
		public allowedTypes: MessageType[];
		public ignoreBots: boolean;
		public ignoreEdits: boolean;
		public ignoreOthers: boolean;
		public ignoreSelf: boolean;
		public ignoreWebhooks: boolean;

		public abstract run(message: Message): void;
		public shouldRun(message: Message): boolean;
		public toJSON(): PieceMonitorJSON;
		protected _run(message: Message): Promise<void>;
	}

	export abstract class MultiArgument extends Argument {
		public abstract readonly base: Argument;
		public run<T = any>(argument: string, possible: Possible, message: Message): Promise<Array<T>>;
	}

	// #endregion Pieces

	// #region Stores

	export abstract class Store<K, V extends Piece, VConstructor = Constructor<V>> extends Collection<K, V> {
		public constructor(client: KlasaClient, name: string, holds: VConstructor);
		public readonly client: KlasaClient;
		public readonly holds: VConstructor;
		public readonly name: string;
		public readonly userDirectory: string;
		public readonly coreDirectories: Set<string>;

		protected registerCoreDirectory(directory: string): this;
		public delete(name: K | V): boolean;
		public get(key: K): V | undefined;
		public get<T extends V>(key: K): T | undefined;
		public init(): Promise<any[]>;
		public load(directory: string, file: string[]): V;
		public loadAll(): Promise<number>;
		public resolve(name: V | string): V;
		public set<T extends V>(key: K, value: T): this;
		public set(piece: V): V;
		public toString(): string;

		private static walk<K, V extends Piece, T extends Store<K, V>>(store: T, coreDirectory?: string): Promise<Array<Piece>>;
	}

	export abstract class AliasStore<K, V extends Piece, VConstructor = Constructor<V>> extends Store<K, V, VConstructor> {
		public aliases: Collection<K, V>;
	}

	export class ArgumentStore extends AliasStore<string, Argument, typeof Argument> {}

	export class CommandStore extends AliasStore<string, Command, typeof Command> {}

	export class EventStore extends Store<string, Event, typeof Event> {
		private _onceEvents: Set<string>;
	}

	export class InhibitorStore extends Store<string, Inhibitor, typeof Inhibitor> {
		public run(message: Message, command: Command, selective?: boolean): Promise<void>;
	}

	export class MonitorStore extends Store<string, Monitor, typeof Monitor> {
		public run(message: Message): Promise<void>;
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
		public constructor(client: KlasaClient, usageString: string, usageDelim: string | null, command: Command);
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
		public readonly client: KlasaClient;
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
		public constructor(client: KlasaClient, usageString: string, usageDelim: string | null);
		public readonly client: KlasaClient;
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

	export class Colors {
		public constructor(options?: ColorsFormatOptions);
		public opening: string;
		public closing: string;

		public format(input: string): string;
		public static useColors: boolean | null;
		public static CLOSE: typeof ColorsClose;
		public static STYLES: typeof ColorsStyleTypes;
		public static TEXTS: typeof ColorsTexts;
		public static BACKGROUNDS: typeof ColorsBackgrounds;
		public static hexToRGB(hex: string): number[];
		public static hueToRGB(p: number, q: number, t: number): number;
		public static hslToRGB([h, s, l]: [number | string, number | string, number | string]): number[];
		public static formatArray([pos1, pos2, pos3]: [number | string, number | string, number | string]): string;

		private static style(styles: string | string[], data?: ColorsFormatData): ColorsFormatData;
		private static background(style: ColorsFormatType, data?: ColorsFormatData): ColorsFormatData;
		private static text(style: ColorsFormatType, data?: ColorsFormatData): ColorsFormatData;
	}

	export const constants: Constants;

	export class Cron {
		public constructor(cron: string);
		public next(zDay?: Date, origin?: boolean): Date;

		private static _normalize(cron: string): string;
		private static _parseString(cron: string): number[][];
		private static _parsePart(cronPart: string, id: number): number[];
		private static _range(min: number, max: number, step: number): number[];
	}

	export class Duration {
		public constructor(pattern: string);
		public offset: number;
		public readonly fromNow: Date;

		public dateFrom(date: Date): Date;

		public static toNow(earlier: Date | number | string, showIn?: boolean): string;

		private static regex: RegExp;
		private static commas: RegExp;
		private static aan: RegExp;

		private static _parse(pattern: string): number;
	}

	export class KlasaConsole {
		private constructor(options?: ConsoleOptions);
		public readonly stdout: NodeJS.WritableStream;
		public readonly stderr: NodeJS.WritableStream;
		public template: Timestamp | null;
		public colors: ConsoleColorStyles;
		public utc: boolean;

		private readonly timestamp: string;

		private write(data: any[], type?: string): void;

		public log(...data: any[]): void;
		public warn(...data: any[]): void;
		public error(...data: any[]): void;
		public debug(...data: any[]): void;
		public verbose(...data: any[]): void;
		public wtf(...data: any[]): void;

		private static _flatten(data: any): string;
	}

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

	export class ReactionHandler extends ReactionCollector {
		public constructor(
			message: Message,
			filter: Function,
			options: ReactionHandlerOptions,
			display: RichDisplay | RichMenu,
			emojis: EmojiResolvable[]
		);

		public display: RichDisplay | RichMenu;
		public methodMap: Map<string, EmojiResolvable>;
		public currentPage: number;
		public prompt: string;
		public time: number;
		public awaiting: boolean;
		public selection: Promise<number>;
		public reactionsDone: boolean;

		public first(): void;
		public back(): void;
		public forward(): void;
		public last(): void;
		public jump(): Promise<void>;
		public info(): void;
		public stop(): void;
		public zero(): void;
		public one(): void;
		public two(): void;
		public three(): void;
		public four(): void;
		public five(): void;
		public six(): void;
		public seven(): void;
		public eight(): void;
		public nine(): void;
		public update(): void;

		private _queueEmojiReactions(emojis: EmojiResolvable[]): Promise<null>;
	}

	export class RichDisplay {
		public constructor(embed?: MessageEmbed);
		public embedTemplate: MessageEmbed;
		public pages: MessageEmbed[];
		public infoPage: MessageEmbed | null;
		public emojis: RichDisplayEmojisObject;
		public footered: boolean;
		public footerPrefix: string;
		public footerSuffix: string;
		public readonly template: MessageEmbed;

		public setEmojis(emojis: RichDisplayEmojisObject): this;
		public setFooterPrefix(prefix: string): this;
		public setFooterSuffix(suffix: string): this;
		public useCustomFooters(): this;
		public addPage(embed: MessageEmbed | ((template: MessageEmbed) => MessageEmbed)): this;
		public setInfoPage(embed: MessageEmbed): RichDisplay;
		public run(message: Message, options?: RichDisplayRunOptions): Promise<ReactionHandler>;

		protected _determineEmojis(emojis: EmojiResolvable[], stop: boolean, jump: boolean, firstLast: boolean): EmojiResolvable[];
		private _footer(): void;
		private _handlePageGeneration(cb: Function | MessageEmbed): MessageEmbed;
	}

	export class RichMenu extends RichDisplay {
		public constructor(embed?: MessageEmbed);
		public emojis: RichMenuEmojisObject;
		public paginated: boolean;
		public options: MenuOptions[];

		public addOption(name: string, body: string, inline?: boolean): RichMenu;
		public run(message: Message, options?: RichMenuRunOptions): Promise<ReactionHandler>;

		protected _determineEmojis(emojis: EmojiResolvable[], stop: boolean): EmojiResolvable[];
		private _paginate(): void;
	}

	export class Stopwatch {
		public constructor(digits?: number);
		public digits: number;
		private _start: number;
		private _end: number | null;

		public readonly duration: number;
		public readonly running: boolean;
		public restart(): this;
		public reset(): this;
		public start(): this;
		public stop(): this;
		public toString(): string;
	}

	export class Timestamp {
		public constructor(pattern: string);
		public pattern: string;
		private _template: TimestampObject[];

		public display(time?: Date | number | string): string;
		public displayUTC(time?: Date | number | string): string;
		public edit(pattern: string): this;

		public static timezoneOffset: number;
		public static utc(time?: Date | number | string): Date;
		public static displayArbitrary(pattern: string, time?: Date | number | string): string;
		private static _resolveDate(time: Date | number | string): Date;
		private static _display(template: string, time: Date | number | string): string;
		private static _patch(pattern: string): TimestampObject[];
	}

	export class Type {
		public constructor(value: any, parent?: Type);

		public value: any;
		public is: string;

		private parent: Type | null;
		private childKeys: Map<string, Type>;
		private childValues: Map<string, Type>;

		private readonly childTypes: string;

		public toString(): string;

		private addValue(value: any): void;
		private addEntry(entry: [string, any]): void;
		private parents(): Iterator<Type>;
		private check(): void;
		private isCircular(): boolean;

		public static resolve(value: any): string;

		private static list(values: Map<string, Type>): string;
	}

	class Util {
		public static arrayFromObject<T = any>(obj: Record<string, any>, prefix?: string): Array<T>;
		public static arraysStrictEquals(arr1: any[], arr2: any[]): boolean;
		public static chunk<T>(entries: T[], chunkSize: number): Array<T[]>;
		public static clean(text: string): string;
		public static codeBlock(lang: string, expression: string | number | Stringifible): string;
		public static deepClone<T = any>(source: T): T;
		public static exec(exec: string, options?: ExecOptions): Promise<{ stdout: string; stderr: string }>;
		public static getTypeName(input: any): string;
		public static isClass(input: any): input is Constructor<any>;
		public static isFunction(input: any): input is Function;
		public static isNumber(input: any): input is number;
		public static isObject(input: any): boolean;
		public static isPrimitive(input: any): input is string | number | boolean;
		public static isThenable(input: any): boolean;
		public static makeObject<T = Record<string, any>, S = Record<string, any>>(path: string, value: any, obj?: Record<string, any>): T & S;
		public static mergeDefault<T = Record<string, any>, S = Record<string, any>>(objDefaults: T, objSource: S): T & S;
		public static mergeObjects<T = Record<string, any>, S = Record<string, any>>(objTarget: T, objSource: S): T & S;
		public static objectToTuples(obj: Record<string, any>): Array<[string, any]>;
		public static regExpEsc(str: string): string;
		public static sleep<T = any>(delay: number, args?: T): Promise<T>;
		public static toTitleCase(str: string): string;
		public static tryParse<T = Record<string, any>>(value: string): T | string;
		public static resolveGuild(client: KlasaClient, guild: GuildResolvable): Guild;
		private static initClean(client: KlasaClient): void;

		public static titleCaseVariants: TitleCaseVariants;
		public static PRIMITIVE_TYPES: string[];
	}

	// #endregion Util

	// #endregion Classes

	// #region Typedefs

	export interface CustomPromptDefaults {
		limit?: number;
		time?: number;
		quotedStringSupport?: boolean;
	}

	export interface PieceDefaults {
		arguments?: ArgumentOptions;
		commands?: CommandOptions;
		events?: EventOptions;
		inhibitors?: InhibitorOptions;
		monitors?: MonitorOptions;
	}

	export type ReadyMessage = string | ((client: KlasaClient) => string);

	// Parsers
	export interface ArgResolverCustomMethod {
		(arg: string, possible: Possible, message: Message, params: any[]): any;
	}

	export interface Constants {
		DEFAULTS: ConstantsDefaults;
		TIME: ConstantsTime;
		MENTION_REGEX: MentionRegex;
	}

	export interface ConstantsDefaults {
		CLIENT: Required<ClientOptions>;
		CONSOLE: Required<ConsoleOptions>;
	}

	export interface ConstantsTime {
		SECOND: number;
		MINUTE: number;
		HOUR: number;
		DAY: number;
		DAYS: string[];
		MONTHS: string[];
		TIMESTAMP: {
			TOKENS: Map<string, number>;
		};
		CRON: {
			partRegex: RegExp;
			allowedNum: number[][];
			predefined: {
				'@annually': string;
				'@yearly': string;
				'@monthly': string;
				'@weekly': string;
				'@daily': string;
				'@hourly': string;
			};
			tokens: {
				jan: number;
				feb: number;
				mar: number;
				apr: number;
				may: number;
				jun: number;
				jul: number;
				aug: number;
				sep: number;
				oct: number;
				nov: number;
				dec: number;
				sun: number;
				mon: number;
				tue: number;
				wed: number;
				thu: number;
				fri: number;
				sat: number;
			};
			tokensRegex: RegExp;
		};
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

	export type TimeResolvable = Cron | Date | number | string;

	// Structures
	export interface PieceOptions {
		enabled?: boolean;
		name?: string;
	}

	export interface AliasPieceOptions extends PieceOptions {
		aliases?: string[];
	}

	export interface ArgumentOptions extends AliasPieceOptions {}

	export interface CommandOptions extends AliasPieceOptions {
		autoAliases?: boolean;
		requiredPermissions?: PermissionResolvable;
		bucket?: number;
		cooldown?: number;
		cooldownLevel?: 'author' | 'channel' | 'guild';
		deletable?: boolean;
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

	export interface MonitorOptions extends PieceOptions {
		allowedTypes?: MessageType[];
		ignoreBots?: boolean;
		ignoreEdits?: boolean;
		ignoreOthers?: boolean;
		ignoreSelf?: boolean;
		ignoreWebhooks?: boolean;
	}

	export interface EventOptions extends PieceOptions {
		emitter?: NodeJS.EventEmitter | FilterKeyInstances<KlasaClient, NodeJS.EventEmitter>;
		event?: string;
		once?: boolean;
	}

	export interface PieceJSON {
		directory: string;
		path: string;
		enabled: boolean;
		file: string[];
		name: string;
		type: string;
	}

	export interface AliasPieceJSON extends PieceJSON {
		aliases: string[];
	}

	export interface OriginalPropertyDescriptors {
		staticPropertyDescriptors: PropertyDescriptorMap;
		instancePropertyDescriptors: PropertyDescriptorMap;
	}

	export interface PieceCommandJSON extends AliasPieceJSON, Filter<Required<CommandOptions>, 'requiredPermissions' | 'usage'> {
		category: string;
		subCategory: string;
		requiredPermissions: string[];
		usage: {
			usageString: string;
			usageDelim: string | null;
			nearlyFullUsage: string;
		};
	}

	export interface PieceEventJSON extends PieceJSON, Filter<Required<EventOptions>, 'emitter'> {
		emitter: string;
	}

	export interface PieceInhibitorJSON extends PieceJSON, Required<InhibitorOptions> {}
	export interface PieceMonitorJSON extends PieceJSON, Required<MonitorOptions> {}
	export interface PieceArgumentJSON extends AliasPieceJSON, Required<ArgumentOptions> {}

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
	export enum ColorsClose {
		normal = 0,
		bold = 22,
		dim = 22,
		italic = 23,
		underline = 24,
		inverse = 27,
		hidden = 28,
		strikethrough = 29,
		text = 39,
		background = 49
	}

	export enum ColorsStyleTypes {
		normal = 0,
		bold = 1,
		dim = 2,
		italic = 3,
		underline = 4,
		inverse = 7,
		hidden = 8,
		strikethrough = 9
	}

	export enum ColorsTexts {
		black = 30,
		red = 31,
		green = 32,
		yellow = 33,
		blue = 34,
		magenta = 35,
		cyan = 36,
		lightgray = 37,
		lightgrey = 37,
		gray = 90,
		grey = 90,
		lightred = 91,
		lightgreen = 92,
		lightyellow = 93,
		lightblue = 94,
		lightmagenta = 95,
		lightcyan = 96,
		white = 97
	}

	export enum ColorsBackgrounds {
		black = 40,
		red = 41,
		green = 42,
		yellow = 43,
		blue = 44,
		magenta = 45,
		cyan = 46,
		gray = 47,
		grey = 47,
		lightgray = 100,
		lightgrey = 100,
		lightred = 101,
		lightgreen = 102,
		lightyellow = 103,
		lightblue = 104,
		lightmagenta = 105,
		lightcyan = 106,
		white = 107
	}

	export interface ColorsFormatOptions {
		background?: string;
		style?: string | string[];
		text?: string;
	}

	export type ColorsFormatType = string | number | [string, string, string] | [number, number, number];

	export interface ColorsFormatData {
		opening: string[];
		closing: string[];
	}

	export interface ConsoleOptions {
		utc?: boolean;
		colors?: ConsoleColorStyles;
		stderr?: NodeJS.WritableStream;
		stdout?: NodeJS.WritableStream;
		timestamps?: boolean | string;
		useColor?: boolean;
	}

	export interface ConsoleEvents {
		debug?: boolean;
		error?: boolean;
		log?: boolean;
		verbose?: boolean;
		warn?: boolean;
		wtf?: boolean;
	}

	export interface ConsoleColorStyles {
		debug?: ConsoleColorObjects;
		error?: ConsoleColorObjects;
		info?: ConsoleColorObjects;
		log?: ConsoleColorObjects;
		verbose?: ConsoleColorObjects;
		warn?: ConsoleColorObjects;
		wtf?: ConsoleColorObjects;
	}

	export interface ConsoleColorObjects {
		message?: ConsoleMessageObject;
		time?: ConsoleTimeObject;
	}

	export interface ConsoleMessageObject {
		background?: keyof typeof ColorsBackgrounds | null;
		style?: keyof typeof ColorsStyleTypes | null;
		text?: keyof typeof ColorsBackgrounds | null;
	}

	export interface ConsoleTimeObject {
		background?: keyof typeof ColorsBackgrounds | null;
		style?: keyof typeof ColorsStyleTypes | null;
		text?: keyof typeof ColorsBackgrounds | null;
	}

	export interface ReactionHandlerOptions {
		filter?: Function;
		max?: number;
		maxEmojis?: number;
		maxUsers?: number;
		prompt?: string;
		startPage?: number;
		stop?: boolean;
		time?: number;
	}

	export interface TimestampObject {
		content: string | null;
		type: string;
	}

	export interface RichDisplayRunOptions {
		filter?: (reaction: MessageReaction, user: User) => boolean;
		firstLast?: boolean;
		jump?: boolean;
		max?: number;
		maxEmojis?: number;
		maxUsers?: number;
		prompt?: string;
		startPage?: number;
		stop?: boolean;
		time?: number;
	}

	export interface RichDisplayEmojisObject extends Record<string, EmojiResolvable> {
		first: EmojiResolvable;
		back: EmojiResolvable;
		forward: EmojiResolvable;
		last: EmojiResolvable;
		jump: EmojiResolvable;
		info: EmojiResolvable;
		stop: EmojiResolvable;
	}

	export interface RichMenuEmojisObject extends RichDisplayEmojisObject {
		zero: EmojiResolvable;
		one: EmojiResolvable;
		two: EmojiResolvable;
		three: EmojiResolvable;
		four: EmojiResolvable;
		five: EmojiResolvable;
		six: EmojiResolvable;
		seven: EmojiResolvable;
		eight: EmojiResolvable;
		nine: EmojiResolvable;
	}

	export interface MenuOptions {
		name: string;
		body: string;
		inline?: boolean;
	}

	export interface RichMenuRunOptions {
		filter?: Function;
		max?: number;
		maxEmojis?: number;
		maxUsers?: number;
		prompt?: string;
		startPage?: number;
		stop?: boolean;
		time?: number;
	}

	export interface MentionRegex {
		userOrMember: RegExp;
		channel: RegExp;
		emoji: RegExp;
		role: RegExp;
		snowflake: RegExp;
	}

	interface Stringifible {
		toString(): string;
	}

	interface Constructor<C> {
		new (...args: any[]): C;
	}

	// Based on the built-in `Pick<>` generic
	type Filter<T, K extends keyof T> = {
		[P in keyof T]: P extends K ? unknown : T[P];
	};

	type ValueOf<T> = T[keyof T];
	type FilterKeyInstances<O, T> = ValueOf<
		{
			[K in keyof O]: O[K] extends T ? K : never;
		}
	>;

	export interface TitleCaseVariants extends Record<string, string> {
		textchannel: 'TextChannel';
		voicechannel: 'VoiceChannel';
		categorychannel: 'CategoryChannel';
		guildmember: 'GuildMember';
	}

	module 'discord.js' {
		export interface Client {
			constructor: typeof KlasaClient;
			readonly invite: string;
			readonly owners: Set<User>;
			options: Required<ClientOptions>;
			userBaseDirectory: string;
			console: KlasaConsole;
			arguments: ArgumentStore;
			commands: CommandStore;
			inhibitors: InhibitorStore;
			monitors: MonitorStore;
			events: EventStore;
			pieceStores: Collection<string, any>;
			permissionLevels: PermissionLevels;
			application: ClientApplication;
			ready: boolean;
			mentionPrefix: RegExp | null;
			registerStore<K, V extends Piece, VConstructor = Constructor<V>>(store: Store<K, V, VConstructor>): KlasaClient;
			unregisterStore<K, V extends Piece, VConstructor = Constructor<V>>(store: Store<K, V, VConstructor>): KlasaClient;
			sweepMessages(lifetime?: number, commandLifeTime?: number): number;
			fetchPrefix(message: Message): Promise<string | readonly string[] | null> | string | readonly string[] | null;
			on(event: 'argumentError', listener: (message: Message, command: Command, params: any[], error: string) => void): this;
			on(event: 'commandError', listener: (message: Message, command: Command, params: any[], error: Error | string) => void): this;
			on(event: 'commandInhibited', listener: (message: Message, command: Command, response: string | Error) => void): this;
			on(event: 'commandRun', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			on(event: 'commandSuccess', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			on(event: 'commandUnknown', listener: (message: Message, command: string, prefix: RegExp, prefixLength: number) => void): this;
			on(event: 'klasaReady', listener: () => void): this;
			on(event: 'log', listener: (data: any) => void): this;
			on(event: 'monitorError', listener: (message: Message, monitor: Monitor, error: Error | string) => void): this;
			on(event: 'pieceDisabled', listener: (piece: Piece) => void): this;
			on(event: 'pieceEnabled', listener: (piece: Piece) => void): this;
			on(event: 'pieceLoaded', listener: (piece: Piece) => void): this;
			on(event: 'pieceReloaded', listener: (piece: Piece) => void): this;
			on(event: 'pieceUnloaded', listener: (piece: Piece) => void): this;
			on(event: 'verbose', listener: (data: any) => void): this;
			on(event: 'wtf', listener: (failure: Error) => void): this;
			once(event: 'argumentError', listener: (message: Message, command: Command, params: any[], error: string) => void): this;
			once(event: 'commandError', listener: (message: Message, command: Command, params: any[], error: Error | string) => void): this;
			once(event: 'commandInhibited', listener: (message: Message, command: Command, response: string | Error) => void): this;
			once(event: 'commandRun', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			once(event: 'commandSuccess', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			once(event: 'commandUnknown', listener: (message: Message, command: string, prefix: RegExp, prefixLength: number) => void): this;
			once(event: 'klasaReady', listener: () => void): this;
			once(event: 'log', listener: (data: any) => void): this;
			once(event: 'monitorError', listener: (message: Message, monitor: Monitor, error: Error | string) => void): this;
			once(event: 'pieceDisabled', listener: (piece: Piece) => void): this;
			once(event: 'pieceEnabled', listener: (piece: Piece) => void): this;
			once(event: 'pieceLoaded', listener: (piece: Piece) => void): this;
			once(event: 'pieceReloaded', listener: (piece: Piece) => void): this;
			once(event: 'pieceUnloaded', listener: (piece: Piece) => void): this;
			once(event: 'verbose', listener: (data: any) => void): this;
			once(event: 'wtf', listener: (failure: Error) => void): this;
			off(event: 'argumentError', listener: (message: Message, command: Command, params: any[], error: string) => void): this;
			off(event: 'commandError', listener: (message: Message, command: Command, params: any[], error: Error | string) => void): this;
			off(event: 'commandInhibited', listener: (message: Message, command: Command, response: string | Error) => void): this;
			off(event: 'commandRun', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			off(event: 'commandSuccess', listener: (message: Message, command: Command, params: any[], response: any) => void): this;
			off(event: 'commandUnknown', listener: (message: Message, command: string, prefix: RegExp, prefixLength: number) => void): this;
			off(event: 'klasaReady', listener: () => void): this;
			off(event: 'log', listener: (data: any) => void): this;
			off(event: 'monitorError', listener: (message: Message, monitor: Monitor, error: Error | string) => void): this;
			off(event: 'pieceDisabled', listener: (piece: Piece) => void): this;
			off(event: 'pieceEnabled', listener: (piece: Piece) => void): this;
			off(event: 'pieceLoaded', listener: (piece: Piece) => void): this;
			off(event: 'pieceReloaded', listener: (piece: Piece) => void): this;
			off(event: 'pieceUnloaded', listener: (piece: Piece) => void): this;
			off(event: 'verbose', listener: (data: any) => void): this;
			off(event: 'wtf', listener: (failure: Error) => void): this;
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
			commandMessageLifetime?: number;
			console?: ConsoleOptions;
			consoleEvents?: ConsoleEvents;
			createPiecesFolders?: boolean;
			customPromptDefaults?: CustomPromptDefaults;
			disabledCorePieces?: string[];
			noPrefixDM?: boolean;
			owners?: string[];
			permissionLevels?: PermissionLevels;
			pieceDefaults?: PieceDefaults;
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

	// #endregion
}
