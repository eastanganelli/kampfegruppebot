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
const Discord = require("discord.js");
const firebase = require("firebase/app");
require("firebase/database");
const config_1 = require("./config");
const readyFNs = require("./periodic");
const roles_1 = require("./roles");
const msg_1 = require("./msg");
const users_1 = require("./users");
exports.client = new Discord.Client();
let app = firebase.initializeApp(config_1.configfb);
exports.client.on("ready", () => {
    console.log("Ready to go!!!");
    readyFNs.FnPeriodic(exports.client);
});
exports.client.on("guildMemberAdd", member => { });
exports.client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(msg.author.bot)) {
        yield users_1.lastConnectionusuario(msg.author.id);
    }
    if (msg.author.bot) {
        return;
    }
    msg_1.menuBOT(msg);
}));
exports.client.on('messageReactionAdd', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    roles_1.reactiones(reaction, user);
    console.log(reaction.emoji.name);
}));
exports.client.on('messageReactionRemove', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    roles_1.quiteRoles(reaction, user);
}));
exports.client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if (oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.user.bot) && (oldMember.voiceChannelID != '496525236888535042' && newMember.voiceChannelID != '496525236888535042')) {
        users_1.lastConnectionusuario(newMember.id);
    }
    else if (newUserChannel === undefined) { }
});
exports.client.on("presenceUpdate", (oldMember, newMember) => {
    if (oldMember.presence.status !== newMember.presence.status) {
        console.log(newMember.user.username + ' is now ' + newMember.presence.status);
    }
});
exports.client.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBeUM7QUFDekMseUNBQTJDO0FBQzNDLDZCQUEyQjtBQUMzQixxQ0FBNEM7QUFHNUMsdUNBQXlDO0FBQ3pDLG1DQUFpRDtBQUNqRCwrQkFBK0I7QUFDL0IsbUNBQWdEO0FBSW5DLFFBQUEsTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMzRCxJQUFJLEdBQUcsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBUSxDQUFDLENBQUM7QUFFN0QsY0FBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QixRQUFRLENBQUMsVUFBVSxDQUFDLGNBQU0sQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFBRSxHQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzVDLGNBQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQU0sR0FBRyxFQUFDLEVBQUU7SUFDN0IsSUFBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUFFLE1BQU0sNkJBQXFCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUFFO0lBQ3JFLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUs7UUFBRSxPQUFPO0tBQUU7SUFDakMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWpCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3JELGtCQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUVwQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFPLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN4RCxrQkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUUvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUNuRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxFQUFFLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQ3JGLElBQUcsY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsSUFBSSxvQkFBb0IsSUFBSSxTQUFTLENBQUMsY0FBYyxJQUFJLG9CQUFvQixDQUFDLEVBQUU7UUFBRSw2QkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7S0FBRTtTQUN2TyxJQUFHLGNBQWMsS0FBSyxTQUFTLEVBQUMsR0FBaUI7QUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ2pELElBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFVNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUFFO0FBQ3BGLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLEtBQUssQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUMifQ==