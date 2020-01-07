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
const firebase = require("firebase/app");
require("firebase/auth");
const Discord = require("discord.js");
const const_1 = require("./const");
const devs_1 = require("./devs");
const coroneles_1 = require("./coroneles");
const users_1 = require("./users");
let minute_ = 60000, hour_ = 60, oneDayinSec = 1000 * 3600 * 24, inac = 20, inacRep = 3;
function FnPeriodic(client) {
    kmpfFB(client);
    welcomeTC(client);
    kmpfTC(client);
    kmpfCoronelesTC(client);
    devs_1.BOTstate(client);
    kmpfPeriodic(client);
}
exports.FnPeriodic = FnPeriodic;
function kmpfFB(client) {
    firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id)) * (Number(client.guilds.find((g_) => g_.id === const_1.kmpfID).id)))))
        .then(() => { console.log('BOT DB Connected'); }).catch(Err => { console.log(Err); });
}
function kmpfPeriodic(client) {
    setInterval(() => {
    }, 1 * minute_);
    setInterval(() => {
        weekDay(client);
        users_1.checkIfCumple(client);
    }, oneDayinSec);
}
function welcomeTC(client) {
    client.channels.get(const_1.kmpfMSG.kmpfrules.MC).fetchMessages({ limit: 1 }).then((messages) => { messages.forEach((msg) => { msg.delete(); }); }).catch(console.error);
    let msg = new Discord.RichEmbed, rules_ = const_1.kmpfMSG.kmpfrules.Arr[0], emojiArr = new Array(0);
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
    client.channels.get(const_1.kmpfMSG.kmpfroles.MC).fetchMessages({ limit: 4 }).then((messages) => { messages.forEach((msg) => { msg.delete(); }); }).catch(console.error);
    for (let t_ of const_1.kmpfMSG.kmpfroles.Arr) {
        let embedMSG = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr = new Array(0);
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
    client.channels.get(const_1.kmpfMSG.kmpfCoroneles.MC).fetchMessages({ limit: 50 }).then((messages) => { messages.forEach((msg) => { msg.delete(); }); }).catch(console.error);
    for (let t_ of const_1.kmpfMSG.kmpfCoroneles.Arr) {
        let embedMSG = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr = new Array(0);
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
function weekDay(client) {
    switch ((new Date).getDay()) {
        case 0: {
            coroneles_1.nextFuhrer(client);
            break;
        }
        case 1: {
            users_1.checkIfAFK(client);
            break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyaW9kaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGVyaW9kaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBeUM7QUFDekMseUJBQXVCO0FBQ3ZCLHNDQUFzQztBQUd0QyxtQ0FBMEM7QUFDMUMsaUNBQWtDO0FBQ2xDLDJDQUF5QztBQUN6QyxtQ0FBb0Q7QUFJcEQsSUFBSSxPQUFPLEdBQVcsS0FBSyxFQUFrQixLQUFLLEdBQUcsRUFBRSxFQUFFLFdBQVcsR0FBRyxJQUFJLEdBQUMsSUFBSSxHQUFDLEVBQUUsRUFBRSxJQUFJLEdBQVcsRUFBRSxFQUFFLE9BQU8sR0FBVyxDQUFDLENBQUM7QUFFNUgsU0FBZ0IsVUFBVSxDQUFDLE1BQVc7SUFFbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNmLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV4QixlQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFURCxnQ0FTQztBQUNELFNBQVMsTUFBTSxDQUFDLE1BQVc7SUFDdkIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLDBCQUEwQixDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxjQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzSyxJQUFJLENBQUMsR0FBRyxFQUFFLEdB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