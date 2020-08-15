# @skyra/klasa-fork

> Let's stop reinventing the wheel, and start coding the bots of our dreams!

Klasa is an OOP discord.js bot framework which aims to be the most feature complete, while feeling like a consistent extension of [discord.js](https://github.com/discordjs/discord.js).

Originally based on [Komada](https://github.com/dirigeants/komada), Klasa has become a [ship of Theseus](https://en.wikipedia.org/wiki/Ship_of_Theseus), keeping many similarities with the former framework but with many enhancements and extra features.

## What's with the name?

Following suit from Komada (the Croatian word for "pieces"), Klasa is the Croatian word for "class". By the same token, Klasa is modular, and each module is a piece of a puzzle you use to build your own bot. And you can replace, enhance, reload or remove these pieces; the difference is that Klasa uses [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

## What is different in this fork

-   ExtendedHelp has been redesigned to be forward compatible with the change to [i18next] that will be needed when [Skyra] migrated to [Sapphire Framework](https://github.com/sapphire-project/framework)
-   `RichDisplay#addPage` typings have been changed to take `(template: MessageEmbed) => MessageEmbed` to save a lot of unnecessary typing effort when building RichDisplay's
-   `Command#extendedHelp` and `CommandOptions#extendedHelp` now take `unknown` as type to facilitate better [i18next] transition
-   Other QoL changes specific for [Skyra]

**_This fork should not be used in your own projects. This fork is exclusively for [Skyra]'s use!!_**

## Features

-   Abstracted database handler, works with any database, or atomically written JSON (by default).
-   Easy and powerful command system, featuring **usage string**, dependent arguments, and custom types.
-   Easy and powerful to configure the permission levels system.
-   Easy to create your own pieces and structures!
-   Editable commands with quoted string support and custom parameter delimiter.
-   Flag arguments.
-   Full OOP and hot-reloadable pieces.
-   Full personalizable configuration system that can serve for much more than just guilds.
-   Incredibly fast loading (~100ms) with deep loading for commands.
-   Per-command cooldowns with bucket support and easy to configure.
-   Many different pieces and standalone utils to help you build the bot of your dreams!
    -   Commands: The most basic piece, they run when somebody types the prefix and the command name or any of its aliases.
    -   Events: Hot-reloadable structures for events, with internal error handling.
    -   Extendables: Easily extend Klasa or discord.js.
    -   Finalizers: Structures that run after successful command run.
    -   Inhibitors: Middleware that can stop a command from running (blacklist, permissions...).
    -   Languages: Easy internationalization support for your bot!
    -   Monitors: Watch every single message your bot receives! They're perfect for no-mention-spam, swear word filter, and so on!
    -   Providers: You can have one, or more, they're interfaces for the settings system and ensures the data is written correctly!
    -   Serializers: These allow you to change how the Settings system reads, writes, and displays information.
    -   Tasks: Pieces that handle scheduled tasks.

[i18next]: https://www.i18next.com
[skyra]: https://github.com/skyra-project/skyra
