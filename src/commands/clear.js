const { Client, Message, MessageEmbed } = require("discord.js");
const { DisTube } = require("distube");

module.exports = {
    name: 'clear',
    description: 'To remove a song from the queue.',
    aliases: ['c'],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     * @param {DisTube} player
     */
    run: async function (client, message, args, player) {

        let voice = {
            member: message.member.voice?.channel,
            bot: message.guild.me.voice?.channel
        };

        if (!voice.member) return message.reply(`${client.emotes.error} You're not in a voice channel`);

        if (voice.bot && voice.bot !== voice.member) return message.reply(`${client.emotes.error} You're not in \`#${voice.bot.name}\` channel`);

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has('CONNECT')) return message.reply(`${client.emotes.error} I'm not able to join info the voice channel`);

        let queue = player.getQueue(message.guild.id);

        if (!queue) return message.reply(`${client.emotes.error} There must be music playing to use that`);

        let songIndex = parseInt(args[0]);

        if (isNaN(songIndex) || songIndex < 1) return message.reply(`${client.emotes.error} Invalid number has entered`);

        if (!queue.songs[songIndex]) return message.reply(`${client.emotes.error} There is no song with \`${songIndex}\` number`);

        message.reply(`${client.emotes.notes} Remove **${queue.songs[songIndex].name}** from the queue`);

        queue.songs.splice(songIndex, 1);

    }
}