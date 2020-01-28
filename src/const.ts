import { uJuego } from "./varInterfaces";
import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import "firebase/database";
import { client } from './index';

//#region Bot & Server data
    export const serverID:   string = '451837050618904577';
    export const serverLink: string = 'https://discord.gg/zx9UAVx';
    export const kmpfID:     string = '451837050618904577', roleF = '521184706142797834';
//#endregion
//#region TextChannels && MSGs
    export const disTC = ['611501042210963456' /* #WELCOME */, '611501099450499082' /* #NEWS */, '614258469066768424' /* #KMPF */, '620642948660330506' /* #KMPF-CORONELES */, '667006073441484801' /* KMPF NOTIFY */, '667006413113131008' /* CORONELES */];
    export const kmpfMSG = {
        kmpfrules: {
            MC: disTC[0],
            Arr: [{
                titulo: '📚📚 **REGLAS** 📚📚',
                desc: '**✅_ACEPTAR_ O ❌_RECHAZAR_ LAS REGLAS**',
                data: [
                    { texto: '⚠️💤 **INACTIVIDAD** 💤⚠️', desc: '_En canales de **DISCORD** (texto y voz)_\n|-> 20 dias de inactividad, <@594571311171371008> **_(BOT)_** envia una alerta por Mensaje Privado (MP)\n|-> Se tiene un plazo de 3 días para volver a participar en los canales\n|-> Si no se cumple lo dicho anteriormente, descenderá de rango hasta ser @Candidato (@Invitados tienen expulsión directa)\nℹ️ℹ️ _Si es **EXPULSADO**, <@594571311171371008> **(BOT)** le enviara un MP con un URL para reingresar al servidor, pero pierde todos los rangos que tenia_', emoji: '-' },
                    { texto: '📑📑 **CONVIVENCIA** 📑📑', desc: '🎤🎤 __CANALES DE VOZ__\nAl entrar a un CV (Canal de Voz), siempre __SALUDAR A TODOS__. Como cuando uno llega a un lugar saluda a los presentes, igual acá. Saludar a un solo miembro por llevarse bien, y no al resto, termina en una **__advertencia__**\n📜🎤 __CANALES DE VOZ/TEXTO__\nNo hay restricciones en los temas que se hablan dentro de los canales, no hay ningun problema con la ideologia de cualquier miembro del clan, sea cual sea su pensamiento de vida. Respecto a la discriminacion/chistes, no hay restricciones, a **bancarla**, si todo es con humor. **__La persona de mayor rango puede intervenir y cortar la conversacion si se fue de las manos__**', emoji: '-' },
                    { texto: '☠🚫 **STRIKES Y BANEOS** 🚫☠️', desc: '|-> **__PROHIBIDO__** pasar contenido **NSFW** en __**WHATSAPP**__ y en __**DISCORD**__ fuera del canal #nsfw\n|-> Falta de incumplimiento anterior, degradan automaticamente 1 escalafon. En caso de ser <@&521709396863090698>, es  **EXPULSION**\n|-> Los usuarios que no cumplan las reglas, pueden recibir __STRIKES__. Si se llega a la máxima cantidad (3 strikes), el usuario sera __BANEADO__  del servidor, sin posibilidad de volver', emoji: '-' },
                    { texto: '🥡🥡 **JUNTADAS** 🥡🥡', desc: '|-> Salidas por capital\n|----|-> Pueden participar todos los miembros\n|-> Asados\n|----|-> Solo miembros registrados y con rango <@&521709251941629975> hacia arriba\n|-> Reuniones\n|----|-> Solo miembros con Rango <@&517171083384979456> para arriba\n|----|-> Solo <@&517169596059615252> pueden enviar invitaciones a las reuniones\n|----|-> Con derecho de admision\n|----|-> Si un miembro envia una invitacion, podrá recibir un **ban ** o ser ** expulsado**\n|----|-> Participar ayuda a subir de rango', emoji: '✅' },
                    { texto: '📱📱 **SOCIAL MEDIA** 📱📱', desc: '|-> Canal de Youtube\n|----|-> Los miembros pueden pasarle los videos a <@&517169596059615252> para subirlos\n|----|----|-> Los videos se pasan por **DropBox / Mega / Google Drive**\n|----|----|-> Pasar Titulo y descripcion\n|-> **SE SUBE SOLO CONTENIDO DE JUEGOS**', emoji: '❌' }
                ]
            }
        ]}, kmpfNews: {
            MC: disTC[1],
            Arr: [{
                titulo: '🍰🍰 **FELIZ CUMPLE** 🍰🍰',
                desc: '',
                data: [
                    { texto: '️KMPF', desc: '-', emoji: '-' },
                ]
            }
        ]}, kmpfroles: {
            MC: disTC[2],
            Arr: [{
                titulo: '_**INFORMACIÓN IMPORTANTE**_',
                data: [
                    { texto: '**Reacciona a los msj**', desc: 'Haz click en las reaciones para realizar las acciones', emoji: '' }
                ]
            },{
                titulo: '_**PERFIL Y ROLES**_',
                desc: '.',
                data: [
                    { texto: '**WHATSAPP GRUPO**', desc: 'Te añade al grupo de Whatsapp', emoji: '☎️' },
                    { texto: '**FELIX CUMPLE**', desc: 'Te añade tu fecha de cumpleaños', emoji: '🎂' },
                    { texto: '**NSFW**', desc: 'Te permite ver el canal <#623672085474050059>', emoji: '🔞' }
                ]
            }
        ]}, kmpfCoroneles: {
            MC: disTC[3],
            Arr: [{
                    titulo: '_**KMPF FÜHRER**_',
                    desc: ' ',
                    data: [
                        { texto: '**PRESENTE**', desc: 'Permite vovler a ser Führer', emoji: '🏠' },
                        { texto: '**AUSENTE**', desc: 'Le saltea en Orden Führer por ausencia', emoji: '⛱' }
                    ]
                },{
                    titulo: '_**KMPF CORONELES**_',
                    desc: ':exclamation::exclamation: _UTILIZAR LAS ACCIONES CON RESPONSABILIDAD_',
                    data: [
                        { texto: '**PRUNE** _(DESHABILITADO)_', desc: 'Elimina a todos los jugadores ya inactivos hace 30 o más días', emoji: '❌' },
                        /* { texto: '**PERFILES DE USUARIOS** _(DESHABILITADO)_', desc: 'Permite ver los perfil de los usuarios, votar para eliminar, enviar msj de advertencia', emoji: '📁' }, */
                        { texto: '**LISTA NO REGISTRADOS** ', desc: 'Ver lista de usuarios __NO REGISTRADOS__', emoji: '🔴' }
                    ]
                }
            ]
        }
    };
    export const kmpfKicktxt = {
        kick: {
            rzn: 'INACTIVIDAD',
            txt: '**FUE EXPULSADO POR INACTIVIDAD**\nPara reingresar al clan, acepte la invitación '
        }, 
        reglasX: {
            rzn: 'RECHAZO REGLAMENTO',
            txt: '**USTED A RECHAZO EL REGLAMENTO**\nPara reingresar al clan, acepte la invitación '
        }
    }
//#endregion
//#region roles
    export const roles = ['517171083384979456' /*Teniente*/, '521709081757745172' /*Subteniente*/, '521709251941629975' /*Soldado Raso*/, '517171515071135764' /*Cabo Primero*/, '521709396863090698' /*Candidato*/];
    export const fullrank: Array<string> = [
        '517169596059615252', //Coronel
        '517171083384979456', //Teniente
        '521709081757745172', //Subteniente
        '521709251941629975', //Cabo Primero
        '517171515071135764', //Soldado Raso
        '521709396863090698', //Candidato
        '533069497561513994'  //Invitado
    ];
    export const juegos: Array<uJuego> = [
        { nombre: 'Battlefield 1',          code: 'bf1',  EID: '613181668672536600' },
        { nombre: 'Battlefield 4',          code: 'bf4',  EID: '613182924745080862' },
        { nombre: 'Battlefield V',          code: 'bf5',  EID: '613181661273653291' },
        { nombre: 'Warthunder',             code: 'wt',   EID: '613182915563618315' },
        { nombre: 'Euro Truck Simulator 2', code: 'ets2', EID: '613182913676050442' },
        { nombre: 'Grand theft Auto V',     code: 'gta5', EID: '617123585701445659' }
    ];
//#endregion
//#region Inactvidad
    export const stinac = {
        pri: { s: 7, e: 14 },
        sec: { s: 14, e: 21 },
        tri: { s: 21, e: 28 },
        quad: { s: 28, e: 35 },
        quin: { s: 35, e: 42 },
    }
//#endregion
//#region API Client
    export function getUser(userID: string) {
        return new Promise((resolve, reject) => {
            client.fetchUser(userID).then((uData: Discord.User) => resolve(uData)).catch(err => reject(err));
        });
    }
    export function getServer(serverID: string) {
        return new Promise((resolve, reject) => {
            client.guilds.forEach((s: Discord.Guild) => {
                if(s.id == serverID) { resolve(s) } 
            }); reject('NOT FOUND');
        });
    }
    export function getTChannel(channelID: string) {
        return new Promise((resolve, reject) => {
            client.channels.forEach((c: Discord.Channel) => {
                if(c.id == channelID) { resolve(c); }
            }); reject('NOT FOUND');
        })
    }
//#endregion
//#region Firebase
    /* export const tbBot    = firebase.database().ref('/bot');
    export const tbFuhrer = firebase.database().ref('/fuhrer');
    export const tbUsers  = firebase.database().ref('/users'); */
//#endregion


/* { texto: '', desc: '', emoji: '-' }, */