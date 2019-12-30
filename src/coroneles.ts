//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
//#region KMPF
import { uProfile } from "./varInterfaces";
import { kmpfID, roleF } from "./const";
import { getWeekNumber } from "./datentime";
//#endregion
//#endregion
const min: number = 60000;

//#region KMPF Emoji
export async function fOnVac(fuhrer: string, inVac: boolean) {
    let pos: string = '';
    switch(fuhrer) {
        case '406645486221524992':   { pos = '0'; break; }
        case '251482884987289600':   { pos = '1'; break; }
        case '327966508242305024':   { pos = '2'; break; }
        case '311264984627675137:':  { pos = '3'; break; }
        case '139591319877189643':   { pos = '4'; break; }
    } firebase.database().ref('/fuhrer').child(pos).update({ 'vac': inVac });
}
export function usersNoRegis(dsCh: Discord.Channel) {
    const dsClient: any = dsCh.client;
    const dsChnnl: any = dsClient.channels.get(dsCh.id);
    let fUsers = firebase.database().ref('/users'), arrUID: Array<string> = new Array(0);
    fUsers.on('value', async snapshot => {
        let msgEmb: Discord.RichEmbed = new Discord.RichEmbed;
        msgEmb.setTitle('**USUARIOS NO REGISTRADOS**').setDescription("📨 -> Enviar Notificacion\n_______________").setFooter('El mensaje se eliminara en 1 MIN o al enviar las NOTIFICACIONES');
        snapshot.forEach(snap => {
            let auxU: uProfile = snap.val();
            if(auxU.loaded = false || auxU.loaded == undefined) {
                const dsuid: string = String(snap.key); arrUID.push(dsuid);
                msgEmb.addField('ID: ' + dsuid, '<@' + dsuid + '>');
            }
        }); 
        dsChnnl.send(msgEmb).then(async (m: Discord.Message) => { 
            m.react('📨');
            const filter = (reaction: Discord.MessageReaction, user: Discord.User) => { return ['📨'].includes(reaction.emoji.name) && !(user.bot); };
            await m.awaitReactions(filter, { max: 1, time: min, errors: ['time'] }).then((collected: any) => {
                //console.log(collected);
                const reaction = collected.first();
                if(reaction.emoji.name == '📨') {
                    for(let id_ of arrUID) { dsClient.guilds.first().members.get(id_).send('<@' + id_ + '>\nTiene que registrarse\nIr a _BOTS_ -> _#kmpf_ -> Hacer click en :pencil2:\n**KMPF**'); }
                    m.delete();
                }
            }); m.delete(100);
        })
    })
}
//#endregion
//#region KMPF CMD
export async function perfiluser(msg: Discord.Message, author_: any) {
    if(author_.roles.has('517168972483919929')) {
        let MSG_ = msg.content.split('kmpf perfil ').slice(0);
        let profileUser: any = null;
        
    } else { msg.author.send("no tienes el permiso para usar el comando."); }
}

export function banUsuario() {
    
}
export function dmALL(msg: Discord.Message, author_: any) {
    if(author_.roles.has('517169596059615252')) {
        let MSG_ = msg.content.split('kmpf dmall ').slice(1);
        msg.guild.members.forEach((user: any) => { console.log(MSG_); user.send(MSG_); });
    } else { msg.author.send("No tienes el permiso para usar el comando."); }
}
//#endregion
//#region Fuhrer FNs
export function nextFuhrer(client: Discord.Client) {
    const fuhrerDB = firebase.database().ref('/fuhrer');
    fuhrerDB.on("value", snapshot => {
        const fPos = snapshot.val().leader, ldWeek = snapshot.val().nmbWeek;
        if((ldWeek < getWeekNumber()) || (ldWeek > getWeekNumber())) {
            console.log('Cambio de Reich');
            let bandera: boolean = true, i: number = fPos + 1;
            fuhrerDB.child(fPos).once("value", oldF => {
                do {
                    if(i >= snapshot.val().cnt) { i = 0; console.log('reiniciar'); }
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
    fuhrer.members.forEach((u: any) => {
        fuhrer.members.forEach((o: any) => { if(o.id == outID) { o.removeRole(roleF); } });
        fuhrer.members.forEach((n: any) => { if(n.id == inID)  { n.addRole(roleF) } });
        console.log('Viejo fuhrer: ' + outID + ' - Nuevo fuhrer: ' + inID);
        firebase.database().ref('/fuhrer').update({ leader: pos, nmbWeek: getWeekNumber() });
    }); 
}
//#endregion