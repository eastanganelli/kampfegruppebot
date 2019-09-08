//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import * as fs         from "fs";
import "firebase/database";
//#endregion
//#region Mines
import * as ConfigFile from "./config";
import * as readyFNs   from "./periodic";
import * as rolesFN    from "./roles";
import * as mBOT       from "./msg"
//#endregion

const client: Discord.Client = new Discord.Client();
var app: firebase.app.App = firebase.initializeApp(ConfigFile.configfb);

client.on("ready", () => { 
    console.log("Ready to go!!!");
    readyFNs.FnPeriodic(client);
});
client.on("message", async msg => {
    mBOT.menuBOT(msg);
});
client.on('messageReactionAdd', async (reaction, user) => {
    rolesFN.ponerRoles(reaction, user);
    //console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});
client.on('messageReactionRemove', async (reaction, user) => {
    rolesFN.quiteRoles(reaction, user);
    //console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`); 
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if(oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.user.bot)) { firebase.database().ref('/Users/').child(newMember.id).update({ lastCon: new Date() }); } 
    else if(newUserChannel === undefined){ /*Leaves VC*/ }
  })
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
//#region help code
    //if(!msg.content.startsWith(ConfigFile.config.prefix) + `quien es el más puto?`) { msg.channel.send(`JERE`); }
    //msg.channel.send(`${msg.author.username} just used a command!`);
    //let args = msg.content.split("").slice(8);
    //.then((sendEmbed: any) => { sendEmbed.react("❎"); sendEmbed.react("✅"); }).catch(err => {alert(err)});
    //msg.send(`WELCOME ${newMember.user.username}`, { tts: true });
//#endregion