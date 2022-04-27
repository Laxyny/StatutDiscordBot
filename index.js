var Discord = require('discord.js');
const client = new Discord.Client({ intents: [], fetchAllMembers: true, partials: ['MESSAGE', 'REACTION']});  
const config = require('./config.json');

const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("00.00.00.00:30120");

const { Chain } = require('repeat');

 joueur = 0;
 joueurmax = 0;

client.commands = new Discord.Collection()

client.on('ready', () => {
    console.log('BOT en ligne !')
    client.user.setStatus('dnd')

    
    const chain = new Chain()

    chain.add(() => server.getPlayersOnline().then((res) => joueur = res)).every(1000)
    chain.add(() => server.getMaxPlayers().then((res2) => joueurmax = res2)).every(1000)

    chain.add(() => {if (joueur > 1) {
        client.user.setActivity('Joueurs: ' + joueur + '/' + joueurmax)
   } else if (joueur < 2) {
        client.user.setActivity('Joueur: ' + joueur + '/' + joueurmax)
   }}).every(1000)
    
})

client.login(config.token);