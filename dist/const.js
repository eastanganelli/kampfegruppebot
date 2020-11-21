"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelMsgs = exports.getChannelType = exports.getTChannel = exports.getUserGuild = exports.getServer = exports.getUser = exports.juegos = exports.rolespoints = exports.noboroles = exports.roles = exports.AFKch = exports.kmpfKicktxt = exports.kmpfMSG = exports.disTC = exports.AFKusersCron = exports.birthdayCron = exports.nextFuhrerCron = exports.roleF = exports.kmpfID = exports.serverLink = exports.serverID = void 0;
const index_1 = require("./index");
exports.serverID = '451837050618904577';
exports.serverLink = 'https://discord.gg/zx9UAVx';
exports.kmpfID = '451837050618904577', exports.roleF = '521184706142797834';
exports.nextFuhrerCron = '00 00 * * 1 *';
exports.birthdayCron = '00 08 * * * *';
exports.AFKusersCron = '00 00 * * 1 *';
exports.disTC = ['611501042210963456', '611501099450499082', '614258469066768424', '620642948660330506', '667006073441484801', '667006413113131008'];
exports.kmpfMSG = {
    kmpfrules: {
        MC: exports.disTC[0],
        Arr: [{
                titulo: '📚📚 **REGLAS** 📚📚',
                desc: '**✅_ACEPTAR_ O ❌_RECHAZAR_ LAS REGLAS**',
                data: [
                    { texto: '⚠️💤 **INACTIVIDAD** 💤⚠️', desc: '|-> Considera actividad el estar conectado en VC (Voice Channel), con 1 o más miembros por almenos 10 minutos\n|-> 2 semanas de inactividad, <@594571311171371008> **_(BOT)_** envia por Mensaje Privado (MP) dónde se notificará el descenso de rango\nℹ️ℹ️ _Si se queda **SIN RANGO** puede volver a aceptar las reglas.ℹ️ℹ️', emoji: '-' },
                    { texto: '📑📑 **CONVIVENCIA** 📑📑', desc: '🎤🎤 __CANALES DE VOZ__\nAl entrar a un CV (Canal de Voz), siempre __SALUDAR A TODOS__. Como cuando uno llega a un lugar saluda a los presentes, igual acá. Saludar a un solo miembro por llevarse bien, y no al resto, termina en una **__advertencia__**\n📜🎤 __CANALES DE VOZ/TEXTO__\nNo hay restricciones en los temas que se hablan dentro de los canales, no hay ningun problema con la ideologia de cualquier miembro del clan, sea cual sea su pensamiento de vida. Respecto a la discriminacion/chistes, no hay restricciones, a **bancarla**, si todo es con humor. **__La persona de mayor rango puede intervenir y cortar la conversacion si se fue de las manos__**', emoji: '-' },
                    { texto: '☠🚫 **STRIKES Y BANEOS** 🚫☠️', desc: '|-> **__PROHIBIDO__** pasar contenido **NSFW** en __**WHATSAPP**__ y en __**DISCORD**__ fuera del canal #nsfw\n|-> Falta de incumplimiento anterior, degradan automaticamente 1 escalafon. En caso de ser <@&521709396863090698>, es  **EXPULSION**\n|-> Los usuarios que no cumplan las reglas, pueden recibir __STRIKES__. Si se llega a la máxima cantidad (3 strikes), el usuario sera __BANEADO__  del servidor, sin posibilidad de volver', emoji: '-' },
                    { texto: '🥡🥡 **JUNTADAS** 🥡🥡', desc: '|-> Salidas por capital\n|----|-> Pueden participar todos los miembros\n|-> Asados\n|----|-> Solo miembros registrados y con rango <@&521709251941629975> hacia arriba\n|-> Reuniones\n|----|-> Solo miembros con Rango <@&517171083384979456> para arriba\n|----|-> Solo <@&517169596059615252> pueden enviar invitaciones a las reuniones\n|----|-> Con derecho de admision\n|----|-> Si un miembro envia una invitacion, podrá recibir un **ban ** o ser ** expulsado**\n|----|-> Participar ayuda a subir de rango', emoji: '✅' },
                    { texto: '📱📱 **SOCIAL MEDIA** 📱📱', desc: '|-> Canal de Youtube\n|----|-> Los miembros pueden pasarle los videos a <@&517169596059615252> para subirlos\n|----|----|-> Los videos se pasan por **DropBox / Mega / Google Drive**\n|----|----|-> Pasar Titulo y descripcion\n|-> **SE SUBE SOLO CONTENIDO DE JUEGOS**', emoji: '❌' }
                ]
            }
        ]
    }, kmpfNews: {
        MC: exports.disTC[1],
        Arr: [{
                titulo: '🍰🍰 **FELIZ CUMPLE** 🍰🍰',
                desc: '',
                data: [
                    { texto: '️KMPF', desc: '-', emoji: '-' },
                ]
            }
        ]
    }, kmpfroles: {
        MC: exports.disTC[2],
        Arr: [{
                titulo: '_**INFORMACIÓN IMPORTANTE**_',
                data: [
                    { texto: '**Reacciona a los msj**', desc: 'Haz click en las reaciones para realizar las acciones', emoji: '' }
                ]
            }, {
                titulo: '_**PERFIL Y ROLES**_',
                desc: '.',
                data: [
                    { texto: '**WHATSAPP GRUPO**', desc: 'Te añade al grupo de Whatsapp', emoji: '☎️' },
                    { texto: '**FELIX CUMPLE**', desc: 'Te añade tu fecha de cumpleaños', emoji: '🎂' },
                    { texto: '**NSFW**', desc: 'Te permite ver el canal <#623672085474050059>', emoji: '🔞' }
                ]
            }
        ]
    }, kmpfCoroneles: {
        MC: exports.disTC[3],
        Arr: [{
                titulo: '_**KMPF FÜHRER**_',
                desc: ' ',
                data: [
                    { texto: '**PRESENTE**', desc: 'Permite vovler a ser Führer', emoji: '🏠' },
                    { texto: '**AUSENTE**', desc: 'Le saltea en Orden Führer por ausencia', emoji: '⛱' }
                ]
            }, {
                titulo: '_**KMPF CORONELES**_',
                desc: ':exclamation::exclamation: _UTILIZAR LAS ACCIONES CON RESPONSABILIDAD_',
                data: [
                    { texto: '**PRUNE** _(DESHABILITADO)_', desc: 'Elimina a todos los jugadores ya inactivos hace 30 o más días', emoji: '❌' },
                    { texto: '**LISTA NO REGISTRADOS** ', desc: 'Ver lista de usuarios __NO REGISTRADOS__', emoji: '🔴' }
                ]
            }
        ]
    }
};
exports.kmpfKicktxt = {
    reglasX: {
        rzn: 'RECHAZO REGLAMENTO',
        txt: '**USTED A RECHAZO EL REGLAMENTO**\nPara reingresar al clan, acepte la invitación '
    }
};
exports.AFKch = '496525236888535042';
exports.roles = [
    '517169596059615252',
    '517171083384979456',
    '521709081757745172',
    '521709251941629975',
    '517171515071135764',
    '521709396863090698',
];
exports.noboroles = [
    '517169596059615252',
    '517171083384979456',
    '757614592720633957',
    '517168972483919929',
    '613554375062847501'
];
exports.rolespoints = [
    { id: '521709081757745172', points: 3900 },
    { id: '521709251941629975', points: 2500 },
    { id: '517171515071135764', points: 1000 },
    { id: '521709396863090698', points: 0 },
];
exports.juegos = [
    { nombre: 'Battlefield 1', code: 'bf1', EID: '613181668672536600' },
    { nombre: 'Battlefield 4', code: 'bf4', EID: '613182924745080862' },
    { nombre: 'Battlefield V', code: 'bf5', EID: '613181661273653291' },
    { nombre: 'Warthunder', code: 'wt', EID: '613182915563618315' },
    { nombre: 'Euro Truck Simulator 2', code: 'ets2', EID: '613182913676050442' },
    { nombre: 'Grand theft Auto V', code: 'gta5', EID: '617123585701445659' }
];
function getUser(userID) {
    return new Promise((resolve, reject) => {
        var _a;
        (_a = index_1.client.user) === null || _a === void 0 ? void 0 : _a.fetch(userID).then((uData) => resolve(uData)).catch(err => reject('NOT FOUND'));
    });
}
exports.getUser = getUser;
function getServer(serverID) {
    return new Promise((resolve, reject) => {
        index_1.client.guilds.fetch(serverID).then((s) => { resolve(s); }).catch(err => reject('NOT FOUND'));
    });
}
exports.getServer = getServer;
function getUserGuild(serverID, userID) {
    return new Promise((resolve, reject) => {
        var _a;
        (_a = getServer(serverID)) === null || _a === void 0 ? void 0 : _a.then((G) => {
            var _a;
            (_a = getUser(userID)) === null || _a === void 0 ? void 0 : _a.then((userG) => {
                G.member(userG);
            }).catch(err => reject(err));
        }).catch(err => reject(err));
    });
}
exports.getUserGuild = getUserGuild;
function getTChannel(channelID) {
    return new Promise((resolve, reject) => {
        index_1.client.channels.fetch(channelID).then((C) => {
            resolve(C);
        });
        reject('NOT FOUND');
    });
}
exports.getTChannel = getTChannel;
function getChannelType(channelID) {
    return new Promise((resolve, reject) => {
        getTChannel(channelID).then((C) => {
            resolve(C.type);
        }).catch(err => reject(err));
    });
}
exports.getChannelType = getChannelType;
function getChannelMsgs(ChannelID, MsgLim) {
    getTChannel(ChannelID).then((Ch) => {
        if (Ch.isText()) {
            let messages = Ch.messages;
            messages.fetch({ limit: MsgLim }).then((msgs) => {
                msgs.forEach(msg => msg.delete());
            });
        }
    });
}
exports.getChannelMsgs = getChannelMsgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQWlDO0FBR2hCLFFBQUEsUUFBUSxHQUFhLG9CQUFvQixDQUFDO0FBQzFDLFFBQUEsVUFBVSxHQUFXLDRCQUE0QixDQUFDO0FBQ2xELFFBQUEsTUFBTSxHQUFlLG9CQUFvQixFQUFFLFFBQUEsS0FBSyxHQUFHLG9CQUFvQixDQUFDO0FBR3hFLFFBQUEsY0FBYyxHQUFHLGVBQWUsQ0FBQztBQUNqQyxRQUFBLFlBQVksR0FBSyxlQUFlLENBQUM7QUFDakMsUUFBQSxZQUFZLEdBQUssZUFBZSxDQUFDO0FBR2pDLFFBQUEsS0FBSyxHQUFHLENBQUMsb0JBQW9CLEVBQWlCLG9CQUFvQixFQUFjLG9CQUFvQixFQUFjLG9CQUFvQixFQUF3QixvQkFBb0IsRUFBb0Isb0JBQW9CLENBQWlCLENBQUM7QUFDNU8sUUFBQSxPQUFPLEdBQUc7SUFDbkIsU0FBUyxFQUFFO1FBQ1AsRUFBRSxFQUFFLGFBQUssQ0FBQyxDQUFDLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQztnQkFDRixNQUFNLEVBQUUsc0JBQXNCO2dCQUM5QixJQUFJLEVBQUUseUNBQXlDO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0YsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLGdVQUFnVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQzFYLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSxvcEJBQW9wQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQzlzQixFQUFFLEtBQUssRUFBRSwrQkFBK0IsRUFBRSxJQUFJLEVBQUUsaWJBQWliLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDL2UsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxFQUFFLHdmQUF3ZixFQUFFLEtBQUssRUFBRSxHQUFHLEVB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