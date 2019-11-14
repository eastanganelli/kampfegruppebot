//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
//#region KMPF
import { lProfile, uProfile } from './varInterfaces';
import { serverID, serverLink, roles, kmpfMSG } from "./const";
import { getDayOfYear, getWeekNumber } from "./datentime";
//#endregion
//#endregion

//#region DB Fns
export async function escribirUsuario(usuario: lProfile) {
    await firebase.database().ref('/users').child(usuario.uid).update({
        loaded: usuario.userDat.loaded,
        nombre: usuario.userDat.nombre,
        birth: usuario.userDat.birth,
        connect: {
            joinat: usuario.userDat.connect.joinAt,
            laston: usuario.userDat.connect.laston,
            lastadv: usuario.userDat.connect.lastAdv
        },
        steam: usuario.userDat.steam,
        origin: usuario.userDat.origin,
        uplay: usuario.userDat.uplay
    });
}
export async function leerUsuario(uid: string) {
    firebase.database().ref('/users').child(uid).on('value', snapshot => {
        let auxDat: uProfile = snapshot.val();
        return { uid: snapshot.key, userDat: auxDat }; 
    });
}
export async function emptyUsuario(uid: string) {
    firebase.database().ref('/users').child(uid).on('value', snapshot => {
        let auxDat: uProfile = snapshot.val();
        if(!(auxDat.loaded)) return true; 
    }); return false;
}
export async function lastConnectionusuario(uid: string) { await firebase.database().ref('/users/').child(uid).child('connect').update({ laston: new Date() }) }
//#endregion
//#region Server Fns
//#region Roles

//#endregion
//#region Inactividad
export async function downgradingRank(uid: string, client: any) {
    const server = client.guilds.find((g: any) => g.id == serverID);
    server.fetchMember(uid).then((u: any) => {
        for(let i = 0; i < roles.length; i++) {
            if(u.roles.has(roles[i]) && i < roles.length) {
                console.log('Username: ' + u.name);
                firebase.database().ref('/users').child(uid).child('connect').update({ lastadv: new Date() });
                u.addRole(roles[i + 1]);
                u.removeRole(roles[i]);
                server.guild.channels.get(611501862721552386).send('**El USUARIO** <@' + uid +'> fue degrado de <@' + roles[i] + '> a <@' + roles[i+1] + '>');
            }
        }
    });
}
//#endregion
//#region Expulsion & Ban
export async function kickUsuario(uid: string, server: any, data: any) {
    server.guild.fetchMember(uid).then((u: any) => { u.send(data.txt + serverLink).then(() => { u.kick(data.rzn); + '\n Saludos, KMPF'}); });
    const channel = server.guild.channels.get('611501862721552386').send('**El USUARIO** <@' + uid +'> FUE EXPULSADO');
}
export async function kickUsuarioByMsg(uid: string, server: any, data: any) {
    server.guild.fetchMember(uid).then((u: any) => { u.send(data.txt + serverLink).then(() => { u.kick(data.rzn); + '\n Saludos, KMPF'}); });
    const channel = server.guild.channels.get('611501862721552386').send('**El USUARIO** <@' + uid +'> FUE EXPULSADO');
}
//#endregion
//#endregion
//#region KMPF FNs
//#region checkIf
export function checkIfAFK(client: any) {
    const usersfb = firebase.database().ref('/users');
    usersfb.once('value', snapshot => {
        snapshot.forEach(snap => {
            let auxuser: uProfile = snap.val();
            let daydif = getDayOfYear(auxuser.connect.laston);
            if(daydif >= 14 && daydif < 21) {
                const msg_: string = '<@' + snap.key + '>\nLleva ' + daydif + ' días de **INACTIVIDAD** en el servidor.\nPara dejar de recibir este mensaje, presente actividad. Caso contrario, __cada semana que pase descendera un rango__. Si llega a rango **CANDIDATO**, y no presento actividad, sera expulsado.\nSi tiene rol **INVITADO** o **CANDIDATO**, al vencer la semana de advertencia, __será expulsado directamente__.\nKMPF';
                client.users.get(String(snap.key)).send(msg_).then(() => { usersfb.child(String(snap.key)).child('connect').update({ lastadv: getWeekNumber() }); });
                client.guilds.find((g: any) => g.id == serverID).channels.get(611501862721552386).send('**El USUARIO** <@' + snap.key +'> Se encuentra inactivo hace ' + daydif + ' diás en el servidor\n Mensaje de Advertencia fue _ENVIADO_');
            } else if (daydif >= 21) {
                if(Number(auxuser.connect.lastAdv) < getWeekNumber()) {
                    const msg_: string = '<@' + snap.key + '>\nSu rango fue __DESCENDIDO__!\nSeguira descendiendo, hasta que presente actividad.\n:warning::warning:Recuerde: **Si llega a rango __CANDIDATO__, y no presento actividad, sera expulsado.**:warning::warning:\nKMPF';
                    client.users.get(String(snap.key)).send(msg_).then(() => { usersfb.child(String(snap.key)).child('connect').update({ lastadv: getWeekNumber() }); });
                    downgradingRank(String(snap.key), client)
                }
            } else { usersfb.child(String(snap.key)).child('connect/lastadv').remove(); }
        });
    });
}
export function checkIfCumple(client: any) {
    const userfb = firebase.database().ref('/users');
    userfb.once('value', async snapshot => {
        snapshot.forEach(snap => {
            const disU: uProfile = snap.val(), uBirth = new Date(disU.birth), todday = new Date();
            if(uBirth.getDate() == todday.getDate() && uBirth.getMonth() == todday.getMonth()) {
                console.log('CUMPLEAÑOS ' + disU.nombre);
                let embedMSG: any = new Discord.RichEmbed().setTitle(kmpfMSG.kmpfNews.Arr[0].titulo).setDescription('Que tengas un **Feliz Cumpleaños** <@' + snap.key + '>\nCLAN <@594571311171371008>');
                client.channels.get(kmpfMSG.kmpfNews.MC).send(embedMSG);
            }
       })
    })
}
export function checkIfleft(client: any) {
    const usersfb = firebase.database().ref('/users'), server = client.guilds.find((g: any) => g.id == serverID);
    usersfb.once('value', snapshot => {
        snapshot.forEach(ufb => {
            server.members((uMem: any) => uMem === ufb.key).catch((err: any) => {
                console.log(err)
            })
        })
    })
}
//#endregion
//#endregion