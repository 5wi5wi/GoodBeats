const { EmbedBuilder } = require("../utils");

module.exports = async function (client, queue, song) {

    let embed = (text) => [new EmbedBuilder(song.metadata.interaction.user).setText(text).setType('voice').toEmbed()];

    if (queue.songs.length == 1) {
        song.metadata.interaction.editReply({ embeds: embed(`Start playing **${song.name}** [\`${song.formattedDuration}\`]`) })
    } else {
        song.metadata.interaction.editReply({ embeds: embed(`Queued **${song.name}** [\`${song.formattedDuration}\`]`) })
    }
}