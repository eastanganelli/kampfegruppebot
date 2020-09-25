"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const Discord = require("discord.js");
const config_1 = require("./config");
const readyFNs = require("./periodic");
const roles_1 = require("./roles");
const msg_1 = require("./msg");
const api_1 = require("./api");
const const_1 = require("./const");
exports.client = new Discord.Client();
exports.client.on("ready", () => {
    console.log("Ready to go!!!");
    readyFNs.FnPeriodic(exports.client);
});
exports.client.on("guildMemberAdd", member => { });
exports.client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.author.bot)
        return;
    msg_1.menuBOT(msg);
}));
exports.client.on('messageReactionAdd', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    roles_1.reactiones(reaction, user);
}));
exports.client.on('messageReactionRemove', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    roles_1.quiteRoles(reaction, user);
}));
exports.client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if (oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.user.bot) && (oldMember.voiceChannelID != '496525236888535042' && newMember.voiceChannelID != '496525236888535042')) {
        let flag = false;
        for (let i = 0; i < const_1.noboroles.length; i++)
            if (newMember.roles.has(const_1.noboroles[i]))
                flag = true;
        if (!flag)
            api_1.lastconPUT(newMember.id);
    }
    else if (newUserChannel === undefined) { }
});
exports.client.on("presenceUpdate", (oldMember, newMember) => {
});
exports.client.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyx1Q0FBdUM7QUFDdkMsbUNBQWlEO0FBQ2pELCtCQUFnQztBQUNoQywrQkFBbUM7QUFDbkMsbUNBQW9DO0FBR3ZCLFFBQUEsTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUzRCxjQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlCLFFBQVEsQ0FBQyxVQUFVLENBQUMsY0FBTSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUMsY0FBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBTSxHQUFHLEVBQUMsRUFBRTtJQUM3QixJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRztRQUFFLE9BQU87SUFDMUIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3JELGtCQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3hELGtCQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ25ELElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxZQUFZLEVBQUUsY0FBYyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7SUFDckYsSUFBRyxjQUFjLEtBQUssU0FBUyxJQUFJLGNBQWMsS0FBSyxTQUFTLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxJQUFJLG9CQUFvQixJQUFJLFNBQVMsQ0FBQyxjQUFjLElBQUksb0JBQW9CLENBQUMsRUFBRTtRQUNoTSxJQUFJLElBQUksR0FBWSxLQUFLLENBQUM7UUFDMUIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLGlCQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNoQyxJQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQztRQUV0RCxJQUFHLENBQUMsSUFBSTtZQUNKLGdCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2hDO1NBQ0ksSUFBRyxjQUFjLEtBQUssU0FBUyxFQUFFLEdBQWlCO0FBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtBQUdyRCxDQUFDLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=