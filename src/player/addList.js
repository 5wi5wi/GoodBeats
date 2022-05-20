const { EmbedBuilder } = require("../utils");

module.exports = async function (client, queue, playlist) {

    let embed = (text) => [new EmbedBuilder(playlist.metadata.interaction.user).setText(text).setType('voice').toEmbed()];

    if (queue.songs.length == 1) {
        playlist.metadata.interaction.editReply({ embeds: embed(`Start playing **${playlist.name}** playlist`) })
    } else {
        playlist.metadata.interaction.editReply({ embeds: embed(`Queued **${playlist.name}** playlist`) })
    }
}