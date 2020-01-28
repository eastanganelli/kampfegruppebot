//#region IMPORTS
//#region Plug

//#endregion
//#region KMPF
import { CargarPerfil } from "./profile";
import { kickUsuarioByMsg, addToWpp, addFCumple } from "./users";
import { kmpfKicktxt, kmpfMSG } from "./const";
import { fOnVac, usersNoRegis } from "./coroneles";
//#endregion
//#endregion

export function reactiones(reaction: any, user: any) {
    const guildMember: any = reaction.message.guild.members.get(user.id);
    if(!user.bot) {
        switch(reaction.message.channel.id) {
            case kmpfMSG.kmpfroles.MC:{
                switch(reaction.emoji.name) {
                    case "🎂":  { addFCumple(user.id); reaction.remove(user.id); break; }
                    case "☎️":  { addToWpp(user.id); reaction.remove(user.id); break; }
                    case "🔞":  { guildMember.addRole('623668486060638228'); break; }
                } break;
            } case kmpfMSG.kmpfrules.MC: {
                switch(reaction.emoji.name){
                    case "✅":  { guildMember.addRole('521709396863090698'); break; }
                    case "❌":  { kickUsuarioByMsg(user.id, reaction.message, kmpfKicktxt.reglasX); break; }
                } reaction.remove(user.id);
                break;
            } case kmpfMSG.kmpfCoroneles.MC: {
                switch(reaction.emoji.name){
                    case "🏠":  { fOnVac(user.id, false); break; }
                    case "⛱":  { fOnVac(user.id, true); break; }
                    case "🔴":  { usersNoRegis(reaction.message.channel); break; }
                } reaction.remove(user.id);
                break;
            }
        }
    }
}
export function quiteRoles(reaction: any, user: any) {
    const guildMember: any = reaction.message.guild.members.get(user.id);
    if(reaction.message.channel.id === '614258469066768424' && !user.bot ) {
        switch(reaction.emoji.name) {
            case "🔞":  { guildMember.removeRole('623668486060638228'); break; }
        }
    }
}