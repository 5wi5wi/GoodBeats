const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'volume',
    description: 'To change the player volume.',
    isVoice: true,
    options: [
        {
            name: 'volume',
            description: 'The new track volume',
            type: 'INTEGER',
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

        let embed = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('sound').toEmbed()] });

        let queue = player.getQueue(interaction.guild.id);

        if (!queue) return error(`There must be music playing to use that`);

        let volume = parseInt(args[0]);

        if (args[0] && (isNaN(volume) || volume < 1)) return error(`Invalid number has entered`);

        else if (!args[0]) return embed(`The current volume is **${queue.volume}%**`);

        queue.setVolume(volume);

        embed(`Set volume to **${volume}%**`);

    }
}