//#region IMPORTS
import * as Discord from "discord.js";
import { kickUsuarioByMsg, addToWpp, addFCumple } from "./users";
import { kmpfKicktxt, kmpfMSG } from "./const";
import { userPOST } from "./api";
//#endregion

export function reactiones(reaction: any, user: any) {
    const guildMember: Discord.GuildMember = reaction.message.guild?.member(user.id);
    if(!user.bot) {
        switch(reaction.message.channel.id) {
            case kmpfMSG.kmpfroles.MC:{
                switch(reaction.emoji.name) {
                    case "🎂":  { addFCumple(user.id); reaction.users.remove(user.id); break; }
                    case "☎️":  { addToWpp(user.id);   reaction.users.remove(user.id); break; }
                    case "🔞":  { guildMember.roles.add('623668486060638228'); break; }
                } break;
            } case kmpfMSG.kmpfrules.MC: {
                switch(reaction.emoji.name){
                    case "✅":  { 
                        userPOST({ id: user.id });
                        guildMember.roles.add('521709396863090698'); 
                        break;
                    }
                    case "❌":  { kickUsuarioByMsg(user.id, reaction.message, kmpfKicktxt.reglasX); break; }
                } reaction.users.remove(user.id);
                break;
            } /*case kmpfMSG.kmpfCoroneles.MC: {
                switch(reaction.emoji.name){
                    case "🏠":  { fOnVac(user.id, false); break; }
                    case "⛱":  { fOnVac(user.id, true); break; }
                    case "🔴":  { usersNoRegis(reaction.message.channel); break; }
                } reaction.users.remove(user.id);
                break;
            }*/
        }
    }
}
export function quiteRoles(reaction: any, user: any) {
    const guildMember: Discord.GuildMember = reaction.message.guild?.member(user.id);
    if(reaction.message.channel.id === '614258469066768424' && !user.bot ) {
        switch(reaction.emoji.name) {
            case "🔞":  { guildMember.roles.remove('623668486060638228'); break; }
        }
    }
}