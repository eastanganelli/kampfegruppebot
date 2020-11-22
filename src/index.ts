//#region IMPORTS
import * as Discord from "discord.js";
import { config } from "./config";
import * as readyFNs from "./periodic";
import { reactiones, quiteRoles } from "./roles";
import { menuBOT } from "./msg";
import { lastconPUT } from "./api";
import { AFKch } from "./const";
//import { noboroles } from "./const";
//#endregion

export const client: Discord.Client = new Discord.Client();

client.on("ready", () => { 
    console.log("Ready to go!!!");
    readyFNs.FnPeriodic(client);
});
client.on("guildMemberAdd", member => {  });
client.on("message", async (msg) => {
    if(msg.author.bot) return;
    menuBOT(msg);
});
client.on('messageReactionAdd', async (reaction, user) => {
    if(!user.bot)
        reactiones(reaction, user);
});
client.on('messageReactionRemove', async (reaction, user) => {
    if(!user.bot)
        quiteRoles(reaction, user);
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.member, oldUserChannel = oldMember.member;
    if(oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.member?.user.bot) && (oldMember.channelID != AFKch && newMember.channelID != AFKch)) { 
        /*let flag: boolean = false;
        for(let i=0; i<noboroles.length; i++)
            if(newMember.roles.has(noboroles[i])) flag = true;

        if(!flag) */
            lastconPUT(newMember.id);
    } 
    else if(newUserChannel === undefined) { /*Leaves VC*/ }
});
client.on("presenceUpdate", (oldMember, newMember) => {
    /*if(oldMember.presence.status !== newMember.presence.status)
        console.log(newMember.user.username + ' is now ' + newMember.presence.status); */
});
client.login(config.token);