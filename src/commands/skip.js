const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'skip',
    description: 'To skip the current song.',
    isVoice: true,
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     * @param {DisTube} player
     */
    run: async function (client, interaction, args, player) {

        let error = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('error').toEmbed()], ephemeral: true });

        let embed = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('voice').toEmbed()] });

        let queue = player.getQueue(interaction.guild.id);

        if (!queue) return error(`There must be music playing to use that`);

        let skippedSong = queue.songs[0]?.name;

        embed(`Skipped **${skippedSong}**`);

        queue.skip().catch(() => queue.stop());

    }
}