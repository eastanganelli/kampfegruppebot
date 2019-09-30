import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as Discord from "discord.js";
import * as MSG_ from "./textos";
import { uFuhrer, uCoronel } from './varInterfaces';
import { loweringRole, kickUsuario } from './users';

export async function FnPeriodic(client: any) {
    loadKMPFCMD(client);
    await firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id))*(Number(client.guilds.find((g_: any) => g_.name == 'KMPF').id))))).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
    client.user.setPresence({ status: 'online', game: { name: 'kmpf help para ayuda' } });
    setInterval(() => { changeFuhrer(client); },60000*5);
    CoronlesKMPFRoles(client);
    kickUsuario('asdasdasd', client);
}
async function loadKMPFCMD(client: any) {
    client.channels.get(MSG_.kmpfMSG.kmpfroles.MC).fetchMessages({ limit: 4 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of MSG_.kmpfMSG.kmpfroles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(MSG_.kmpfMSG.kmpfroles.MC).send(embedMSG).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(String(e_)); } } });
        }
    //#endregion
    //#region gameList{
        let embedMSGGame = new Discord.RichEmbed().setTitle('_**JUEGOS**_'), emojiArr: Array<any> = new Array(0);
        for(let d_ of MSG_.juegos) { embedMSGGame.addField(String(client.emojis.get(d_.EID)) + ' ➽ ' + d_.nombre, d_.code, false); emojiArr.push(d_.EID); }
        
        client.channels.get(MSG_.kmpfMSG.kmpfroles.MC).send(embedMSGGame).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(String(e_)); } } });
    //#endregion
}
function changeFuhrer(client: any) {
    firebase.database().ref('/fuhrer').on('value', snap => {
        let fuhrerDat: uFuhrer = snap.val(), coroneles: Array<uCoronel> = fuhrerDat.coroneles, pos: number = fuhrerDat.nmbWeek, next:number = pos + 1;
        if(fuhrerDat.nmbWeek < getWeekNumber()) {
            let cntFuhrer: number = fuhrerDat.coroneles.length;
            if(next < cntFuhrer) {
                const oldFuhrer = client.guilds.find((g: any) => g.id == '451837050618904577').members.find((u: any) => u.id == coroneles[pos].uid); 
                oldFuhrer.members.find((u: any) => { u.removeRole('521184706142797834'); });
                if(coroneles[next].vac) {
                    for(let i = next; ; i++) {
                        if(i + 1 >= cntFuhrer) { i = 0; }
                        if(coroneles[i] == coroneles[next]) break;
                        else if(!(coroneles[i].vac)) {
                            const newFuhrer = client.guilds.find((g: any) => g.id == '451837050618904577').members.find((u: any) => u.id == coroneles[i].uid);
                            newFuhrer.addRole('521184706142797834');
                            firebase.database().ref('/fuhrer').update({ nmbWeek: new Date() });
                            break;
                        }
                    }
                }
            }
        }
    });
}
function CoronlesKMPFRoles(client: any) {
    client.channels.get(MSG_.kmpfMSG.kmpfCoroneles.MC).fetchMessages({ limit: 3 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of MSG_.kmpfMSG.kmpfCoroneles.Arr) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { if(d_.emoji != '') { embedMSG.addField(d_.emoji + ' ➽ ' + d_.texto, d_.desc, false); emojiArr.push(d_.emoji); } else { embedMSG.addField(d_.texto, d_.desc, false); } }
            client.channels.get(MSG_.kmpfMSG.kmpfCoroneles.MC).send(embedMSG).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(String(e_)); } } });
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

/* firebase.database().ref('/fuhrer').set({
        nmbWeek: getWeekNumber(),
        leader: 3,
        coroneles: [
            { uid: 406645486221524992, vac: true },
            { uid: 251482884987289600, vac: false },
            { uid: 327966508242305024, vac: false },
            { uid: 311264984627675137, vac: false },
            { uid: 139591319877189643, vac: false },
        ]
    
    }); */