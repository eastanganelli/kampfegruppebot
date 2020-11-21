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
    const_1.getChannelMsgs(const_1.kmpfMSG.kmpfrules.MC, 1).then(() => console.log("CLEAN")).catch(err => console.log(err));
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
    const_1.getChannelMsgs(const_1.kmpfMSG.kmpfroles.MC, 4).then(() => console.log("CLEAN")).catch(err => console.log(err));
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
    const_1.getChannelMsgs(const_1.kmpfMSG.kmpfCoroneles.MC, 50).then(() => console.log("CLEAN")).catch(err => console.log(err));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyaW9kaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGVyaW9kaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUcvQixtQ0FBOEY7QUFDOUYsMkNBQXlDO0FBQ3pDLG1DQUErQztBQUkvQyxJQUFJLE9BQU8sR0FBVyxLQUFLLEVBQWtCLEtBQUssR0FBRyxFQUFFLEVBQUUsV0FBVyxHQUFHLElBQUksR0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFFLElBQUksR0FBVyxFQUFFLEVBQUUsT0FBTyxHQUFXLENBQUMsQ0FBQztBQUM1SCxJQUFJLE1BQU0sR0FBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFNUMsU0FBZ0IsVUFBVSxDQUFDLE1BQVc7SUFFbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNmLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU1QixDQUFDO0FBUEQsZ0NBT0M7QUFDRCxTQUFTLE1BQU0sQ0FBQyxNQUFXLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxTQUFTLE9BQU8sQ0FBQyxNQUFXO0lBRXhCLElBQUksVUFBbUIsQ0FBQztJQUN4QixVQUFVLEdBQUcsSUFBSSxjQUFPLENBQUMsc0JBQWMsRUFBRSxHQUFRLEVBQUU7UUFDL0MsSUFBSTtZQUNBLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87WUFDbkIsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFHSCxJQUFJLFlBQXFCLENBQUM7SUFDMUIsWUFBWSxHQUFHLElBQUksY0FBTyxDQUFDLG9CQUFZLEVBQUUsR0FBUSxFQUFFO1FBQy9DLElBQUk7WUFDQSxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pCO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPO1lBQ3pCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBR0gsSUFBSSxZQUFxQixDQUFDO0lBQzFCLFlBQVksR0FBRyxJQUFJLGNBQU8sQ0FBQyxvQkFBWSxFQUFFLEdBQVEsRUFBRTtRQUMvQyxJQUFJO1lBQ0EsYUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pCO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPO1lBQ3pCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE1BQVc7SUFDMUIsc0JBQWMsQ0FBQyxlQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV4RyxJQUFJLEdBQUcsR0FBeUIsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sR0FBUSxlQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0gsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsS0FBSSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUc7WUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuRDtJQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLFNBQWMsRUFBRSxFQUFFLGdEQUFHLElBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFBRSxLQUFJLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtZQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUFFO0tBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ3ZMLENBQUM7QUFDRCxTQUFTLE1BQU0sQ0FBQyxNQUFXO0lBRXZCLHNCQUFjLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFcEcsS0FBSSxJQUFJLEVBQUUsSUFBSSxlQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNqQyxJQUFJLFFBQVEsR0FBUSxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxHQUFlLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hJLEtBQUksSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtZQUFFLElBQUcsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7Z0JBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFBRTtpQkFBTTtnQkFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUFFO1NBQUU7UUFDaE0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sU0FBYyxFQUFFLEVBQUUsZ0RBQUcsSUFBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUFFLEtBQUksSUFBSSxFQUFFLElBQUksUUFBUSxFQUFFO2dCQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUFFO1NBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0tBQzNMO0FBRVQsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLE1BQVc7SUFDaEMsc0JBQWMsQ0FBQyxlQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV6RyxLQUFJLElBQUksRUFBRSxJQUFJLGVBQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFO1FBQ3JDLElBQUksUUFBUSxHQUFRLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEdBQWUsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEksS0FBSSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFO1lBQUUsSUFBRyxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRTtnQkFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUFFO2lCQUFNO2dCQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUU7U0FBRTtRQUNoTSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxTQUFjLEVBQUUsRUFBRSxnREFBRyxJQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQUUsS0FBSSxJQUFJLEVBQUUsSUFBSSxRQUFRLEVBQUU7Z0JBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQUU7U0FBRSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUM7S0FDL0w7QUFFVCxDQUFDIn0=