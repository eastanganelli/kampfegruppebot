"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("./profile");
const users_1 = require("./users");
const const_1 = require("./const");
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
                        break;
                    }
                    case "🔞": {
                        guildMember.addRole('623668486060638228');
                        break;
                    }
                }
                reaction.remove(user.id);
                break;
            }
            case '611501042210963456': {
                switch (reaction.emoji.name) {
                    case "✅": {
                        profile_1.CargarPerfil(user, reaction);
                        break;
                    }
                    case "❌": {
                        users_1.kickUsuarioByMsg(user.id, reaction.message, const_1.kmpfKicktxt.reglasX);
                        break;
                    }
                }
                reaction.remove(user.id);
                break;
            }
            case '620642948660330506': {
                switch (reaction.emoji.name) {
                    case "🏠": {
                        coroneles_1.fOnVac(user.id, false);
                        reaction.remove(user.id);
                        break;
                    }
                    case "⛱": {
                        coroneles_1.fOnVac(user.id, true);
                        reaction.remove(user.id);
                        break;
                    }
                    case "🔴": {
                        coroneles_1.usersNoRegis(reaction.message.channel);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSx1Q0FBeUM7QUFDekMsbUNBQTJDO0FBQzNDLG1DQUFzQztBQUN0QywyQ0FBbUQ7QUFJbkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQzNLLE1BQU0sUUFBUSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxTQUFTLEdBQUcsb0JBQW9CLEVBQUUsUUFBUSxHQUFHLG9CQUFvQixDQUFDO0FBQ3ZKLFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNWLFFBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEtBQUssb0JBQW9CLENBQUMsQ0FBQTtnQkFDdEIsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDeEIsS0FBSyxHQUFHLENBQUMsQ0FBRTt3QkFBRSxzQkFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO29CQUNuRCxLQUFLLElBQUksQ0FBQyxDQUFFO3dCQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO2lCQUNwRTtnQkFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztn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