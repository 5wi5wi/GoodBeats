const { MessageEmbed, User } = require('discord.js');
const { emotes, color } = require('../../../config')

/*-----------------------------------------------*\
 *                                               *
 *              EmbedBuilder Class               *
 *                                               *
\*-----------------------------------------------*/

module.exports = class EmbedBuilder {

    /**
     * @param {User} user 
     */
    constructor(user) {
        const embed = new MessageEmbed().setColor(color).setFooter({ text: `LayerCoding`, iconURL: `https://cdn.discordapp.com/icons/736264818318639195/a_359555f1ddc126ed2f71afafafe84d05.gif`, }).setTimestamp();
        this.embed = embed;
    }

    /**
     * @param {String} text The text that will provide on the embed!
     */
    setText(text) {
        this.text = text;
        return this;
    }

    /**
     * @param {'error' | 'success' | 'voice' | 'search' | 'sound'} type Confirmation that is embed for the errors or not!
     */
    setType(type) {
        this.type = type
        return this
    }

    /**
     * @description To convert the object to advanced embed
     * @returns Discord.MessageEmbed
     */
    toEmbed() {
        this.embed
            .setDescription(`${this.type == 'sound' ? emotes.sound : this.type == 'error' ? emotes.error : this.type == 'success' ? emotes.success : this.type == 'voice' ? emotes.notes : this.type == 'search' ? emotes.search : '-'} ${this.text}`)
            .setColor(`${this.type == 'error' ? 'RED' : color}`)
        return this.embed
    }

}