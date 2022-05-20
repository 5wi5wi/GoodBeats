require('colors');

module.exports = async (client, guild) => {
    let supportedInviteURL = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot+applications.commands`
    try {
        await guild.commands.set(client.slashCommands);
        console.log(`Register new slash commands in '${guild.name}'`)
    } catch (e) { console.log(`ERROR`.red, `| Could not register slash command in ${guild.name}\nSupported invite url: ${supportedInviteURL}`) }
}