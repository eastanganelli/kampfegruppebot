"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("./profile");
const users_1 = require("./users");
const textos_1 = require("./textos");
const coroneles_1 = require("./coroneles");
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
            case '620642948660330506': {
                switch (reaction.emoji.name) {
                    case "🏠": {
                        coroneles_1.fOnVac(user.id, false);
                        break;
                    }
                    case "⛱": {
                        coroneles_1.fOnVac(user.id, true);
                        break;
                    }
                    case "🔴": {
                        coroneles_1.usersNoRegis(reaction.message.channel);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFDekMsbUNBQTJDO0FBQzNDLHFDQUF1QztBQUN2QywyQ0FBbUQ7QUFFbkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQzNLLE1BQU0sUUFBUSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxTQUFTLEdBQUcsb0JBQW9CLEVBQUUsUUFBUSxHQUFHLG9CQUFvQixDQUFDO0FBQ3ZKLFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNWLFFBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEtBQUssb0JBQW9CLENBQUMsQ0FBQTtnQkFDdEIsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDeEIsS0FBSyxHQUFHLENBQUMsQ0FBRTt3QkFBRSxzQkFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO29CQUM3RSxLQUFLLElBQUksQ0FBQyxDQUFFO3dCQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFBSSxNQUFNO3FCQUFFO2lCQUV2RTtn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