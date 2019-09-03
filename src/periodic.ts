import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as MSG_ from "./textos";
const emojiCTM: Array<{ n: string; id: any }> = [
    { n: 'bf1', id: '613181668672536600' },
    { n: 'bf4', id: '613182924745080862' },
    { n: 'bf5', id: '613181661273653291' },
    { n: 'ets2', id: '613182913676050442' },
    { n: 'wt', id: '613182915563618315' },
    { n: 'gtav', id: '617123585701445659'},
]

export async function FnPeriodic(client: any) {
    loadKMPFCMD(client);
    await firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id))*(Number(client.guilds.find((g_: any) => g_.name == 'KMPF').id))))).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
    client.user.setPresence({ status: 'online', game: { name: 'kmpf help para ayuda' } });
    changeFuhrer(client);
}

function getWeekNumber(){
    let d: any = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    let dayNum: any = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

async function loadKMPFCMD(client: any) {
    client.channels.get('614258469066768424').fetchMessages({ limit: 2 }).then((messages: any) => { 
        messages.forEach((msg: any)  => {
            msg.delete();
        })
    let lastMessage = messages.first(); 
    /* if (lastMessage.author.bot && lastMessage.id !== undefined) { 
        client.channels.get('614258469066768424').messages.get(lastMessage.id).delete(); 
    } */}).catch(console.error);
    
    for(let txt_ of MSG_.kmpfMSG.kmpfcmd) {
        client.channels.get('614258469066768424').send(txt_.texto).then((sendEmbed: any) => { 
            if(txt_.emojis.length > 0) {
                for(let emoji_ of txt_.emojis) { sendEmbed.react(emoji_); }
            }
        });
    }
    const embebedMSG: Array<{name: any; value: any}> = new Array(0);
    for(let j_ of MSG_.juegos) { embebedMSG.push({ name: client.emojis.get(j_.EID) + ' ➽' + j_.nombre, value: '-'}); }
    client.channels.get('614258469066768424').send({ embed: { author: '_**JUEGOS**_', fields: embebedMSG }}).then((sendEmbed: any) => { for(let r_ of MSG_.juegos) { sendEmbed.react(r_.EID); } });
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