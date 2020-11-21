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
exports.FnPeriodic = void 0;
const Discord = require("discord.js");
const cron_1 = require("cron");
const const_1 = require("./const");
const coroneles_1 = require("./coroneles");
const users_1 = require("./users");
let minute_ = 60000, hour_ = 60, oneDayinSec = 1000 * 3600 * 24, inac = 20, inacRep = 3;
let stCtrl = [false, false];
function FnPeriodic(client) {
    kmpfFB(client);
    welcomeTC(client);
    kmpfTC(client);
    kmpfCoronelesTC(client);
    cronJOB(client);
}
exports.FnPeriodic = FnPeriodic;
function kmpfFB(client) { console.log('BOT DB Connected'); }
function cronJOB(client) {
    let cronFuhrer;
    cronFuhrer = new cron_1.CronJob(const_1.nextFuhrerCron, () => __awaiter(this, void 0, void 0, function* () {
        try {
            coroneles_1.nextFuhrer(client);
        }
        catch (e) {
            console.log(e);
        }
        if (!cronFuhrer.running)
            cronFuhrer.start();
    }));
    let cronBirthday;
    cronBirthday = new cron_1.CronJob(const_1.birthdayCron, () => __awaiter(this, void 0, void 0, function* () {
        try {
            users_1.checkIfCumple(client);
        }
        catch (e) {
            console.log(e);
        }
        if (!cronBirthday.running)
            cronBirthday.start();
    }));
    let cronAFKusers;
    cronBirthday = new cron_1.CronJob(const_1.AFKusersCron, () => __awaiter(this, void 0, void 0, function* () {
        try {
            users_1.isAFK(client);
        }
        catch (e) {
            console.log(e);
        }
        if (!cronAFKusers.running)
            cronAFKusers.start();
    }));
}
function welcomeTC(client) {
    const_1.getChannelMsgs(const_1.kmpfMSG.kmpfrules.MC, 1);
    let msg = new Discord.MessageEmbed, rules_ = const_1.kmpfMSG.kmpfrules.Arr[0], emojiArr = new Array(0);
    msg.setTitle(rules_.titulo);
    msg.setDescription(rules_.desc);
    for (let rule of rules_.data) {
        msg.addField(rule.texto, rule.desc);
        if (rule.emoji != '-')
            emojiArr.push(rule.emoji);
    }
    client.channels.get(const_1.kmpfMSG.kmpfrules.MC).send(msg).then((sendEmbed) => __awaiter(this, void 0, void 0, function* () { if (emojiArr.length > 0) {
        for (let e_ of emojiArr) {
            yield sendEmbed.react(String(e_));
        }
    } }));
}
function kmpfTC(client) {
    const_1.getChannelMsgs(const_1.kmpfMSG.kmpfroles.MC, 4);
    for (let t_ of const_1.kmpfMSG.kmpfroles.Arr) {
        let embedMSG = new Discord.MessageEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr = new Array(0);
        for (let d_ of t_.data) {
            if (d_.emoji != '') {
                embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false);
                emojiArr.push(d_.emoji);
            }
            else {
                embedMSG.addField(d_.texto, d_.desc, false);
            }
        }
        client.channels.get(const_1.kmpfMSG.kmpfroles.MC).send(embedMSG).then((sendEmbed) => __awaiter(this, void 0, void 0, function* () { if (emojiArr.length > 0) {
            for (let e_ of emojiArr) {
                yield sendEmbed.react(String(e_));
            }
        } }));
    }
}
function kmpfCoronelesTC(client) {
    const_1.getChannelMsgs(const_1.kmpfMSG.kmpfCoroneles.MC, 50);
    for (let t_ of const_1.kmpfMSG.kmpfCoroneles.Arr) {
        let embedMSG = new Discord.MessageEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr = new Array(0);
        for (let d_ of t_.data) {
            if (d_.emoji != '') {
                embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false);
                emojiArr.push(d_.emoji);
            }
            else {
                embedMSG.addField(d_.texto, d_.desc, false);
            }
        }
        client.channels.get(const_1.kmpfMSG.kmpfCoroneles.MC).send(embedMSG).then((sendEmbed) => __awaiter(this, void 0, void 0, function* () { if (emojiArr.length > 0) {
            for (let e_ of emojiArr) {
                yield sendEmbed.react(String(e_));
            }
        } }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyaW9kaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGVyaW9kaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUcvQixtQ0FBOEY7QUFDOUYsMkNBQXlDO0FBQ3pDLG1DQUErQztBQUkvQyxJQUFJLE9BQU8sR0FBVyxLQUFLLEVBQWtCLEtBQUssR0FBRyxFQUFFLEVBQUUsV0FBVyxHQUFHLElBQUksR0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFFLElBQUksR0FBVyxFQUFFLEVBQUUsT0FBTyxHQUFXLENBQUMsQ0FBQztBQUM1SCxJQUFJLE1BQU0sR0FBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFNUMsU0FBZ0IsVUFBVSxDQUFDLE1BQVc7SUFFbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNmLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV4QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQVJELGdDQVFDO0FBQ0QsU0FBUyxNQUFNLENBQUMsTUFBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakUsU0FBUyxPQUFPLENBQUMsTUFBVztJQUV4QixJQUFJLFVBQW1CLENBQUM7SUFDeEIsVUFBVSxHQUFHLElBQUksY0FBTyxDQUFDLHNCQUFjLEVBQUUsR0FBUSxFQUFFO1FBQy9DLElBQUk7WUFDQSxzQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RCO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ25CLFVBQVUs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