//#region IMPORTS
//#region Plug
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as Discord from "discord.js";
//#endregion
//#region KMPF
import { kmpfMSG, kmpfID } from "./const";
import { BOTstate } from './devs';
import { nextFuhrer } from './coroneles';
import { checkIfAFK, isAFK, checkIfCumple } from './users';
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
    BOTstate(client);
    kmpfPeriodic(client);
}
function kmpfFB(client: any) {
    firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id))*(Number(client.guilds.find((g_: any) => g_.id === kmpfID).id)))))
    .then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });

}
function kmpfPeriodic(client: any) {
    setInterval(() => { 
        weekDay(client);
    }, 0.5*minute_);
}
function weekDay(client: any) {
    switch ((new Date).getDay()) {
        case 0: {
            nextFuhrer(client);
            break;
        } case 1: {
            if(((new Date).getHours() == 23)) { isAFK(client); } //Baja Rango/semana
            break;
        }
    }
    //#region 
        if(((new Date).getHours() == 8) || ((new Date).getHours() == 20)) { if(!stCtrl[0]) { checkIfAFK(client); stCtrl[0] = true; } } else { stCtrl[0] = false; }
        if((new Date).getHours() == 8) { if(!stCtrl[1]) { checkIfCumple(client); stCtrl[1] = true; } }                                  else { stCtrl[1] = false; }
    //#endregion
}
//#region Textos Canales
function welcomeTC(client: any) { //#WELCOME
    client.channels.get(kmpfMSG.kmpfrules.MC).fetchMessages({ limit: 1 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    let msg: Discord.RichEmbed = new Discord.RichEmbed, rules_: any = kmpfMSG.kmpfrules.Arr[0], emojiArr: any = new Array(0);
    msg.setTitle(rules_.titulo);
    msg.setDescription(rules_.desc);
    for(let rule of rules_.data) {
        msg.addField(rule.texto, rule.desc);
        if(rule.emoji != '-') emojiArr.push(rule.emoji);
    }
    client.channels.get(kmpfMSG.kmpfrules.MC).send(msg).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
}
function kmpfTC(client: any) { //KMPF
    client.channels.get(kmpfMSG.kmpfroles.MC).fetchMessages({ limit: 4 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfroles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(kmpfMSG.kmpfroles.MC).send(embedMSG).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
        }
    //#endregion
}
function kmpfCoronelesTC(client: any) { //#KMPF-CORONELES
    client.channels.get(kmpfMSG.kmpfCoroneles.MC).fetchMessages({ limit: 50 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfCoroneles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(kmpfMSG.kmpfCoroneles.MC).send(embedMSG).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
        }
    //#endregion
}
//#endregion