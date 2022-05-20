const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'remove',
    description: 'To remove a song from the queue.',
    isVoice: true,
    options: [
        {
            name: 'track',
            description: 'The track number of queue',
            type: 'INTEGER',
            required: true,
        },
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     * @param {DisTube} player
     */
    run: async function (client, interaction, args, player) {

        let error = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('error').toEmbed()], ephemeral: true });

        let embed = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('success').toEmbed()] });

        let queue = player.getQueue(interaction.guild.id);

        if (!queue) return error('There must be music playing to use that')

        let songIndex = parseInt(args[0]);

        if (isNaN(songIndex) || songIndex < 1) return error('Invalid number has entered');

        if (!queue.songs[songIndex]) return error(`There is no song with \`${songIndex}\` number`);

        embed(`Remove **${queue.songs[songIndex].name}** from the queue`);

        queue.songs.splice(songIndex, 1);

    }
}