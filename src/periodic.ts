import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as Discord from "discord.js";
import * as MSG_ from "./textos";

export async function FnPeriodic(client: any) {
    loadKMPFCMD(client);
    await firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id))*(Number(client.guilds.find((g_: any) => g_.name == 'KMPF').id))))).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
    client.user.setPresence({ status: 'online', game: { name: 'kmpf help para ayuda' } });
    changeFuhrer(client);
}
async function loadKMPFCMD(client: any) {
    client.channels.get('614258469066768424').fetchMessages({ limit: 3 }).then((messages: any) => { messages.forEach((msg: any)  => { msg.delete(); }) }).catch(console.error);
    //#region kmpfMSG
        for(let t_ of MSG_.kmpfMSG.kmpfcmd) {
            let embedMSG: any = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr: Array<any> = new Array(0);
            for(let d_ of t_.data) { embedMSG.addField(d_.texto, d_.desc, false); emojiArr.push(d_.emoji); }
            client.channels.get('614258469066768424').send(embedMSG).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(e_); } } });
        }
    //#endregion
    //#region gameList{
        let embedMSGGame = new Discord.RichEmbed().setTitle('_**JUEGOS**_'), emojiArr: Array<any> = new Array(0);
        for(let d_ of MSG_.juegos) { console.log(d_.EID + ' ' + d_.nombre); embedMSGGame.addField(client.emojis.get(d_.EID) + ' ➽ ' + d_.nombre, d_.code, false); emojiArr.push(d_.EID); }
        
        client.channels.get('614258469066768424').send(embedMSGGame).then((sendEmbed: any) => { if(emojiArr.length > 0) { for(let e_ of emojiArr) { sendEmbed.react(e_); } } });
    //#endregion
}
function changeFuhrer(client: any) {
    firebase.database().ref('/NowLD').on('value', Users => {
        Users.forEach(User => {
            const role_    = client.guilds.find((g: any) => g.id == '451837050618904577').roles.find((role: any) => role.id === "521184706142797834");
            const guildMem = client.guilds.find((g: any) => g.id == '451837050618904577').members.find((u: any) => u.id == User.key);
            role_.members.find((u: any) => { 
                if((User.val()).nWeek == getWeekNumber() && User.key != u.id) { 
                    guildMem.addRole(role_); 
                    u.removeRole(role_); firebase.database().ref('/NowLD/' + User.key).update({ nWeek:  (getWeekNumber() + 3) });
                } 
            });
        })
    });
}
function getWeekNumber() {
    let d: any = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    let dayNum: any = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}