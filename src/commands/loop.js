const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'loop',
    description: 'To loop the first player song.',
    isVoice: true,
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     * @param {DisTube} player
     */
    run: async function (client, interaction, args, player) {

        let error = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('error').toEmbed()], ephemeral: true })

        let embed = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('voice').toEmbed()] });

        let queue = player.getQueue(interaction.guild.id);

        if (!queue) return error('There must be music playing to use that');

        switch (queue.repeatMode) {

            case 1:
                queue.setRepeatMode(2);
                embed(`Enabled **Queue** loop`)
                break;
            case 2:
                queue.setRepeatMode(0);
                embed(`Loop is now **Disabled**`)
                break;
            default:
                queue.setRepeatMode(1);
                embed(`Enabled **Song** loop`)
                break;

        }

    }
}