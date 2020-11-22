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
    if (!user.bot)
        roles_1.reactiones(reaction, user);
}));
exports.client.on('messageReactionRemove', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.bot)
        roles_1.quiteRoles(reaction, user);
}));
exports.client.on('voiceStateUpdate', (oldMember, newMember) => {
    var _a;
    let newUserChannel = newMember.member, oldUserChannel = oldMember.member;
    if (oldUserChannel === undefined && newUserChannel !== undefined && !((_a = newMember.member) === null || _a === void 0 ? void 0 : _a.user.bot) && (oldMember.channelID != const_1.AFKch && newMember.channelID != const_1.AFKch)) {
        api_1.lastconPUT(newMember.id);
    }
    else if (newUserChannel === undefined) { }
});
exports.client.on("presenceUpdate", (oldMember, newMember) => {
});
exports.client.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyx1Q0FBdUM7QUFDdkMsbUNBQWlEO0FBQ2pELCtCQUFnQztBQUNoQywrQkFBbUM7QUFDbkMsbUNBQWdDO0FBSW5CLFFBQUEsTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUzRCxjQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlCLFFBQVEsQ0FBQyxVQUFVLENBQUMsY0FBTSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUMsY0FBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxHQUFHLEVBQUUsRUFBRTtJQUMvQixJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRztRQUFFLE9BQU87SUFDMUIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3JELElBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztRQUNSLGtCQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3hELElBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztRQUNSLGtCQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFOztJQUNuRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3pFLElBQUcsY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLENBQUMsT0FBQyxTQUFTLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLGFBQUssSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLGFBQUssQ0FBQyxFQUFFO1FBTTVKLGdCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2hDO1NBQ0ksSUFBRyxjQUFjLEtBQUssU0FBUyxFQUFFLEdBQWlCO0FBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtBQUdyRCxDQUFDLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=