# klasa

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bdistin"><img src="https://avatars2.githubusercontent.com/u/18535830?v=4?s=100" width="100px;" alt=""/><br /><sub><b>bdistin</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=bdistin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kyranet"><img src="https://avatars0.githubusercontent.com/u/24852502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antonio Román</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=kyranet" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vladfrangu"><img src="https://avatars3.githubusercontent.com/u/17960496?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vlad Frangu</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=vladfrangu" title="Code">💻</a></td>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Favna" title="Code">💻</a></td>
    <td align="center"><a href="https://jaczaus.me/"><img src="https://avatars3.githubusercontent.com/u/23615291?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jacz</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=MrJacz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Tylertron1998"><img src="https://avatars0.githubusercontent.com/u/34944514?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tyler Davis</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Tylertron1998" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Pandraghon"><img src="https://avatars3.githubusercontent.com/u/4117960?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pandraghon</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Pandraghon" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/PyroTechniac"><img src="https://avatars2.githubusercontent.com/u/39341355?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gryffon Bellish</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=PyroTechniac" title="Code">💻</a></td>
    <td align="center"><a href="http://moorewebcode.com/"><img src="https://avatars1.githubusercontent.com/u/25398066?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hutch</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=tech6hutch" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Skillz4Killz"><img src="https://avatars3.githubusercontent.com/u/23035000?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Skillz4Killz</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Skillz4Killz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gc"><img src="https://avatars2.githubusercontent.com/u/30398469?v=4?s=100" width="100px;" alt=""/><br /><sub><b>GC</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=gc" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DevYukine"><img src="https://avatars1.githubusercontent.com/u/20647088?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yukine</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=DevYukine" title="Code">💻</a></td>
    <td align="center"><a href="https://hellpie.dev/"><img src="https://avatars0.githubusercontent.com/u/2611921?v=4?s=100" width="100px;" alt=""/><br /><sub><b>HellPie</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=HellPie" title="Code">💻</a></td>
    <td align="center"><a href="https://shaybox.com/"><img src="https://avatars2.githubusercontent.com/u/9505196?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shayne Hartford</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=ShayBox" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/pedall"><img src="https://avatars2.githubusercontent.com/u/20089354?v=4?s=100" width="100px;" alt=""/><br /><sub><b>pedall</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=pedall" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Dwigoric"><img src="https://avatars2.githubusercontent.com/u/30539952?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dwigoric</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Dwigoric" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/FayneAldan"><img src="https://avatars1.githubusercontent.com/u/1149870?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fayne Aldan</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=FayneAldan" title="Code">💻</a></td>
    <td align="center"><a href="https://kenany.me/"><img src="https://avatars0.githubusercontent.com/u/733364?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kenan Yildirim</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=KenanY" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/TheFloppyBanana"><img src="https://avatars1.githubusercontent.com/u/35372554?v=4?s=100" width="100px;" alt=""/><br /><sub><b>TheFloppyBanana</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=TheFloppyBanana" title="Code">💻</a></td>
    <td align="center"><a href="http://imurx.github.io/"><img src="https://avatars0.githubusercontent.com/u/3698237?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Uriel</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=ImUrX" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/BannerBomb"><img src="https://avatars0.githubusercontent.com/u/11788894?v=4?s=100" width="100px;" alt=""/><br /><sub><b>BannerBomb</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=BannerBomb" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/cfanoulis"><img src="https://avatars3.githubusercontent.com/u/38255093?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Charalampos Fanoulis</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=cfanoulis" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/angeloanan"><img src="https://avatars0.githubusercontent.com/u/2129163?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Angelo</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=angeloanan" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dada1134"><img src="https://avatars3.githubusercontent.com/u/13734138?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damian</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=dada1134" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/coneforapine"><img src="https://avatars2.githubusercontent.com/u/16270254?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Deniz Can</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=coneforapine" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Soumil07"><img src="https://avatars0.githubusercontent.com/u/29275227?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Soumil07</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Soumil07" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Excigma"><img src="https://avatars0.githubusercontent.com/u/30280397?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Excigma</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Excigma" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/IceeMC"><img src="https://avatars1.githubusercontent.com/u/31800435?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Burke</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=IceeMC" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/CyberiumShadow"><img src="https://avatars3.githubusercontent.com/u/4259904?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Johnson Chen</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=CyberiumShadow" title="Code">💻</a></td>
    <td align="center"><a href="https://jordanjones.org/"><img src="https://avatars3.githubusercontent.com/u/17620516?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jordan Jones</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Kashalls" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Kizuru"><img src="https://avatars1.githubusercontent.com/u/38630815?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kizuru</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Kizuru" title="Code">💻</a></td>
    <td align="center"><a href="https://atm.moe/"><img src="https://avatars3.githubusercontent.com/u/31011461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kovacs Alex</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=alexthemaster" title="Code">💻</a></td>
    <td align="center"><a href="https://michaelcumbers.ca/"><img src="https://avatars0.githubusercontent.com/u/16696023?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Cumbers</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=mcumbers" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/OGNova"><img src="https://avatars3.githubusercontent.com/u/26777028?v=4?s=100" width="100px;" alt=""/><br /><sub><b>OGNovuh</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=OGNova" title="Code">💻</a></td>
    <td align="center"><a href="https://piyush.codes/"><img src="https://avatars3.githubusercontent.com/u/18086566?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Piyush Bhangale</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=officialpiyush" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://quantumlytangled.com/"><img src="https://avatars1.githubusercontent.com/u/7919610?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nejc Drobnic</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=QuantumlyTangled" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SZephyr"><img src="https://avatars2.githubusercontent.com/u/30449407?v=4?s=100" width="100px;" alt=""/><br /><sub><b>SZephyr</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=SZephyr" title="Code">💻</a></td>
    <td align="center"><a href="https://cybersnets.com/"><img src="https://avatars2.githubusercontent.com/u/22725593?v=4?s=100" width="100px;" alt=""/><br /><sub><b>FOG_Yamato</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=FOG-Yamato" title="Code">💻</a></td>
    <td align="center"><a href="https://superop535.ml/"><img src="https://avatars1.githubusercontent.com/u/27556391?v=4?s=100" width="100px;" alt=""/><br /><sub><b>SuperOP535</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=SuperOP535" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Morphoxeris"><img src="https://avatars1.githubusercontent.com/u/31350835?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zach</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=Morphoxeris" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kshxtij"><img src="https://avatars3.githubusercontent.com/u/48125086?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kshxtij</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=kshxtij" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/avallete"><img src="https://avatars3.githubusercontent.com/u/8771783?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Valleteau</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=avallete" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://hellbound.xyz/"><img src="https://avatars0.githubusercontent.com/u/46569300?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hellbound</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=hellbound1337" title="Code">💻</a></td>
    <td align="center"><a href="https://voied.me/"><img src="https://avatars3.githubusercontent.com/u/25951318?v=4?s=100" width="100px;" alt=""/><br /><sub><b>void</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=voiding" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/UnseenFaith"><img src="https://avatars1.githubusercontent.com/u/1832323?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Faith</b></sub></a><br /><a href="https://github.com/skyra-project/klasa/commits?author=UnseenFaith" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!