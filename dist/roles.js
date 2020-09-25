"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quiteRoles = exports.reactiones = void 0;
const users_1 = require("./users");
const const_1 = require("./const");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQWlFO0FBQ2pFLG1DQUErQztBQUcvQyxTQUFnQixVQUFVLENBQUMsUUFBYSxFQUFFLElBQVM7SUFDL0MsTUFBTSxXQUFXLEdBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsSUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixRQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNoQyxLQUFLLGVBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3RCLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ3hCLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsa0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUMsTUFBTTtxQkFBRTtvQkFDckUsS0FBSyxJQUFJLENBQUMsQ0FBRTt3QkFBRSxnQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO29CQUNuRSxLQUFLLElBQUksQ0FBQyxDQUFFO3dCQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO2lCQUNwRTtnQkFBQyxNQUFNO2FBQ1g7WUFBQyxLQUFLLGVBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7b0JBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUU7d0JBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7b0JBQ2hFLEtBQUssR0FBRyxDQUFDLENBQUU7d0JBQUUsd0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQUMsTUFBTTtxQkFBRTtpQkFDMUY7Z0JBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNCLE1BQU07YUFDVDtTQVFKO0tBQ0o7QUFDTCxDQUFDO0FBMUJELGdDQTBCQztBQUNELFNBQWdCLFVBQVUsQ0FBQyxRQUFhLEVBQUUsSUFBUztJQUMvQyxNQUFNLFdBQVcsR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUc7UUFDbkUsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7U0FDdkU7S0FDSjtBQUNMLENBQUM7QUFQRCxnQ0FPQyJ9