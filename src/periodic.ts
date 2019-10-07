import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as Discord from "discord.js";
import { kmpfMSG } from "./textos";
import { uFuhrer, uCoronel } from './varInterfaces';

let minute_: number = 2.5 /* 5 default */, inac: number = 20, inacRep: number = 3;
export async function FnPeriodic(client: any) {
    newMemMsg(client);
    loadKMPFCMD(client);
    CoronlesKMPFRoles(client);
    await firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id))*(Number(client.guilds.find((g_: any) => g_.name == 'KMPF').id))))).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
    client.user.setPresence({ status: 'online', game: { name: '_kmpf help_ para ayuda' } });
    setInterval(() => {
        changeFuhrer(client);
        //checkIfAFK(client);
    }, 60000*minute_);
}
async function loadKMPFCMD(client: any) {
    client.channels.get(kmpfMSG.kmpfroles.MC).fetchMessages({ limit: 4 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfroles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(kmpfMSG.kmpfroles.MC).send(embedMSG).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(String(e_)); } } });
        }
    //#endregion
}
async function newMemMsg(client: any) {
    client.channels.get(kmpfMSG.kmpfrules.MC).fetchMessages({ limit: 1 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    let msg: Discord.RichEmbed = new Discord.RichEmbed, rules_: any = kmpfMSG.kmpfrules.Arr[0], emojiArr: any = new Array(0);
    msg.setTitle(rules_.titulo);
    msg.setDescription(rules_.desc);
    for(let rule of rules_.data) {
        msg.addField(rule.texto, rule.desc);
        if(rule.emoji != '-') emojiArr.push(rule.emoji);
    }
    client.channels.get(kmpfMSG.kmpfrules.MC).send(msg).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(String(e_)); } } });
}
function changeFuhrer(client: any) {
    firebase.database().ref('/fuhrer').on('value', snap => {
        let fuhrerDat: uFuhrer = snap.val(), coroneles: Array<uCoronel> = fuhrerDat.coroneles, pos: number = fuhrerDat.nmbWeek, next:number = pos + 1;
        if(fuhrerDat.nmbWeek < getWeekNumber()) {
            let cntFuhrer: number = fuhrerDat.coroneles.length;
            const oldFuhrer = client.guilds.find((g: any) => g.id == '451837050618904577').members.find((u: any) => u.id == coroneles[pos].uid); 
            oldFuhrer.members.find((u: any) => { u.removeRole('521184706142797834'); });
            if(coroneles[next].vac) {
                for(let i = next; ; i++) {
                    if(coroneles[i] == coroneles[pos]) break;
                    else if(!(coroneles[i].vac)) {
                        const newFuhrer = client.guilds.find((g: any) => g.id == '451837050618904577').members.find((u: any) => u.id == coroneles[i].uid);
                        newFuhrer.addRole('521184706142797834');
                        firebase.database().ref('/fuhrer').update({ nmbWeek: new Date() });
                        break;
                    } if(i >= cntFuhrer) { i = 0; }
                }
            }
            
        }
    });
}
function checkIfAFK(client: any) {
    firebase.database().ref('/users').on('value', snapshot => {
        snapshot.forEach(user => {
            if(user.val().connect.laston != new Date(0)) { 
                let dayDif: number = getDayOfYear(user.val().connect.laston);
                if(dayDif >= inac && dayDif < inac + inac) { console.log("HOLA, ENTRE") }
                else if(dayDif >= inac && dayDif < inac + inac) { console.log("HOLA, ENTRE") }
                else if(dayDif >= inac && dayDif < inac + inac) { console.log("HOLA, ENTRE") }
            }
        });
    });
}
function CoronlesKMPFRoles(client: any) {
    client.channels.get(kmpfMSG.kmpfCoroneles.MC).fetchMessages({ limit: 3 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfCoroneles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(kmpfMSG.kmpfCoroneles.MC).send(embedMSG).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(String(e_)); } } });
        }
    //#endregion
}
function getWeekNumber() {
    let d: any = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    let dayNum: any = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}
function getDayOfYear(inDate: any) {
    let start:   any = new Date(inDate);
    console.log(start);
    let now: any = new Date();
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    console.log('Day of year: ' + day);
    return day;
}
function profileExists(client: any) {

}
/* firebase.database().ref('/fuhrer').set({
    nmbWeek: getWeekNumber(),ñ
    leader: 3,
    coroneles: [
        { uid: 406645486221524992, vac: true },
        { uid: 251482884987289600, vac: false },
        { uid: 327966508242305024, vac: false },
        { uid: 311264984627675137, vac: false },
        { uid: 139591319877189643, vac: false },
    ]

}); */