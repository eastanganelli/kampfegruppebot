import * as firebase   from "firebase/app";
import "firebase/database";
import { lProfile, uProfile } from './varInterfaces';
import { serverID, serverLink } from "./textos";

let roles_: Array<string> = [
    '517169596059615252', //Coronel
    '517171083384979456', //Teniente
    '521709081757745172', //Subteniente
    '521709251941629975', //Cabo Primero
    '517171515071135764', //Soldado Raso
    '521709396863090698', //Candidato
    '533069497561513994'  //Invitado
];

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
export async function loweringRole(uid: string, client: any) {
    client.guilds.find((g: any) => g.id == serverID).fetchMember(uid).then((u: any) => {
        for(let i = 0; i < roles_.length; i++) {
            if(u.roles.has(roles_[i])) {
                console.log('Tiene pos: ' + i);
                firebase.database().ref('/users').child(uid).child('connect').update({ lastadv: new Date() });
                u.addRole(roles_[i + 1]);
                u.removeRole(roles_[i]);
            }
        }
    });
}
//#endregion
//#region Expulsion & Ban
export async function kickUsuario(uid: string, client: any, data: any) {
    client.guilds.find((g: any) => g.id == serverID).fetchMember(uid).then((u: any) => {
        u.send(data.txt + serverLink).then(() => { u.kick(data.rzn); + '\n Saludos, KMPF'});
    });
}
export async function kickUsuarioByMsg(uid: string, client: any, data: any) {
    client.fetchMember(uid).then((u: any) => {
        u.send(data.txt + serverLink).then(() => { u.kick(data.rzn); + '\n Saludos, KMPF'});
    });
}
//#endregion
//#endregion