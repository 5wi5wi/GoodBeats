const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'search',
    description: 'To search for some tracks.',
    isVoice: true,
    options: [
        {
            name: 'track',
            description: 'The track name, url is not supported',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     * @param {DisTube} player
     */
    run: async function (client, interaction, args, player) {

        let embed = (text) => interaction.editReply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('search').toEmbed()], components: [], content: " " });

        if (client.isValidHttpUrl(args[0])) return interaction.reply({ content: `${client.emotes.error} You can\' search for url's`, ephemeral: true });

        const SearchResult = (await player.search(args[0])).map((song, index) => ({ label: `${song.name}`, value: `${song.url}` }));

        const selectMenu = new MessageSelectMenu()
            .setCustomId(`TRACK-${interaction.id}`)
            .setOptions(SearchResult)
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder(`[ ${SearchResult.length} ] Results`)

        const row = new MessageActionRow()
            .addComponents(selectMenu)

        interaction.reply({ content: `🔎 Search result of \`${args[0]}\``, components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({
            max: 1,
            filter: (int) => int.customId == `TRACK-${interaction.id}` && int.user.id == interaction.user.id,
            time: 60000,
            errors: ['time']
        });

        collector.on('collect', (collected) => {

            const [result] = collected.values;

            const voiceChannel = interaction.member.voice?.channel;

            embed(`Searching \`${result}\` ...`).then(() => {
                player.play(voiceChannel, result, {
                    member: interaction.member,
                    textChannel: interaction.channel,
                    metadata: { interaction }
                });
            });

        });

        collector.on('end', (collected) => {
            if (collected.first()) return;
            interaction.deleteReply().catch(() => { });
        });


    }
}