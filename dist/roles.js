"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profileFn = require("./profile");
const roleARR = ['521709396863090698', '517171515071135764', '521709251941629975', '521709081757745172', '517171083384979456', '517169596059615252'];
const RepreARR = ['614411015236616206', '614411509036089346', '614410633282191371'], candidato = '521709396863090698', invitado = '533069497561513994';
function ponerRoles(reaction, user) {
    const guildMember = reaction.message.guild.members.get(user.id);
    if (reaction.message.channel.id === '614258469066768424' && !user.bot) {
        switch (reaction.emoji.name) {
            case "🆕": {
                profileFn.CargarPerfil(user, reaction);
                reaction.remove(user.id);
                break;
            }
            case "📝": {
                user.sendMessage('Función de Actualización de _perfil_ no habilitada aún');
                reaction.remove(user.id);
                break;
            }
            case "bf1": {
                selecRole(guildMember, '614411015236616206');
                break;
            }
            case "bf4": {
                selecRole(guildMember, '614411509036089346');
                break;
            }
            case "bf5": {
                selecRole(guildMember, '614410633282191371');
                break;
            }
            case "ets2": {
                selecRole(guildMember, '614556408524046371');
                break;
            }
            case "gtav": {
                selecRole(guildMember, '614556113798561843');
                break;
            }
            case "wt": {
                selecRole(guildMember, '614555777402667008');
                break;
            }
        }
    }
}
exports.ponerRoles = ponerRoles;
function selecRole(guildMember, gRole) {
    guildMember.addRole(gRole);
    if (!sinRango(guildMember, roleARR)) {
        let flag = false;
        console.log('SIN RANGO');
        for (let r_ of RepreARR) {
            if (r_ == gRole) {
                if (guildMember.roles.has(invitado)) {
                    guildMember.removeRole(invitado);
                }
                guildMember.addRole(candidato);
                flag = true;
            }
        }
        if (!flag) {
            guildMember.addRole(invitado);
        }
    }
}
function sinRango(guildMember, roles) {
    for (let role_ of roles) {
        if (guildMember.roles.has(role_)) {
            return true;
        }
    }
    return false;
}
function quiteRoles(reaction, user) {
    const guildMember = reaction.message.guild.members.get(user.id);
    if (reaction.message.channel.id === '614258469066768424' && !user.bot) {
        switch (reaction.emoji.name) {
            case "bf1": {
                guildMember.removeRole('614411015236616206');
                break;
            }
            case "bf4": {
                guildMember.removeRole('614411509036089346');
                break;
            }
            case "bf5": {
                guildMember.removeRole('614410633282191371');
                break;
            }
            case "ets2": {
                guildMember.removeRole('614556408524046371');
                break;
            }
            case "gtav": {
                guildMember.removeRole('614556113798561843');
                break;
            }
            case "wt": {
                guildMember.removeRole('614555777402667008');
                break;
            }
        }
    }
}
exports.quiteRoles = quiteRoles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBdUM7QUFFdkMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JKLE1BQU0sUUFBUSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxTQUFTLEdBQUcsb0JBQW9CLEVBQUUsUUFBUSxHQUFHLG9CQUFvQixDQUFDO0FBQ3ZKLFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUc7UUFDbkUsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUN4RixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsd0RBQXdELENBQUMsQ0FBQztnQkFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDNUgsS0FBSyxLQUFLLENBQUMsQ0FBRTtnQkFB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