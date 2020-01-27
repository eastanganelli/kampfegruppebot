"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("./profile");
const users_1 = require("./users");
const const_1 = require("./const");
const coroneles_1 = require("./coroneles");
const roleARR = ['521184706142797834', '517169596059615252', '517171083384979456', '521709081757745172', '521709251941629975', '517171515071135764', '521709396863090698'];
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
                        guildMember.addRole('521709396863090698');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSx1Q0FBeUM7QUFDekMsbUNBQTJDO0FBQzNDLG1DQUFzQztBQUN0QywyQ0FBbUQ7QUFJbkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQzNLLFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNWLFFBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEtBQUssb0JBQW9CLENBQUMsQ0FBQTtnQkFDdEIsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDeEIsS0FBSyxHQUFHLENBQUMsQ0FBRTt3QkFBRSxzQkFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO29CQUNuRCxLQUFLLElBQUksQ0FBQyxDQUFFO3dCQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO2lCQUNwRTtnQkFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0IsTUFBTTthQUNUO1lBQUMsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUN6QixRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDO29CQUN2QixLQUFLLEdBQUcsQ0FBQyxDQUFFO3dCQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO29CQUNoRSxLQUFLLEdBQUcsQ0FBQyxDQUFFO3dCQUFFLHdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7aUJBQzFGO2dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixNQUFNO2FBQ1Q7WUFBQyxLQUFLLG9CQUFvQixDQUFDLENBQUM7Z0JBQ3pCLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7b0JBQ3ZCLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsa0JBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7b0JBQ3hFLEtBQUssR0FBRyxDQUFDLENBQUU7d0JBQUUsa0JBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7b0JBQ3RFLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsd0JBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7aUJBQzNGO2dCQUFDLE1BQU07YUFDWDtTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBekJELGdDQXlCQztBQUNELFNBQWdCLFFBQVEsQ0FBQyxXQUFnQjtJQUNyQyxLQUFJLElBQUksS0FBSyxJQUFJLE9BQU8sRUFBRTtRQUN0QixJQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7U0FBRTtLQUNwRDtJQUFDLE9BQU8sS0FBSyxDQUFDO0FBQ25CLENBQUM7QUFKRCw0QkFJQztBQUNELFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUc7UUFDbkUsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7U0FDdkU7S0FDSjtBQUNMLENBQUM7QUFQRCxnQ0FPQyJ9