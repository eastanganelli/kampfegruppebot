import * as profileFn from "./profile";

const roleARR = ['521709396863090698', '517171515071135764', '521709251941629975', '521709081757745172', '517171083384979456', '517169596059615252'];
const RepreARR = ['614411015236616206', '614411509036089346', '614410633282191371'], candidato = '521709396863090698', invitado = '533069497561513994';
export function ponerRoles(reaction: any, user: any) {
    const guildMember: any = reaction.message.guild.members.get(user.id);
    if(reaction.message.channel.id === '614258469066768424' && !user.bot ) {
        switch(reaction.emoji.name) {
            case "🆕":  { profileFn.CargarPerfil(user, reaction); reaction.remove(user.id); break; }
            case "📝":  { user.sendMessage('Función de Actualización de _perfil_ no habilitada aún'); reaction.remove(user.id); break; }
            case "bf1":  { selecRole(guildMember, '614411015236616206'); break; }
            case "bf4":  { selecRole(guildMember, '614411509036089346'); break; }
            case "bf5":  { selecRole(guildMember, '614410633282191371'); break; }
            case "ets2": { selecRole(guildMember, '614556408524046371'); break; }
            case "gtav": { selecRole(guildMember, '614556113798561843'); break; }
            case "wt":   { selecRole(guildMember, '614555777402667008'); break; }
        }
    }
}
function selecRole(guildMember: any, gRole: any) {
    guildMember.addRole(gRole);
    if(!sinRango(guildMember, roleARR)) {
        let flag: boolean = false;
        console.log('SIN RANGO')
        for(let r_ of RepreARR) {
            if(r_ == gRole) {
                if(guildMember.roles.has(invitado)) { guildMember.removeRole(invitado); }
                guildMember.addRole(candidato);
                flag = true;
            }
        } if(!flag) { guildMember.addRole(invitado); }
    }
}
function sinRango(guildMember: any, roles: any) {
    for(let role_ of roles) {
        if(guildMember.roles.has(role_)) { return true; }
    } return false;
}
export function quiteRoles(reaction: any, user: any) {
    const guildMember: any = reaction.message.guild.members.get(user.id);
    if(reaction.message.channel.id === '614258469066768424' && !user.bot ) {
        switch(reaction.emoji.name) {
            case "bf1":  { guildMember.removeRole('614411015236616206'); break; }
            case "bf4":  { guildMember.removeRole('614411509036089346'); break; }
            case "bf5":  { guildMember.removeRole('614410633282191371'); break; }
            case "ets2": { guildMember.removeRole('614556408524046371'); break; }
            case "gtav": { guildMember.removeRole('614556113798561843'); break; }
            case "wt":   { guildMember.removeRole('614555777402667008'); break; }
        }
    }
}