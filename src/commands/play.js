const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { EmbedBuilder } = require("../utils");

module.exports = {
    name: 'play',
    description: 'To play a song by title / url.',
    isVoice: true,
    options: [
        {
            name: 'track',
            description: 'The track title / url',
            type: 'STRING',
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

        let embed = (text) => interaction.reply({ embeds: [new EmbedBuilder(interaction.user).setText(text).setType('search').toEmbed()] });

        let voiceChannel = interaction.member.voice?.channel;

        embed(`Searching for \`${args[0]}\` ...`).then(() => {
            player.play(voiceChannel, args[0], {
                member: interaction.member,
                textChannel: interaction.channel,
                metadata: { interaction }
            });
        });


    }
}