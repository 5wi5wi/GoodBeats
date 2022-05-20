const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'nowplaying',
    description: 'To see the current playing song.',
    isVoice: true,
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     * @param {DisTube} player
     */
    run: async function (client, interaction, args, player) {

        let error = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('error').toEmbed()], ephemeral: true })

        let queue = player.getQueue(interaction.guild.id);

        if (!queue) return error(`There must be music playing to use that`);

        let song = queue.songs[0];

        const embed = new MessageEmbed()
            .setTitle('Now playing')
            .setThumbnail(song.thumbnail.toString())
            .addField('Song', `[${song.name}](${song.url})`, false)
            .addField('Duration', `\`${queue.formattedCurrentTime}\` / \`${song.formattedDuration}\``, true)
            .addField('Uploader', `[${song.uploader.name}](${song.uploader.url})`, true)
            .addField('Played By', `${song.user} (\`${song.user.id}\`)`, true)
            .setColor(client.config.color)
            .setFooter({ text: `LayerCoding`, iconURL: `https://cdn.discordapp.com/icons/736264818318639195/a_359555f1ddc126ed2f71afafafe84d05.gif`,  })
            .setTimestamp()

        interaction.reply({ embeds: [embed] });

    }
}