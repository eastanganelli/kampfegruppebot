import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as Discord from "discord.js";
import { kmpfMSG } from "./textos";
import { BOTstate } from './devs';

let minute_: number = 60000 /* 5 default */, inac: number = 20, inacRep: number = 3;
const kmpfID = '451837050618904577', roleF = '521184706142797834';
export function FnPeriodic(client: any) {
    newMemMsg(client);
    loadKMPFCMD(client);
    CoronlesKMPFRoles(client);
    firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id))*(Number(client.guilds.find((g_: any) => g_.id === kmpfID).id))))).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
    BOTstate(client);
    setInterval(() => {
        nextFuhrer(client);
        //checkIfAFK(client);
    }, 15*minute_);
}
function loadKMPFCMD(client: any) {
    client.channels.get(kmpfMSG.kmpfroles.MC).fetchMessages({ limit: 4 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfroles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(kmpfMSG.kmpfroles.MC).send(embedMSG).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
        }
    //#endregion
}
function CoronlesKMPFRoles(client: any) {
    client.channels.get(kmpfMSG.kmpfCoroneles.MC).fetchMessages({ limit: 25 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of kmpfMSG.kmpfCoroneles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(kmpfMSG.kmpfCoroneles.MC).send(embedMSG).then(async (sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { await sendEmbed.react(String(e_)); } } });
        }
    //#endregion
}
function newMemMsg(client: any) {
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
function nextFuhrer(client: Discord.Client) {
    const fuhrerDB = firebase.database().ref('/fuhrer');
    fuhrerDB.on("value", snapshot => {
        const fPos = snapshot.val().leader, ldWeek = snapshot.val().nmbWeek;
        if(ldWeek < getWeekNumber()) {
            console.log('Cambio de Reich');
            let bandera: boolean = true, i: number = fPos + 1;
            fuhrerDB.child(fPos).once("value", oldF => {
                do {
                    if(i >= 4) { i = 0; console.log('reiniciar'); }
                    fuhrerDB.child(String(i)).once('value', nextF => { 
                        if(nextF.val().vac == false) { changeFuhrer(client, oldF.val().uid, nextF.val().uid, i); bandera = false; } 
                        else { i++; }
                    });
                } while(bandera); console.log('mori')
            });
        } else { console.log('Sigue Reich') }
    });
}
function changeFuhrer(client: Discord.Client, outID: string, inID: string, pos: number){
    const fuhrer: any = client.guilds.get(kmpfID);
    fuhrer.members.forEach(async (u: any) => {
        fuhrer.members.forEach((o: any) => { if(o.id == outID) { o.removeRole(roleF); } });
        fuhrer.members.forEach((n: any) => { if(n.id == inID)  { n.addRole(roleF) } });
        console.log('Viejo fuhrer: ' + outID + ' - Nuevo fuhrer: ' + inID);
        firebase.database().ref('/fuhrer').update({ leader: pos, nmbWeek: getWeekNumber() });
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