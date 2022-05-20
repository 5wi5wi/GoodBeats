const Discord = require('discord.js');
const config = require('./config');
const fs = require('fs');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
require('colors');
console.log(`<========================= LOGING IN =========================>`.gray);
console.log(`<========== ALL COPY RIGHTS REVERSED ©️ LAYER CODING ==========>`.gray);
console.log(`<======= CONTACT WITH US AT `.gray, `https://discord.gg/layer`.blue, ` =======>`.gray);

const tokens = config.tokens;

tokens.forEach(token => {
    const client = new Discord.Client({
        intents: new Discord.Intents(35767),
        allowedMentions: {
            parse: [],
            repliedUser: false
        },
        presence: {
            activities: [{ ...config.activity }],
            status: 'online'
        }
    });

    // ---------- Client configuration ---------- \\

    client.login(token);

    client.emotes = config.emotes;

    client.config = config;

    client.commands = new Discord.Collection();

    client.slashCommands = [];

    client.player = new DisTube(client, {
        youtubeDL: false,
        updateYouTubeDL: false,
        plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin()],
        leaveOnEmpty: false,
        leaveOnFinish: false,
        leaveOnStop: false,
        emitNewSongOnly: true,
        nsfw: true
    });

    client.isValidHttpUrl = function (string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    // ---------- Project handler ---------- \\

    fs.readdir('./src/commands', async function (err, files) {

        if (err) throw err;

        files.forEach(file => {

            if (!file.endsWith('.js')) return;

            const command = require(`./src/commands/${file}`);

            client.slashCommands.push(command);

            client.commands.set(command.name, command);

        });

    });

    fs.readdir('./src/player', async function (err, files) {

        if (err) throw err;

        files.forEach(file => {

            if (!file.endsWith('.js')) return;

            const event = require(`./src/player/${file}`);

            const eventName = file.split('.')[0];

            client.player.on(eventName, event.bind(null, client));

        });

    });

    fs.readdir('./src/events', async function (err, files) {

        if (err) throw err;

        files.forEach(file => {

            if (!file.endsWith('.js')) return;

            const event = require(`./src/events/${file}`);

            const eventName = file.split('.')[0];

            client.on(eventName, event.bind(null, client));

        });

    });
})

// ---------- Project anticrash ---------- \\

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
});