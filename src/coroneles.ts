import * as Discord      from "discord.js";
import { getServer, getTChannel, getUserGuild, kmpfID, roleF, serverID } from "./const";
import { fuhrersGET } from "./api";
const min: number = 60000;

//#region KMPF CMD
export async function perfiluser(msg: Discord.Message, author_: any) {
    if(author_.roles.has('517168972483919929')) {
        let MSG_ = msg.content.split('kmpf perfil ').slice(0);
        let profileUser: any = null;
        
    } else { msg.author.send("no tienes el permiso para usar el comando."); }
}
export function dmALL(msg: Discord.Message, author_: any) {
    if(author_.roles.has('517169596059615252')) {
        let MSG_ = msg.content.split('kmpf dmall ').slice(1);
        msg.guild?.members.cache.each((user: Discord.GuildMember) => { console.log(MSG_); user.send(MSG_); });
    } else { msg.author.send("No tienes el permiso para usar el comando."); }
}
//#endregion
//#region Fuhrer FNs
export function nextFuhrer(client: Discord.Client) {
    fuhrersGET().then((CORONELES: any) => {
        getServer(serverID).then((G: Discord.Guild) => {
            G.roles.fetch(roleF).then((R: Discord.Role|any) => {
                let i=0;
                for(i=0; i<CORONELES.length; i++) {
                    if(CORONELES[i].id==R.members.firstKey()) {
                        if(i>=(CORONELES.length-1)) {
                            changeFuhrer(client, CORONELES[i].id, CORONELES[0].id);
                        } changeFuhrer(client, CORONELES[i].id, CORONELES[i+1].id);
                    }
                }
            });
        });
    });
}
function changeFuhrer(client: Discord.Client, outID: string, inID: string/* , pos: number */){
    const fuhrer: any = client.guilds.fetch(kmpfID);
    fuhrer.members.forEach((u: any) => {
        fuhrer.members.forEach((o: any) => { if(o.id == outID) { o.removeRole(roleF); } });
        fuhrer.members.forEach((n: any) => { if(n.id == inID)  { n.addRole(roleF) } });
        console.log('Viejo fuhrer: ' + outID + ' - Nuevo fuhrer: ' + inID);
        getTChannel('620642948660330506').then((ch: any) => {
            ch.send('Führer __SALIENTE__: <@' + outID + '> - __ENTRANTE__: <@' + inID + '>');
        })
    }); 
}
//#endregion