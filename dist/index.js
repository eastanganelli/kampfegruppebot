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
        api_1.lastconPUT(newMember.id);
    }
    else if (newUserChannel === undefined) { }
});
exports.client.on("presenceUpdate", (oldMember, newMember) => {
});
exports.client.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyx1Q0FBdUM7QUFDdkMsbUNBQWlEO0FBQ2pELCtCQUFnQztBQUNoQywrQkFBbUM7QUFJdEIsUUFBQSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNELGNBQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxjQUFNLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEVBQUUsR0FBSSxDQUFDLENBQUMsQ0FBQztBQUM1QyxjQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFPLEdBQUcsRUFBRSxFQUFFO0lBQy9CLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQUUsT0FBTztJQUMxQixhQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDckQsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDeEQsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDbkQsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDLFlBQVksRUFBRSxjQUFjLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztJQUNyRixJQUFHLGNBQWMsS0FBSyxTQUFTLElBQUksY0FBYyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLElBQUksb0JBQW9CLElBQUksU0FBUyxDQUFDLGNBQWMsSUFBSSxvQkFBb0IsQ0FBQyxFQUFFO1FBTTVMLGdCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2hDO1NBQ0ksSUFBRyxjQUFjLEtBQUssU0FBUyxFQUFFLEdBQWlCO0FBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtBQUdyRCxDQUFDLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=