const { Client } = require("discord.js");
require('colors')
/**
 * @param {Client} client 
 */

module.exports = function (client) {

    console.log(`LAYER`.green, `| '${client.user.tag}' is connected.`);
    let supportedInviteURL = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot+applications.commands`

    client.guilds.cache.forEach(async function (guild) {
        try {
            await guild.commands.set(client.slashCommands);
        } catch (e) { console.log(`ERROR`.red, `| Could not register slash command in ${guild.name}\nSupported invite url: ${supportedInviteURL}`) }
    });

}