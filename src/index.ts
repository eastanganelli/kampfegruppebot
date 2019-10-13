//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
//#region Mines
import * as ConfigFile from "./config";
import * as readyFNs   from "./periodic";
import { reactiones, quiteRoles } from "./roles";
import { menuBOT } from "./msg"
import { newUsuario, lastConnectionusuario } from "./users";
//#endregion

const client: Discord.Client = new Discord.Client();
var app: firebase.app.App = firebase.initializeApp(ConfigFile.configfb);

client.on("ready", () => { 
    console.log("Ready to go!!!");
    readyFNs.FnPeriodic(client);
});
client.on("guildMemberAdd", member => {  });
client.on("message", async msg => {
    if(!(msg.author.bot)) { await lastConnectionusuario(msg.author.id); }
    menuBOT(msg);
    //msg.guild.fetchMember(u => u.id ===)
});
client.on('messageReactionAdd', async (reaction, user) => {
    reactiones(reaction, user);
    //console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});
client.on('messageReactionRemove', async (reaction, user) => {
    quiteRoles(reaction, user);
    //console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`); 
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if(oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.user.bot) && (oldMember.voiceChannelID != '496525236888535042' && newMember.voiceChannelID != '496525236888535042')) { lastConnectionusuario(newMember.id); } 
    else if(newUserChannel === undefined){ /*Leaves VC*/ }
});
client.on("presenceUpdate", (oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status) {
        /* firebase.database().ref('/Users/').child(newMember.id).on('value', data => {  
            if(newMember.presence.status == 'offline') { 
            } else if(newMember.presence.status == 'online' || newMember.presence.status == 'idle' || newMember.presence.status == 'dnd') {  
                if(data.val() === null && !(newMember.presence.status == 'idle' || newMember.presence.status == 'dnd')) { 
                    newMember.sendMessage("Por Favor, cargue sus datos de Perfil")
                }
                else if(data.val() != null) {  }
            }
        }, (Err: any) => { console.log(Err) });  */
    console.log(newMember.user.username + ' is now ' + newMember.presence.status); } 
});
 
client.login(ConfigFile.config.token);
