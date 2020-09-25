"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTChannel = exports.getServer = exports.getUser = exports.juegos = exports.rolespoints = exports.noboroles = exports.roles = exports.kmpfKicktxt = exports.kmpfMSG = exports.disTC = exports.roleF = exports.kmpfID = exports.serverLink = exports.serverID = void 0;
require("firebase/database");
const index_1 = require("./index");
exports.serverID = '451837050618904577';
exports.serverLink = 'https://discord.gg/zx9UAVx';
exports.kmpfID = '451837050618904577', exports.roleF = '521184706142797834';
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
        index_1.client.fetchUser(userID).then((uData) => resolve(uData)).catch(err => reject(err));
    });
}
exports.getUser = getUser;
function getServer(serverID) {
    return new Promise((resolve, reject) => {
        index_1.client.guilds.forEach((s) => {
            if (s.id == serverID) {
                resolve(s);
            }
        });
        reject('NOT FOUND');
    });
}
exports.getServer = getServer;
function getTChannel(channelID) {
    return new Promise((resolve, reject) => {
        index_1.client.channels.forEach((c) => {
            if (c.id == channelID) {
                resolve(c);
            }
        });
        reject('NOT FOUND');
    });
}
exports.getTChannel = getTChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkJBQTJCO0FBQzNCLG1DQUFpQztBQUdoQixRQUFBLFFBQVEsR0FBYSxvQkFBb0IsQ0FBQztBQUMxQyxRQUFBLFVBQVUsR0FBVyw0QkFBNEIsQ0FBQztBQUNsRCxRQUFBLE1BQU0sR0FBZSxvQkFBb0IsRUFBRSxRQUFBLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztBQUd4RSxRQUFBLEtBQUssR0FBRyxDQUFDLG9CQUFvQixFQUFpQixvQkFBb0IsRUFBYyxvQkFBb0IsRUFBYyxvQkFBb0IsRUFBd0Isb0JBQW9CLEVBQW9CLG9CQUFvQixDQUFpQixDQUFDO0FBQzVPLFFBQUEsT0FBTyxHQUFHO0lBQ25CLFNBQVMsRUFBRTtRQUNQLEVBQUUsRUFBRSxhQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1osR0FBRyxFQUFFLENBQUM7Z0JBQ0YsTUFBTSxFQUFFLHNCQUFzQjtnQkFDOUIsSUFBSSxFQUFFLHlDQUF5QztnQkFDL0MsSUFBSSxFQUFFO29CQUNGLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSxnVUFBZ1UsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUMxWCxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRSxJQUFJLEVBQUUsb3BCQUFvcEIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUM5c0IsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUUsSUFBSSxFQUFFLGliQUFpYixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQy9lLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSx3ZkFBd2YsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUMvaUIsRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLDJRQUEyUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7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