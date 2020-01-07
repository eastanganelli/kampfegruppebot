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
let minute_ = 60000, hour_ = 60, oneDayinSec = minute_ * hour_ * 24, inac = 20, inacRep = 3;
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
        coroneles_1.nextFuhrer(client);
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
            users_1.checkIfAFK(client);
            break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyaW9kaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGVyaW9kaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBeUM7QUFDekMseUJBQXVCO0FBQ3ZCLHNDQUFzQztBQUd0QyxtQ0FBMEM7QUFDMUMsaUNBQWtDO0FBQ2xDLDJDQUF5QztBQUN6QyxtQ0FBb0Q7QUFJcEQsSUFBSSxPQUFPLEdBQVcsS0FBSyxFQUFrQixLQUFLLEdBQUcsRUFBRSxFQUFFLFdBQVcsR0FBRyxPQUFPLEdBQUMsS0FBSyxHQUFDLEVBQUUsRUFBRSxJQUFJLEdBQVcsRUFBRSxFQUFFLE9BQU8sR0FBVyxDQUFDLENBQUM7QUFFaEksU0FBZ0IsVUFBVSxDQUFDLE1BQVc7SUFFbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNmLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV4QixlQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFURCxnQ0FTQztBQUNELFNBQVMsTUFBTSxDQUFDLE1BQVc7SUFDdkIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLDBCQUEwQixDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxjQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzSyxJQUFJLENBQUMsR0FBRyxFQUFFLEdB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