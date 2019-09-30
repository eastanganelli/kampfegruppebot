import * as firebase from 'firebase/app';
import 'firebase/auth';
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

export async function tieneRegusuario(uid: string) {
    firebase.database().ref('/users').equalTo(uid).once('value', snapshot => {
        if(!(snapshot.exists())) { newUsuario(uid); }
    });
}
export async function newUsuario(uid: string) {
    let uDat: lProfile = {
        uid: uid,
        userDat: {
            nombre: '-',
            birth: 0,
            steam: '-',
            origin: '-',
            uplay: '-',
            connect: {
                joinAt: new Date(),
                lastAdv: -1,
                lastCon: -1
            }
        }
    }; escribirUsuario(uDat);
}
export async function escribirUsuario(usuario: lProfile) {
    await firebase.database().ref('/users').child(usuario.uid).set({
        nombre: usuario.userDat.nombre,
        birth: usuario.userDat.birth,
        connect: {
            joinat: usuario.userDat.connect.joinAt,
            laston: usuario.userDat.connect.lastCon,
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
        if(auxDat.nombre != '-' && auxDat.birth != '-') return true; 
    }); return false;
}
export async function lastConnectionusuario(uid: string) { firebase.database().ref('/users/').child(uid).child('connect').update({ laston: new Date() });  }
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
export async function kickUsuario(uid: string, client: any) {
    client.guilds.find((g: any) => g.id == serverID).fetchMember(uid).then((u: any) => {
        u.send('**FUE EXPULSADO POR INACTIVIDAD**\nPara reingresar al clan, acepte la invitación ' + serverLink).then(() => { u.kick('INACTIVIDAD'); + '\n Saludos, KMPF'});
    });
}