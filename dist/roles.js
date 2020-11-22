"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quiteRoles = exports.reactiones = void 0;
const users_1 = require("./users");
const const_1 = require("./const");
const api_1 = require("./api");
function reactiones(reaction, user) {
    var _a;
    const guildMember = (_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.member(user.id);
    if (!user.bot) {
        switch (reaction.message.channel.id) {
            case const_1.kmpfMSG.kmpfroles.MC: {
                switch (reaction.emoji.name) {
                    case "🎂": {
                        users_1.addFCumple(user.id);
                        reaction.users.remove(user.id);
                        break;
                    }
                    case "☎️": {
                        users_1.addToWpp(user.id);
                        reaction.users.remove(user.id);
                        break;
                    }
                    case "🔞": {
                        guildMember.roles.add('623668486060638228');
                        break;
                    }
                }
                break;
            }
            case const_1.kmpfMSG.kmpfrules.MC: {
                switch (reaction.emoji.name) {
                    case "✅": {
                        api_1.userPOST({ id: user.id });
                        guildMember.roles.add('521709396863090698');
                        break;
                    }
                    case "❌": {
                        users_1.kickUsuarioByMsg(user.id, reaction.message, const_1.kmpfKicktxt.reglasX);
                        break;
                    }
                }
                reaction.users.remove(user.id);
                break;
            }
        }
    }
}
exports.reactiones = reactiones;
function quiteRoles(reaction, user) {
    var _a;
    const guildMember = (_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.member(user.id);
    if (reaction.message.channel.id === '614258469066768424' && !user.bot) {
        switch (reaction.emoji.name) {
            case "🔞": {
                guildMember.roles.remove('623668486060638228');
                break;
            }
        }
    }
}
exports.quiteRoles = quiteRoles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbUNBQWlFO0FBQ2pFLG1DQUErQztBQUMvQywrQkFBaUM7QUFHakMsU0FBZ0IsVUFBVSxDQUFDLFFBQWEsRUFBRSxJQUFTOztJQUMvQyxNQUFNLFdBQVcsU0FBd0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakYsSUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixRQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNoQyxLQUFLLGVBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3RCLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ3hCLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsa0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7b0JBQzNFLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLE1BQU07cUJBQUU7b0JBQzNFLEtBQUssSUFBSSxDQUFDLENBQUU7d0JBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFBQyxNQUFNO3FCQUFFO2lCQUN0RTtnQkFBQyxNQUFNO2FBQ1g7WUFBQyxLQUFLLGVBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7b0JBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUU7d0JBQ1AsY0FBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUMxQixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUM1QyxNQUFNO3FCQUNUO29CQUNELEtBQUssR0FBRyxDQUFDLENBQUU7d0JBQUUsd0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQUMsTUFBTTtxQkFBRTtpQkFDMUY7Z0JBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO2FBQ1Q7U0FRSjtLQUNKO0FBQ0wsQ0FBQztBQTlCRCxnQ0E4QkM7QUFDRCxTQUFnQixVQUFVLENBQUMsUUFBYSxFQUFFLElBQVM7O0lBQy9DLE1BQU0sV0FBVyxTQUF3QixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssMENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRixJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUc7UUFDbkUsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO2dCQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1NBQ3pFO0tBQ0o7QUFDTCxDQUFDO0FBUEQsZ0NBT0MifQ==