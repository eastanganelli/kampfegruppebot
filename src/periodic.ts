//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
import { CronJob } from 'cron';
//#endregion
//#region KMPF
import { birthdayCron, kmpfMSG, nextFuhrerCron, AFKusersCron, getChannelMsgs, getTChannel, timezone } from "./const";
import { nextFuhrer } from './coroneles';
import { isAFK, checkIfCumple } from './users';
//#endregion
//#endregion

let minute_: number = 60000 /* 5 default */, hour_ = 60, oneDayinSec = 1000*3600*24, inac: number = 20, inacRep: number = 3;
let stCtrl: Array<boolean> = [false, false];

export function FnPeriodic(client: any) {
    //#region KMPF Loads
    kmpfFB(client);
    welcomeTC(client);
    kmpfTC(client);
    kmpfCoronelesTC(client);
    //#endregion
    cronJOB(client);
}
function kmpfFB(client: any) { console.log('BOT DB Connected'); }
function cronJOB(client: any) {
    //#region CRONJOB FUHRER
    let cronFuhrer: CronJob;
    cronFuhrer = new CronJob(nextFuhrerCron, async() => {
        try {
            nextFuhrer(client);
        } catch(e) {
            console.log(e);
        }
        if (!cronFuhrer.running)
            cronFuhrer.start();
    },undefined,true, timezone);
    //#endregion
    //#region CRONJOB BIRTHDAY
    let cronBirthday: CronJob;
    cronBirthday = new CronJob(birthdayCron, async() => {
        try {
            checkIfCumple(client);
        } catch(e) {
            console.log(e);
        }
        if (!cronBirthday.running)
        cronBirthday.start();
    },undefined,true, timezone);
    //#endregion
    //#region CRONJOB USER AFKs
    let cronAFKusers: CronJob;
    cronBirthday = new CronJob(AFKusersCron, async() => {
        try {
            isAFK(client);
        } catch(e) {
            console.log(e);
        }
        if (!cronAFKusers.running)
        cronAFKusers.start();
    },undefined,true, timezone);
    //#endregion
}
//#region Textos Canales
function welcomeTC(client: any) { //#WELCOME
    getChannelMsgs(kmpfMSG.kmpfrules.MC, 1);
    let msg: Discord.MessageEmbed = new Discord.MessageEmbed, rules_: any = kmpfMSG.kmpfrules.Arr[0], emojiArr: any = new Array(0);
    msg.setTitle(rules_.titulo);
    msg.setDescription(rules_.desc);
    for(let rule of rules_.data) {
        msg.addField(rule.texto, rule.desc);
        if(rule.emoji != '-') emojiArr.push(rule.emoji);
    }
    getTChannel(kmpfMSG.kmpfrules.MC).then((C_: Discord.Channel) => {
        if(C_.isText())
            C_.send(msg).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
    });
}
function kmpfTC(client: any) { //KMPF
    getChannelMsgs(kmpfMSG.kmpfroles.MC, 4);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfroles.Arr) {
            let embedMSG: any = new Discord.MessageEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            getTChannel(kmpfMSG.kmpfroles.MC).then((C_: Discord.Channel) => {
                if(C_.isText()) {
                    C_.send(embedMSG).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
                }
            });
        }
    //#endregion
}
function kmpfCoronelesTC(client: any) { //#KMPF-CORONELES
    getChannelMsgs(kmpfMSG.kmpfCoroneles.MC, 50);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfCoroneles.Arr) {
            let embedMSG: any = new Discord.MessageEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            getTChannel(kmpfMSG.kmpfCoroneles.MC).then((C_: Discord.Channel) => {
                if(C_.isText())
                    C_.send(embedMSG).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
            });
        }
    //#endregion
}
//#endregion