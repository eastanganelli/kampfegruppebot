import * as firebase from 'firebase/app';
import 'firebase/auth';
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
    client.channels.get('614258469066768424').send('_**PERFIL**_\n:new:➽ **CARGAR PERFIL**\n>Nombre, Fecha Nacimiento\n\n:pencil:➽ **EDITAR PERFIL** _(DESHABILITADO)_\n>Modificar los datos ya cargados').then((sendEmbed: any) => { sendEmbed.react("🆕"); sendEmbed.react("📝"); });
    client.channels.get('614258469066768424').send(`_**JUEGOS**_\n${client.emojis.get('613182924745080862')} ➽ **Battlefield 4**\n${client.emojis.get('613181668672536600')} ➽ **Battlefield 1**\n${client.emojis.get('613181661273653291')} ➽ **Battlefield V**\n${client.emojis.get('613182915563618315')} ➽ **Warthunder**\n${client.emojis.get('613182913676050442')} ➽ **Euro Truck Simulator 2**\n${client.emojis.get('617123585701445659')} ➽ **GTA V**`).then((sendEmbed: any) => { 
        sendEmbed.react("613181668672536600"); sendEmbed.react("613182924745080862"); sendEmbed.react("613181661273653291"); sendEmbed.react("613182913676050442"); sendEmbed.react("617123585701445659"); sendEmbed.react("613182915563618315");
    });
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