//#region IMPORTS
import * as Discord from "discord.js";
import { serverID, serverLink, roles, kmpfMSG, disTC, getUser, getTChannel, rolespoints } from "./const";
import { birthPUT, birthsGET, decpointsPUT, redlightsGET, userDELETE, usersGET,  } from "./api";
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
            await myUser.sendMessage('Por favor, ingrese su fecha de cumpleaños\n:warning: El formato debe ser AÑO-MES-DIA\n__(ie: 2018-5-31)__');
            await myUser.dmChannel.awaitMessages((m: any) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] })
                .then((collected: any) => {
                    console.log(collected.first().content);
                    birthPUT(myUser.id, { birth: collected.first().content });
                }); await myUser.sendMessage('Su fecha ya fue guardada\n**Saludos, KMPF!**');
        });
    }
    export async function kickUsuarioByMsg(uid: string, server: any, data: any) {
        server.guild.fetchMember(uid).then((u: any) => { u.send(data.txt + serverLink+ '\n Saludos, KMPF').then(() => { u.kick(data.rzn); }); });
        const channel = server.guild.channels.get(disTC[4]).send('**El USUARIO** <@' + uid +'> FUE EXPULSADO');
    }
//#endregion
//#region KMPF FNs
//#region checkIf
        export function isAFK(client: any) {
            let msgem: Discord.RichEmbed = new Discord.RichEmbed().setTitle('Usuarios AFK').setColor('#ff0000');
            let afklst: Array<{ id_: string; msg: string}> = new Array(0);
            redlightsGET().then((AFKlist: any) => {
                let IDs: Array<{id: string; daysinac: number}> = AFKlist;
                IDs.forEach(user => {
                    afklst.push({id_: user.id, msg: '<@' + user.id + '>\nSu rango fue __DESCENDIDO__ por INACTIVIDAD!\nKMPF'});
                    msgem.addField(user.id + ' | ' + user.daysinac + ' Dias Inactivo', false);
                    client.channels.get(disTC[4]).send(msgem).then(() => { 
                        afklst.forEach(async user_ => {
                            await downgradingRank(user_.id_, client); 
                            await client.users.get(user_.id_).send(user_.msg);
                        })
                    });
                });
            });
        }
        export async function downgradingRank(uid: string, client: any) { //Inactividad
            const server = client.guilds.find((g: any) => g.id == serverID);
            server.fetchMember(uid).then((u: any) => {
                for(let i = 0; i < rolespoints.length; i++) {
                    if(u.roles.has(rolespoints[i]) && i < roles.length) {
                        u.addRole(rolespoints[i + 1]);
                        u.removeRole(rolespoints[i]);
                        decpointsPUT(uid, { points: 500 });
                        server.guild.channels.get(disTC[4]).send('**El USUARIO** <@' + uid +'> fue degrado de <@' + roles[i] + '> a <@' + roles[i+1] + '>');
                    }
                }
            });
        }
        export async function upgradingRank(uid: string, client: any) { //Inactividad
            const server = client.guilds.find((g: any) => g.id == serverID);
            server.fetchMember(uid).then((u: any) => {
                for(let i = roles.length; 1 > i; i--) {
                    if(u.roles.has(roles[i]) && (1 > i) ) {
                        u.addRole(roles[i]);
                        u.removeRole(roles[i + 1]);
                    }
                }
            });
        }
        export function checkIfleft(client: any) {
            usersGET().then((users: any) => {
                let usersIDs: Array<{id: string}> = users;
                usersIDs.forEach(user => {
                    getUser(user.id).catch((err) => { 
                        console.log(err);
                        userDELETE(user.id);
                    });
                });
            });
        }
        export function checkIfCumple(client: any) {
            birthsGET().then((cumples: any) => {
                let IDs: Array<{id:string}> = cumples;
                IDs.forEach(user => {
                    let embedMSG: any = new Discord.RichEmbed().setTitle(kmpfMSG.kmpfNews.Arr[0].titulo).setDescription('Que tengas un **Feliz Cumpleaños** <@' + user.id + '>\nCLAN <@594571311171371008>\n\n@here');
                    client.channels.get(kmpfMSG.kmpfNews.MC).send(embedMSG);
                }) ;
            });
        }
//#endregion