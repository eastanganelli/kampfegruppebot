"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quiteRoles = exports.reactiones = void 0;
const users_1 = require("./users");
const const_1 = require("./const");
const api_1 = require("./api");
function reactiones(reaction, user) {
    const guildMember = reaction.message.guild.members.get(user.id);
    if (!user.bot) {
        switch (reaction.message.channel.id) {
            case const_1.kmpfMSG.kmpfroles.MC: {
                switch (reaction.emoji.name) {
                    case "🎂": {
                        users_1.addFCumple(user.id);
                        reaction.remove(user.id);
                        break;
                    }
                    case "☎️": {
                        users_1.addToWpp(user.id);
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
            case const_1.kmpfMSG.kmpfrules.MC: {
                switch (reaction.emoji.name) {
                    case "✅": {
                        api_1.userPOST({ id: user.id });
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
        }
    }
}
exports.reactiones = reactiones;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQWlFO0FBQ2pFLG1DQUErQztBQUMvQywrQkFBaUM7QUFHakMsU0FBZ0IsVUFBVSxDQUFDLFFBQWEsRUFBRSxJQUFTO0lBQy9DLE1BQU0sV0FBVyxHQUFRLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLElBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1YsUUFBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDaEMsS0FBSyxlQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUN0QixRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO3dCQUFFLGtCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7b0JBQ3JFLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUMsTUFBTTtxQkFBRTtvQkFDbkUsS0FBSyxJQUFJLENBQUMsQ0FBRTt3QkFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7d0JBQUMsTUFBTTtxQkFBRTtpQkFDcEU7Z0JBQUMsTUFBTTthQUNYO1lBQUMsS0FBSyxlQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDO29CQUN2QixLQUFLLEdBQUcsQ0FBQyxDQUFFO3dCQUNQLGNBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUMxQyxNQUFNO3FCQUNUO29CQUNELEtBQUssR0FBRyxDQUFDLENBQUU7d0JBQUUsd0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQUMsTUFBTTtxQkFBRTtpQkFDMUY7Z0JBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNCLE1BQU07YUFDVDtTQVFKO0tBQ0o7QUFDTCxDQUFDO0FBOUJELGdDQThCQztBQUNELFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUc7UUFDbkUsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7U0FDdkU7S0FDSjtBQUNMLENBQUM7QUFQRCxnQ0FPQyJ9