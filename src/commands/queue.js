const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'queue',
    description: 'To view the player songs queue.',
    isVoice: true,
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     * @param {DisTube} player
     */
    run: async function (client, interaction, args, player) {

        let error = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('error').toEmbed()], ephemeral: true });

        let queue = player.getQueue(interaction.guild.id);

        if (!queue) return error(`There must be music playing to use that`);

        let queueList = []

        for (let i = 0; i < 5; i++) {

            let song = queue.songs[i + 1];

            if (song) queueList.push(`**${i + 1}**: [\`${song.formattedDuration}\`]\n**[${song.name}](${song.url})**`);

        }

        let embed = new MessageEmbed()
            .setColor(client.config.color)
            .setTitle(`Queue ${queue.songs.length-1}`)
            .setDescription(`${queueList.join('\n\n') || 'Empty'}`)
            .setTimestamp()
        if (queue.songs.length > 6) {
            embed.setFooter({ text: `And '${queue.songs.length - 6}' songs left`, iconURL: `https://cdn.discordapp.com/icons/736264818318639195/a_359555f1ddc126ed2f71afafafe84d05.gif` });
        }

        interaction.reply({ content: `${client.emotes.notes} Now playing **${queue.songs[0].name}**`, embeds: [embed] });

    }
}