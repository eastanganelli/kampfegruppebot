import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import { uProfile } from "./varInterfaces";

const min: number = 60000;

export async function perfiluser(msg: Discord.Message) {
    
}
export async function fOnVac(fuhrer: string, inVac: boolean) {
    let pos: number = -1;
    switch(fuhrer) {
        case '406645486221525000': { pos = 0; break; }
        case '251482884987289600': { pos = 1; break; }
        case '32796650824230500': { pos = 2; break; }
        case '311264984627675140:': { pos = 3; break; }
        case '13959131987718965': { pos = 4; break; }
    } if(pos > -1 && pos < 5) { firebase.database().ref('/fuhrer').child(String(pos)).update({ fuhrer: inVac }) }
}
export async function usersNoRegis(dsCh: Discord.Channel) {
    const dsClient: any = dsCh.client;
    const dsChnnl: any = dsClient.channels.get(dsCh.id);
    let fUsers = firebase.database().ref('/users'), arrUID: Array<string> = new Array(0);
    fUsers.on('value', async snapshot => {
        let msgEmb: Discord.RichEmbed = new Discord.RichEmbed;
        msgEmb.setTitle('**USUARIOS NO REGISTRADOS**').setDescription("_______________\n✅ -> Enviar Notificacion\n_______________").setFooter('El mensaje se eliminara en 2 MIN o al enviar la/s NOTIFICACION/ES');
        snapshot.forEach(snap => {
            let auxU: uProfile = snap.val();
            if(auxU.loaded = false || auxU.loaded == undefined) {
                const dsuid: string = String(snap.key); arrUID.push(dsuid);
                msgEmb.addField('ID: ' + dsuid, '<@' + dsuid + '>');
            }
        }); 
        dsChnnl.send(msgEmb).then(async (m: Discord.Message) => { 
            await m.react('✅');
            const filter = (reaction: Discord.MessageReaction, user: Discord.User) => { return ['✅'].includes(reaction.emoji.name) && !(user.bot); };
            m.awaitReactions(filter, { max: 1, time: min*5, errors: ['time'] }).then((collected: any) => {
                console.log(collected);
                const reaction = collected.first();
                if(reaction.emoji.name == '✅') {
                    for(let id_ of arrUID) { dsClient.guilds.first().members.get(id_).send('<@' + id_ + '>\nTiene que registrarse\nIr a _BOTS_ -> _#kmpf_ -> Hacer click en :pencil2:\n**KMPF**'); }
                    m.delete();
                }
            }).catch(() => { m.delete(); })
        })
    })
}