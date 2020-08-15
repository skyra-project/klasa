# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/skyra-project/klasa/compare/v1.0.0...v1.1.0) (2020-08-15)


### Features

* remove babel experiment ([4c3494a](https://github.com/skyra-project/klasa/commit/4c3494a4df1594f71e66b87b7616e9858f2962e4))

## 1.0.0 (2020-08-15)


### ⚠ BREAKING CHANGES

* remove Admin/Mod Roles

And change Client.defaultPermissionLevels to the following:
0: everyone
6: member.permissions.has('MANAGE_GUILD')
7: guild owner
9: bot owner - break
10: bot owner - silent

Given the recent changes to PermissionLevels, this should allow 99.9% of users to only need to edit the default permissions, rather than remake them/transfer effected commands, and manually patch whenever updating klasa.

example:
```javascript
const { Client } = require('klasa');
const config = require('./config.json');

Client.defaultPermissionLevels
    .addLevel(3, false, ...) // let some group of people who solved some easteregg clues use a special command/some custom non-admin role
    .addLevel(6, false, (client, msg) => msg.guild && msg.member.permissions.has('ADMINISTRATOR')) // Make the requirements to use conf stricter than just who can add the bot to the guild
    .addLevel(8, false, (client, msg) => client.config.botSupportTeam.includes(msg.author.id); // add a role above guild owners that let your support team help setup/troubleshoot on other guilds.

new Client(config).login(config.token);
```

* Docs catch-up

* Docs build: 72ea8ffec806262bf118231f1989b5debf904746

* fix some formatting

* oops, forgot to hit save...

* Docs build: 7292eec22e9044ce172c54e1260c519966771e3a

* Docs build: a6cf5ba4c59b8351a62809708a20169f817a4aee

* Fix artifact events

* Update and rename client.js to Client.js

* Update index.js

* Rename argResolver.js to ArgResolver.js

* Rename settingResolver.js to SettingResolver.js

* Docs build: add0a73e2b8209b699224e8cedd955d495e8d7bd

* Docs build: f0b360bbc622c19629db132db0a7fc6db3589288

* Update Client.js

* Rename hasAtleastPermissionLevel.js to hasAtLeastPermissionLevel.js

* regex args [init]

* Docs build: ac8e8c78464796becffafed8474b06b44735294e

* fix oops

* fix edgecase in regex argtype

* add piece arg type

* Docs build: 00a9955d587a2b61a1f2be5d92206f5432ef25fa

* update argresolver and understanding usage strings

* Docs build: aabe71b5c49488835bb13fdd288742b0329e703b

* fix regex arg type

* added quoted string support and options to turn it on and off everywhere

* Docs build: d7dd54b079d19db46298e1b4006c3386ae8dd0e6

* allow unlimited spaces between command and args

* add some promisified util functions

* Docs build: 173ced822777096e30e57a1b0c2670c3df94df7e

* document util.exec and util.sleep

forgot to hit save

* Docs build: bc8cd33a88bc94312bcc776d900db34c71f210ec

* Add typing mode

* Docs build: 21c0142b668b43b0a7bed3bf48a0e6c9cbc925eb

### Features

* add babel for building w/ sourcemaps ([355ba39](https://github.com/skyra-project/klasa/commit/355ba39e50c84d57a337b80491d76a9f655403b4))
* take a huge broom through the repo ([c639ff6](https://github.com/skyra-project/klasa/commit/c639ff6b20221aa2d18ed53c5763cbb45a35eb44))
* **typings:** language.get() generics improvement ([#807](https://github.com/skyra-project/klasa/issues/807)) ([7a71249](https://github.com/skyra-project/klasa/commit/7a71249b07c86a76f486e33643b2920e960ff04d))
* add resolve method ([#487](https://github.com/skyra-project/klasa/issues/487)) ([a1c7dc6](https://github.com/skyra-project/klasa/commit/a1c7dc6058a9fb54cbb2014ea36fa69ca66cbe98))
* Added `KlasaClient#settingsSync` event. ([#475](https://github.com/skyra-project/klasa/issues/475)) ([5044ab0](https://github.com/skyra-project/klasa/commit/5044ab09e733d8e1aaaa21b95caae1ece9c4e5b7))
* Added `KlasaClientOptions.createPiecesFolders` ([#416](https://github.com/skyra-project/klasa/issues/416)) ([d22574a](https://github.com/skyra-project/klasa/commit/d22574af04307f605115c5d07c41b7c7bedaa97f))
* Added option for the JSON provider to change the baseDirectory ([#511](https://github.com/skyra-project/klasa/issues/511)) ([340b622](https://github.com/skyra-project/klasa/commit/340b622bd74f86fe95624f3c18a2bc00b3487dd1))
* named fields in extendables ([#413](https://github.com/skyra-project/klasa/issues/413)) ([cae04a4](https://github.com/skyra-project/klasa/commit/cae04a403ef0b9acb490249d79355ffa6c31301f))
* RateLimitManager#acquire ([#442](https://github.com/skyra-project/klasa/issues/442)) ([f9a39c4](https://github.com/skyra-project/klasa/commit/f9a39c472f7a1fe7121d5e17d86dbe5db99111bd))


### Bug Fixes

* **Command:** have extendedHelp return any ([20ba9e8](https://github.com/skyra-project/klasa/commit/20ba9e8bab77fc6aab3a38a67e0656065a99b274))
* access client properly in SettingsFolder ([#834](https://github.com/skyra-project/klasa/issues/834)) ([805502d](https://github.com/skyra-project/klasa/commit/805502d573689f316323a1923737ae4f54b7d713))
* access client properly part 2 ([#836](https://github.com/skyra-project/klasa/issues/836)) ([c2d3017](https://github.com/skyra-project/klasa/commit/c2d3017f9f617e1446ee459cc4f5400c0dace01b))
* Gateway typings. ([#840](https://github.com/skyra-project/klasa/issues/840)) ([16cb6d3](https://github.com/skyra-project/klasa/commit/16cb6d3365228a9b831a1738a2710cfbc41aff49))
* pressing forward at the last page requires two backwards afterwards ([#1120](https://github.com/skyra-project/klasa/issues/1120)) ([7d44558](https://github.com/skyra-project/klasa/commit/7d4455853d4534771c2a478cfe153f4a9e558f4b))
* Remove deepClone on SettingsFolder#get ([#841](https://github.com/skyra-project/klasa/issues/841)) ([d8d3d9a](https://github.com/skyra-project/klasa/commit/d8d3d9ac5b4d2a84f49784413b9bac81a7f353b9))
* **KlasaMessage:** reactable not checking READ_MESSAGE_HISTORY permissions ([2798910](https://github.com/skyra-project/klasa/commit/2798910339100bb88fa14c39ef7699c0c79a4f9b))
* **Typing:** Add category and subCategory to PieceCommandJSON ([#759](https://github.com/skyra-project/klasa/issues/759)) ([99f4d14](https://github.com/skyra-project/klasa/commit/99f4d145e2748f884c1367ba049ba7fb020cac08)), closes [#749](https://github.com/skyra-project/klasa/issues/749)
* **Typing:** Add string union for EventOptions#emitter ([#764](https://github.com/skyra-project/klasa/issues/764)) ([155664d](https://github.com/skyra-project/klasa/commit/155664d7c8544c154b66cd5eff265322e4d9e91e))
* **Typings:** Forgot to import Stopwatch ([#773](https://github.com/skyra-project/klasa/issues/773)) ([43d5065](https://github.com/skyra-project/klasa/commit/43d5065e97a4d3ca3a3f225a65256f635f73367e))
* `user.client` being undefined (from `this.client.users.client` being undefined) ([41a137f](https://github.com/skyra-project/klasa/commit/41a137f7cb638b6556a1bd9c0a2f6b8663715e35)), closes [/github.com/discordjs/discord.js/blob/df1889ab4902416de2bf6b3c144d55e35dbf116f/src/stores/UserStore.js#L13](https://github.com/skyra-project//github.com/discordjs/discord.js/blob/df1889ab4902416de2bf6b3c144d55e35dbf116f/src/stores/UserStore.js/issues/L13)
* A 9-month old bug ([#404](https://github.com/skyra-project/klasa/issues/404)) ([8d970b5](https://github.com/skyra-project/klasa/commit/8d970b5c04a03cd9e7389fe888b9c0d499114c53))
* bugfixes from [#485](https://github.com/skyra-project/klasa/issues/485) ([04f945d](https://github.com/skyra-project/klasa/commit/04f945dd565cb8313d85627dd40b021615a52ff3))
* Collection not being destructured from discord.js ([bdc5637](https://github.com/skyra-project/klasa/commit/bdc5637b70f24d4f8d4926cb2447779970831873))
* CommandLogging finalizer not showing args ([#482](https://github.com/skyra-project/klasa/issues/482)) ([10ba294](https://github.com/skyra-project/klasa/commit/10ba294e55b737b8f3e8a7d10ce8d05da3dd2a72))
* Configuration#update should never throw ([#342](https://github.com/skyra-project/klasa/issues/342)) ([b03763a](https://github.com/skyra-project/klasa/commit/b03763a2ecb3e8ad046863aec0dbc69d5101f777))
* Default data not being initialized ([#594](https://github.com/skyra-project/klasa/issues/594)) ([977a7bf](https://github.com/skyra-project/klasa/commit/977a7bf164132f270274ef6d856d2d63a2d2b5af))
* Document Timestamp#displayUTC and patch it up ([#356](https://github.com/skyra-project/klasa/issues/356)) ([d804999](https://github.com/skyra-project/klasa/commit/d80499936ef379c3dcc1f18bac7bdb7776f5b0b7))
* Escape strings in Util#initClean ([#299](https://github.com/skyra-project/klasa/issues/299)) ([d959500](https://github.com/skyra-project/klasa/commit/d959500693b9414b86447265540fb0182943ce82))
* finalizerError not receiving proper args ([#483](https://github.com/skyra-project/klasa/issues/483)) ([4fdade4](https://github.com/skyra-project/klasa/commit/4fdade46c9c6cb1acfb62e046a734df7373c7a45))
* Fixed array operations not removing element if it was the last ([#520](https://github.com/skyra-project/klasa/issues/520)) ([02a0646](https://github.com/skyra-project/klasa/commit/02a06466d9770a716610dded870ffa095400b866))
* Guild always null in SettingsFolder#update ([#560](https://github.com/skyra-project/klasa/issues/560)) ([ec68f4e](https://github.com/skyra-project/klasa/commit/ec68f4e91cc67f3ede9fabe3bfe96a1f270121ef))
* GuildBlacklist failing at parsing external guilds ([#459](https://github.com/skyra-project/klasa/issues/459)) ([df7efab](https://github.com/skyra-project/klasa/commit/df7efabc2439e98e8ac5aa2963414d41d7b02787))
* Handle edge cause for ReactionHandler#_queueEmojiReactions ([#357](https://github.com/skyra-project/klasa/issues/357)) ([b099982](https://github.com/skyra-project/klasa/commit/b0999825943ae1abd6190928f3378751dc81bfd7))
* Handle edge cause for ReactionHandler#_queueEmojiReactions ([#357](https://github.com/skyra-project/klasa/issues/357)) ([db8a557](https://github.com/skyra-project/klasa/commit/db8a557ef89280a98fc6b01b2244ec0c99cf8ccd))
* illegal return ([#485](https://github.com/skyra-project/klasa/issues/485)) ([197eb31](https://github.com/skyra-project/klasa/commit/197eb31cc645e41e17a081593a3d93581724b3dd))
* isThenable returning true on Promise constructor ([#409](https://github.com/skyra-project/klasa/issues/409)) ([1b2fd93](https://github.com/skyra-project/klasa/commit/1b2fd938ae6b731f6d686e5ef19567d6ff9b2378))
* JSON provider being inconsistent with other providers ([#362](https://github.com/skyra-project/klasa/issues/362)) ([584eee2](https://github.com/skyra-project/klasa/commit/584eee2c769b2ae8b5a3a6ab1cf335251ad0d57e))
* merge and added missing events ([4ab8024](https://github.com/skyra-project/klasa/commit/4ab80243cf6422cfc127eb253fb2832e25eccff7))
* messageDeleteBulk not sweeping ([#523](https://github.com/skyra-project/klasa/issues/523)) ([66e0402](https://github.com/skyra-project/klasa/commit/66e04026b066446dc72690e9320c0eeff39e09c2))
* my brain ([124ad4a](https://github.com/skyra-project/klasa/commit/124ad4a23e46a257264fefa4e940869c0f2ffae6))
* Old typings, patch before emitting events ([f28c5c3](https://github.com/skyra-project/klasa/commit/f28c5c3dfa1a59737c595c3da3c4e6342c774d43))
* Reboot should shutdown providers ([#395](https://github.com/skyra-project/klasa/issues/395)) ([166b58d](https://github.com/skyra-project/klasa/commit/166b58d774e1a0b9ad96a6279fb477110b4732d7))
* Replace process.binding usage with native v8 ([#470](https://github.com/skyra-project/klasa/issues/470)) ([bad39f7](https://github.com/skyra-project/klasa/commit/bad39f7cbf7914c44fe06e874082b91cfbeadae8))
* reset trying to reset folders ([a5c1ebd](https://github.com/skyra-project/klasa/commit/a5c1ebdcf7236badc15fe070734e2b9bc813b0c8))
* Resolved memory leak in Schedule ([12aeffc](https://github.com/skyra-project/klasa/commit/12aeffc2c7b3bface6d9322b3c2891d508f78f0d))
* Schedule#delete ([#355](https://github.com/skyra-project/klasa/issues/355)) ([94108e6](https://github.com/skyra-project/klasa/commit/94108e648618b84187784391226ea52f77645e55))
* SchemaEntry#edit should lower-case the type ([614dd9f](https://github.com/skyra-project/klasa/commit/614dd9f06dcba6f7d1ffb31bc5f365f0c9e52c55))
* Settings cross-shard sync not setting existence flag to true ([#476](https://github.com/skyra-project/klasa/issues/476)) ([af24d81](https://github.com/skyra-project/klasa/commit/af24d81b6c44f6517926c64da6abfd84bafa6118))
* Settings delete core event ([#477](https://github.com/skyra-project/klasa/issues/477)) ([02b3489](https://github.com/skyra-project/klasa/commit/02b34898efab448c94503cff295d2163608d411b))
* Settings never synchronizing due to TypeError ([9a75894](https://github.com/skyra-project/klasa/commit/9a758946a85a09a74e76b13f283a7829678fadbe))
* Stringify errors ([#460](https://github.com/skyra-project/klasa/issues/460)) ([92ff32d](https://github.com/skyra-project/klasa/commit/92ff32daca134f7526f3818460733dfcdc481322))
* Wrong eval for reloading everything ([#563](https://github.com/skyra-project/klasa/issues/563)) ([6c443e3](https://github.com/skyra-project/klasa/commit/6c443e32ac366beded6c2392d3bb24d56c046f3b))
* Wrong guild.roles.get call in serializer ([#493](https://github.com/skyra-project/klasa/issues/493)) ([226b09f](https://github.com/skyra-project/klasa/commit/226b09fd70b7a49c7af47cd52411eaa8d049c180))
* **Usage:** Accidental trimming ([#253](https://github.com/skyra-project/klasa/issues/253)) ([3a510ca](https://github.com/skyra-project/klasa/commit/3a510ca8be8eb3896f01742d729e5e84c9984749))


* 0.3.0 release (#16) ([5ec43bc](https://github.com/skyra-project/klasa/commit/5ec43bce0ccaa6400043d2f51460a667fb9b56c5)), closes [#16](https://github.com/skyra-project/klasa/issues/16) [#5](https://github.com/skyra-project/klasa/issues/5) [#6](https://github.com/skyra-project/klasa/issues/6) [#7](https://github.com/skyra-project/klasa/issues/7) [#8](https://github.com/skyra-project/klasa/issues/8) [#9](https://github.com/skyra-project/klasa/issues/9) [#10](https://github.com/skyra-project/klasa/issues/10) [#12](https://github.com/skyra-project/klasa/issues/12) [#13](https://github.com/skyra-project/klasa/issues/13) [#15](https://github.com/skyra-project/klasa/issues/15)
