//#region IMPORTS
//#region Plug

//#endregion
//#region KMPF
import { CargarPerfil } from "./profile";
import { kickUsuarioByMsg } from "./users";
import { kmpfKicktxt } from "./const";
import { fOnVac, usersNoRegis } from "./coroneles";
//#endregion
//#endregion

const roleARR = ['521184706142797834', '517169596059615252', '517171083384979456', '521709081757745172', '521709251941629975', '517171515071135764', '521709396863090698'];
export function reactiones(reaction: any, user: any) {
    const guildMember: any = reaction.message.guild.members.get(user.id);
    if(!user.bot) {
        switch(reaction.message.channel.id) {
            case '614258469066768424':{
                switch(reaction.emoji.name) {
                    case "✏":  { CargarPerfil(user, reaction); break; }
                    case "🔞":  { guildMember.addRole('623668486060638228'); break; }
                } reaction.remove(user.id); 
                break;
            } case '611501042210963456': {
                switch(reaction.emoji.name){
                    case "✅":  { guildMember.addRole('521709396863090698'); break; }
                    case "❌":  { kickUsuarioByMsg(user.id, reaction.message, kmpfKicktxt.reglasX); break; }
                } reaction.remove(user.id);
                break;
            } case '620642948660330506': {
                switch(reaction.emoji.name){
                    case "🏠":  { fOnVac(user.id, false); reaction.remove(user.id); break; }
                    case "⛱":  { fOnVac(user.id, true); reaction.remove(user.id); break; }
                    case "🔴":  { usersNoRegis(reaction.message.channel); reaction.remove(user.id); break; }
                } break;
            }
        }
    }
}
export function sinRango(guildMember: any) {
    for(let role_ of roleARR) {
        if(guildMember.roles.has(role_)) { return true; }
    } return false;
}
export function quiteRoles(reaction: any, user: any) {
    const guildMember: any = reaction.message.guild.members.get(user.id);
    if(reaction.message.channel.id === '614258469066768424' && !user.bot ) {
        switch(reaction.emoji.name) {
            case "🔞":  { guildMember.removeRole('623668486060638228'); break; }
        }
    }
}