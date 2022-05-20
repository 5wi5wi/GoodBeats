const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'To see the bot commands help list.',
    isVoice: false,
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     */
    run: async function (client, interaction, args, player) {

        let i = 0;

        let commands = client.commands.map(x => {
            i++;
            return `${i}. **/${x.name}** ${x.options && x.options[0] ? `${x.options.map(x => `[**${x.name}**]`).join(', ')}` : ''} > \`${x.description}\``;
        });

        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle(`Music Commands [ ${client.commands.size} ]`)
            .setURL('https://discord.gg/layer')
            .setDescription(`${commands.join('\n')}`)
            .setFooter({ text: `LayerCoding`, iconURL: `https://cdn.discordapp.com/icons/736264818318639195/a_359555f1ddc126ed2f71afafafe84d05.gif`,  })
            .setTimestamp()

        interaction.reply({ embeds: [embed] })
    }
}