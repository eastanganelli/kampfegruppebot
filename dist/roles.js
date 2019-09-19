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
            case "🔞": {
                guildMember.addRole('623668486060638228');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBdUM7QUFFdkMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JKLE1BQU0sUUFBUSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxTQUFTLEdBQUcsb0JBQW9CLEVBQUUsUUFBUSxHQUFHLG9CQUFvQixDQUFDO0FBQ3ZKLFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUc7UUFDbkUsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUN4RixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsd0RBQXdELENBQUMsQ0FBQztnQkFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDNUgsS0FBSyxJQUFJLENBQUMsQ0FBRTtnQkFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQUksTUFBTTthQUFFO1lBQ3BFLEtBQUssS0FBSyxDQUFDLENBQUU7Z0JBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNyRSxLQUFLLEtBQUssQ0FBQyxDQUFFO2dCQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDckUsS0FBSyxLQUFLLENBQUMsQ0FBRTtnQkFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ3JFLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNyRSxLQUFLLE1BQU0sQ0FBQyxDQUFDO2dCQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDckUsS0FBSyxJQUFJLENBQUMsQ0FBRztnQkFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1NBQ3hFO0tBQ0o7QUFDTCxDQUFDO0FBZkQsZ0NBZUM7QUFDRCxTQUFTLFNBQVMsQ0FBQyxXQUFnQixFQUFFLEtBQVU7SUFDM0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixJQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsRUFBRTtRQUNoQyxJQUFJLElBQUksR0FBWSxLQUFLLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4QixLQUFJLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtZQUNwQixJQUFHLEVBQUUsSUFBSSxLQUFLLEVBQUU7Z0JBQ1osSUFBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUFFO2dCQUN6RSxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUFDLElBQUcsQ0FBQyxJQUFJLEVBQUU7WUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQUU7S0FDakQ7QUFDTCxDQUFDO0FBQ0QsU0FBUyxRQUFRLENBQUMsV0FBZ0IsRUFBRSxLQUFVO0lBQzFDLEtBQUksSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO1FBQ3BCLElBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO0tBQ3BEO0lBQUMsT0FBTyxLQUFLLENBQUM7QUFDbkIsQ0FBQztBQUNELFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUc7UUFDbkUsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUN4QixLQUFLLEtBQUssQ0FBQyxDQUFFO2dCQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDckUsS0FBSyxLQUFLLENBQUMsQ0FBRTtnQkFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ3JFLEtBQUssS0FBSyxDQUFDLENBQUU7Z0JBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNyRSxLQUFLLE1BQU0sQ0FBQyxDQUFDO2dCQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDckUsS0FBSyxNQUFNLENBQUMsQ0FBQztnQkFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ3JFLEtBQUssSUFBSSxDQUFDLENBQUc7Z0JBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtTQUN4RTtLQUNKO0FBQ0wsQ0FBQztBQVpELGdDQVlDIn0=