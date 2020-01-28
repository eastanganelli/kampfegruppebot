//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
//#region KMPF
import { lProfile, uProfile } from './varInterfaces';
import { serverID, serverLink, roles, kmpfMSG, stinac, disTC, fullrank, getUser, getTChannel } from "./const";
import { getDayOfYear } from "./datentime";
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
    export async function addToWpp(userID: string) {
        getUser(userID).then(async(u: any) => {
            const myUser: Discord.User = u;
            await myUser.sendMessage('Por favor, escribe tu numero de celular para ser añadido al grupo de WPP\n__(ie: +5491162908200)__');
            await myUser.dmChannel.awaitMessages((m: any) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] })
                .then((collected: any) => {
                    getTChannel('667006073441484801').then((c: any) => {
                        const channel_: Discord.TextChannel = c;
                        channel_.send('El usuario <@' + userID + '> desea ser añadido al grupo de Whatsapp\nNro: ' + collected.first().content)
                    })
                }); await myUser.sendMessage('Su numero fue enviado a los Coroneles\nEn breve sera agregado al grupo\n**Saludos, KMPF!**');
        });
    }
    export async function addFCumple(userID: string) {
        getUser(userID).then(async(u: any) => {
            const myUser: Discord.User = u;
            await myUser.sendMessage('Por favor, ingrese su fecha de cumpleaños\n:warning: El formato debe ser DIA/MES\n__(ie: 31/5)__');
            await myUser.dmChannel.awaitMessages((m: any) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] })
                .then((collected: any) => {
                    console.log(collected.first().content)
                }); await myUser.sendMessage('Su fecha ya fue guardada\n**Saludos, KMPF!**');
        });
    }
//#endregion
//#region Expulsion & Ban
    export async function kickUsuario(uid: string, server: any, data: any) {
        server.guild.fetchMember(uid).then((u: any) => { u.send(data.txt + serverLink+ '\n Saludos, KMPF').then(() => { u.kick(data.rzn); }); });
        const channel = server.guild.channels.get(disTC[4]).send('**El USUARIO** <@' + uid +'> FUE EXPULSADO');
    }
    export async function kickUsuarioByMsg(uid: string, server: any, data: any) {
        server.guild.fetchMember(uid).then((u: any) => { u.send(data.txt + serverLink+ '\n Saludos, KMPF').then(() => { u.kick(data.rzn); }); });
        const channel = server.guild.channels.get(disTC[4]).send('**El USUARIO** <@' + uid +'> FUE EXPULSADO');
    }
//#endregion
//#region KMPF FNs
//#region checkIf
    //#region AFK
        export function checkIfAFK(client: any) {
            const usersfb = firebase.database().ref('/users');
            usersfb.once('value', snapshot => {
                snapshot.forEach(snap => {
                    let auxuser: uProfile = snap.val(),daydif = getDayOfYear(auxuser.connect.laston);
                    let msg :{ user: string; coroneles: string} = { user: '', coroneles: '' };
                    if(daydif >= stinac.pri.s) {
                        msg = {
                            user: '<@' + snap.key + '>\nLleva 1 semana de **INACTIVIDAD** en el servidor.\nPara dejar de recibir este mensaje, presente actividad. Caso contrario, __cada semana que pase descendera un rango__. Si llega a rango **CANDIDATO**, y no presento actividad, sera expulsado.\nSi tiene rol **INVITADO** o **CANDIDATO**, al vencer la semana de advertencia, __será expulsado directamente__.\nKMPF',
                            coroneles: '**El USUARIO** <@' + snap.key +'> Se encuentra inactivo hace ' + daydif + ' diás en el servidor\n Mensaje de Advertencia fue _ENVIADO_'
                        }
                        client.channels.get(disTC[4]).send(msg.coroneles).then(async() => { await client.users.get(String(snap.key)).sendMessage(msg.user); });
                    }
                });
            });
        }
        export function isAFK(client: any) {
            const usersfb = firebase.database().ref('/users');
            usersfb.once('value', snapshot => {
                snapshot.forEach(snap => {
                    let auxuser: uProfile = snap.val(),daydif = getDayOfYear(auxuser.connect.laston);
                    let msg :{ user: string; coroneles: string} = { user: '', coroneles: '' };
                    if (daydif >= 14) {
                        if(daydif >= stinac.sec.s) {
                            msg = {
                                user: '<@' + snap.key + '>\nSu rango fue __DESCENDIDO__!\nSeguira descendiendo, hasta que presente actividad.\n:warning::warning:Recuerde: **Si llega a rango __CANDIDATO__, y no presento actividad, sera expulsado.**:warning::warning:\nKMPF',
                                coroneles: 'El usuario: <@' + snap.key + '> fue __DESCENDIDO__ de rango por INACTIVIDAD' 
                            };
                            client.channels.get(disTC[4]).send(msg.coroneles).then(async() => { 
                                await downgradingRank(String(snap.key), client); 
                                await client.users.get(String(snap.key)).send(msg.user);
                            });
                        }
                    }
                });
            });
        }
        export async function downgradingRank(uid: string, client: any) { //Inactividad
            const server = client.guilds.find((g: any) => g.id == serverID);
            server.fetchMember(uid).then((u: any) => {
                for(let i = 0; i < roles.length; i++) {
                    if(u.roles.has(roles[i]) && i < roles.length) {
                        //console.log('Username: ' + u.name);
                        u.addRole(roles[i + 1]);
                        u.removeRole(roles[i]);
                        server.guild.channels.get(disTC[4]).send('**El USUARIO** <@' + uid +'> fue degrado de <@' + roles[i] + '> a <@' + roles[i+1] + '>');
                    } else { expulsarPorRank(uid, client); }
                }
            });
        }
        async function expulsarPorRank(uid: string, client: any) {
            const server = client.guilds.find((g: any) => g.id == serverID);
            server.fetchMember(uid).then((u: any) => {
                if((u.roles.has(fullrank[fullrank.length - 1])) || u.roles.has(fullrank[fullrank.length - 2])) {
                    server.guild.fetchMember(uid).then((u: any) => { u.send('Fue expulsado por **INACTIVIDAD**\nPuede volver a reingresar al servidor haciendo click en la invitación.' + serverLink + '\n Saludos, KMPF').then(() => { u.kick('EXPULSADO POR INACTIVIDAD'); }); firebase.database().ref('/users').child(uid).remove(); });
                    server.guild.channels.get(disTC[4]).send('**El USUARIO** <@' + uid +'> FUE EXPULSADO');
                }
            });
        }
    //#endregion
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
    export function checkIfCumple(client: any) {
        const userfb = firebase.database().ref('/users');
        userfb.once('value', async snapshot => {
            snapshot.forEach(snap => {
                const disU: uProfile = snap.val(), uBirth = new Date(String(disU.birth)), todday = new Date();
                if((uBirth.getDate() + '/' + (uBirth.getMonth() + 1)) == (todday.getDate() + '/' + (todday.getMonth() + 1))) {
                    console.log('CUMPLEAÑOS ' + disU.nombre);
                    let embedMSG: any = new Discord.RichEmbed().setTitle(kmpfMSG.kmpfNews.Arr[0].titulo).setDescription('Que tengas un **Feliz Cumpleaños** <@' + snap.key + '>\nCLAN <@594571311171371008>');
                    client.channels.get(kmpfMSG.kmpfNews.MC).send(embedMSG);
                }
            });
        });
    }
//#endregion
//#endregion