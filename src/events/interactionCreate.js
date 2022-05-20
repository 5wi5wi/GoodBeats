const { Client, Interaction } = require("discord.js");

/**
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {

    if (interaction.isCommand()) {

        const cmd = client.commands.get(interaction.commandName);

        if (!cmd) return interaction.followUp(`There is no \`${interaction.commandName}\` command`);

        let args = []

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {

                if (option.name) args.push(option.name.toLowerCase());

                option.options?.forEach((x) => {

                    if (x.value) args.push(x.value);

                });

            } else if (option.value) args.push(option.value);
        }

        if (cmd.isVoice) {

            let voice = {
                member: interaction.member.voice?.channel,
                bot: interaction.guild.me.voice?.channel
            };

            if (!voice.member) return interaction.reply({ content: `${client.emotes.error} You're not in a voice channel`, ephemeral: true });

            if (voice.bot && voice.bot !== voice.member) return interaction.reply({ content: `${client.emotes.error} You're not in \`#${voice.bot.name}\` channel`, ephemeral: true });

            if (!interaction.guild.me.permissionsIn(interaction.member.voice.channel).has('CONNECT')) return interaction.reply({ content: `${client.emotes.error} I'm not able to join info the voice channel`, ephemeral: true });

        }

        cmd.run(client, interaction, args, client.player)

    }

}