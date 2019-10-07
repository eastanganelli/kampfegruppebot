"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("./profile");
const users_1 = require("./users");
const textos_1 = require("./textos");
const roleARR = ['521184706142797834', '517169596059615252', '517171083384979456', '521709081757745172', '521709251941629975', '517171515071135764', '521709396863090698'];
const RepreARR = ['614411015236616206', '614411509036089346', '614410633282191371'], candidato = '521709396863090698', invitado = '533069497561513994';
function reactiones(reaction, user) {
    const guildMember = reaction.message.guild.members.get(user.id);
    if (!user.bot) {
        switch (reaction.message.channel.id) {
            case '614258469066768424': {
                switch (reaction.emoji.name) {
                    case "✏": {
                        profile_1.CargarPerfil(user, reaction);
                        reaction.remove(user.id);
                        break;
                    }
                    case "🔞": {
                        guildMember.addRole('623668486060638228');
                        break;
                    }
                }
                break;
            }
            case '611501042210963456': {
                switch (reaction.emoji.name) {
                    case "✅": {
                        profile_1.CargarPerfil(user, reaction);
                        reaction.remove(user.id);
                        break;
                    }
                    case "❌": {
                        users_1.kickUsuarioByMsg(user.id, reaction.message.guild, textos_1.kmpfKicktxt.reglasX);
                        reaction.remove(user.id);
                        break;
                    }
                }
                break;
            }
        }
    }
}
exports.reactiones = reactiones;
function selecRole(guildMember, gRole) {
    guildMember.addRole(gRole);
    if (!sinRango(guildMember)) {
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
function sinRango(guildMember) {
    for (let role_ of roleARR) {
        if (guildMember.roles.has(role_)) {
            return true;
        }
    }
    return false;
}
exports.sinRango = sinRango;
function quiteRoles(reaction, user) {
    const guildMember = reaction.message.guild.members.get(user.id);
    if (reaction.message.channel.id === '614258469066768424' && !user.bot) {
        switch (reaction.emoji.name) {
            case "🔞": {
                guildMember.removeRole('623668486060638228');
                break;
            }
        }
    }
}
exports.quiteRoles = quiteRoles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFDekMsbUNBQTJDO0FBQzNDLHFDQUF1QztBQUV2QyxNQUFNLE9BQU8sR0FBRyxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDLENBQUM7QUFDM0ssTUFBTSxRQUFRLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxFQUFFLFNBQVMsR0FBRyxvQkFBb0IsRUFBRSxRQUFRLEdBQUcsb0JBQW9CLENBQUM7QUFDdkosU0FBZ0IsVUFBVSxDQUFDLFFBQWEsRUFBRSxJQUFTO0lBQy9DLE1BQU0sV0FBVyxHQUFRLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLElBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1YsUUFBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDaEMsS0FBSyxvQkFBb0IsQ0FBQyxDQUFBO2dCQUN0QixRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUN4QixLQUFLLEdBQUcsQ0FBQyxDQUFFO3dCQUFFLHNCQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7b0JBQzdFLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUFJLE1BQU07cUJBQUU7aUJBRXZFO2dCQUFDLE1BQU07YUFD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