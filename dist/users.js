"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const firebase = require("firebase/app");
require("firebase/database");
const const_1 = require("./const");
const datentime_1 = require("./datentime");
function escribirUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firebase.database().ref('/users').child(usuario.uid).update({
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
    });
}
exports.escribirUsuario = escribirUsuario;
function leerUsuario(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        firebase.database().ref('/users').child(uid).on('value', snapshot => {
            let auxDat = snapshot.val();
            return { uid: snapshot.key, userDat: auxDat };
        });
    });
}
exports.leerUsuario = leerUsuario;
function emptyUsuario(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        firebase.database().ref('/users').child(uid).on('value', snapshot => {
            let auxDat = snapshot.val();
            if (!(auxDat.loaded))
                return true;
        });
        return false;
    });
}
exports.emptyUsuario = emptyUsuario;
function lastConnectionusuario(uid) {
    return __awaiter(this, void 0, void 0, function* () { yield firebase.database().ref('/users/').child(uid).child('connect').update({ laston: new Date() }); });
}
exports.lastConnectionusuario = lastConnectionusuario;
function addToWpp(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const_1.getUser(userID).then((u) => __awaiter(this, void 0, void 0, function* () {
            const myUser = u;
            yield myUser.sendMessage('Por favor, escribe tu numero de celular para ser añadido al grupo de WPP\n__(ie: +5491162908200)__');
            yield myUser.dmChannel.awaitMessages((m) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] })
                .then((collected) => {
                const_1.getTChannel('667006073441484801').then((c) => {
                    const channel_ = c;
                    channel_.send('El usuario <@' + userID + '> desea ser añadido al grupo de Whatsapp\nNro: ' + collected.first().content);
                });
            });
            yield myUser.sendMessage('Su numero fue enviado a los Coroneles\nEn breve sera agregado al grupo\n**Saludos, KMPF!**');
        }));
    });
}
exports.addToWpp = addToWpp;
function addFCumple(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const_1.getUser(userID).then((u) => __awaiter(this, void 0, void 0, function* () {
            const myUser = u;
            yield myUser.sendMessage('Por favor, ingrese su fecha de cumpleaños\n:warning: El formato debe ser DIA/MES\n__(ie: 31/5)__');
            yield myUser.dmChannel.awaitMessages((m) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] })
                .then((collected) => {
                console.log(collected.first().content);
            });
            yield myUser.sendMessage('Su fecha ya fue guardada\n**Saludos, KMPF!**');
        }));
    });
}
exports.addFCumple = addFCumple;
function kickUsuario(uid, server, data) {
    return __awaiter(this, void 0, void 0, function* () {
        server.guild.fetchMember(uid).then((u) => { u.send(data.txt + const_1.serverLink + '\n Saludos, KMPF').then(() => { u.kick(data.rzn); }); });
        const channel = server.guild.channels.get(const_1.disTC[4]).send('**El USUARIO** <@' + uid + '> FUE EXPULSADO');
    });
}
exports.kickUsuario = kickUsuario;
function kickUsuarioByMsg(uid, server, data) {
    return __awaiter(this, void 0, void 0, function* () {
        server.guild.fetchMember(uid).then((u) => { u.send(data.txt + const_1.serverLink + '\n Saludos, KMPF').then(() => { u.kick(data.rzn); }); });
        const channel = server.guild.channels.get(const_1.disTC[4]).send('**El USUARIO** <@' + uid + '> FUE EXPULSADO');
    });
}
exports.kickUsuarioByMsg = kickUsuarioByMsg;
function checkIfAFK(client) {
    const usersfb = firebase.database().ref('/users');
    usersfb.once('value', snapshot => {
        snapshot.forEach(snap => {
            let auxuser = snap.val(), daydif = datentime_1.getDayOfYear(auxuser.connect.laston);
            let msg = { user: '', coroneles: '' };
            if (daydif >= const_1.stinac.pri.s) {
                msg = {
                    user: '<@' + snap.key + '>\nLleva 1 semana de **INACTIVIDAD** en el servidor.\nPara dejar de recibir este mensaje, presente actividad. Caso contrario, __cada semana que pase descendera un rango__. Si llega a rango **CANDIDATO**, y no presento actividad, sera expulsado.\nSi tiene rol **INVITADO** o **CANDIDATO**, al vencer la semana de advertencia, __será expulsado directamente__.\nKMPF',
                    coroneles: '**El USUARIO** <@' + snap.key + '> Se encuentra inactivo hace ' + daydif + ' diás en el servidor\n Mensaje de Advertencia fue _ENVIADO_'
                };
                client.channels.get(const_1.disTC[4]).send(msg.coroneles).then(() => __awaiter(this, void 0, void 0, function* () { yield client.users.get(String(snap.key)).sendMessage(msg.user); }));
            }
        });
    });
}
exports.checkIfAFK = checkIfAFK;
function isAFK(client) {
    const usersfb = firebase.database().ref('/users');
    usersfb.once('value', snapshot => {
        snapshot.forEach(snap => {
            let auxuser = snap.val(), daydif = datentime_1.getDayOfYear(auxuser.connect.laston);
            let msg = { user: '', coroneles: '' };
            if (daydif >= 14) {
                if (daydif >= const_1.stinac.sec.s) {
                    msg = {
                        user: '<@' + snap.key + '>\nSu rango fue __DESCENDIDO__!\nSeguira descendiendo, hasta que presente actividad.\n:warning::warning:Recuerde: **Si llega a rango __CANDIDATO__, y no presento actividad, sera expulsado.**:warning::warning:\nKMPF',
                        coroneles: 'El usuario: <@' + snap.key + '> fue __DESCENDIDO__ de rango por INACTIVIDAD'
                    };
                    client.channels.get(const_1.disTC[4]).send(msg.coroneles).then(() => __awaiter(this, void 0, void 0, function* () {
                        yield downgradingRank(String(snap.key), client);
                        yield client.users.get(String(snap.key)).send(msg.user);
                    }));
                }
            }
        });
    });
}
exports.isAFK = isAFK;
function downgradingRank(uid, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = client.guilds.find((g) => g.id == const_1.serverID);
        server.fetchMember(uid).then((u) => {
            for (let i = 0; i < const_1.roles.length; i++) {
                if (u.roles.has(const_1.roles[i]) && i < const_1.roles.length) {
                    u.addRole(const_1.roles[i + 1]);
                    u.removeRole(const_1.roles[i]);
                    server.guild.channels.get(const_1.disTC[4]).send('**El USUARIO** <@' + uid + '> fue degrado de <@' + const_1.roles[i] + '> a <@' + const_1.roles[i + 1] + '>');
                }
                else {
                    expulsarPorRank(uid, client);
                }
            }
        });
    });
}
exports.downgradingRank = downgradingRank;
function expulsarPorRank(uid, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = client.guilds.find((g) => g.id == const_1.serverID);
        server.fetchMember(uid).then((u) => {
            if ((u.roles.has(const_1.fullrank[const_1.fullrank.length - 1])) || u.roles.has(const_1.fullrank[const_1.fullrank.length - 2])) {
                server.guild.fetchMember(uid).then((u) => { u.send('Fue expulsado por **INACTIVIDAD**\nPuede volver a reingresar al servidor haciendo click en la invitación.' + const_1.serverLink + '\n Saludos, KMPF').then(() => { u.kick('EXPULSADO POR INACTIVIDAD'); }); firebase.database().ref('/users').child(uid).remove(); });
                server.guild.channels.get(const_1.disTC[4]).send('**El USUARIO** <@' + uid + '> FUE EXPULSADO');
            }
        });
    });
}
function checkIfleft(client) {
    const usersfb = firebase.database().ref('/users'), server = client.guilds.find((g) => g.id == const_1.serverID);
    usersfb.once('value', snapshot => {
        snapshot.forEach(ufb => {
            server.members((uMem) => uMem === ufb.key).catch((err) => {
                console.log(err);
            });
        });
    });
}
exports.checkIfleft = checkIfleft;
function checkIfCumple(client) {
    const userfb = firebase.database().ref('/users');
    userfb.once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
        snapshot.forEach(snap => {
            const disU = snap.val(), uBirth = new Date(String(disU.birth)), todday = new Date();
            if ((uBirth.getDate() + '/' + (uBirth.getMonth() + 1)) == (todday.getDate() + '/' + (todday.getMonth() + 1))) {
                console.log('CUMPLEAÑOS ' + disU.nombre);
                let embedMSG = new Discord.RichEmbed().setTitle(const_1.kmpfMSG.kmpfNews.Arr[0].titulo).setDescription('Que tengas un **Feliz Cumpleaños** <@' + snap.key + '>\nCLAN <@594571311171371008>');
                client.channels.get(const_1.kmpfMSG.kmpfNews.MC).send(embedMSG);
            }
        });
    }));
}
exports.checkIfCumple = checkIfCumple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBeUM7QUFDekMseUNBQTJDO0FBQzNDLDZCQUEyQjtBQUkzQixtQ0FBOEc7QUFDOUcsMkNBQTJDO0FBSzNDLFNBQXNCLGVBQWUsQ0FBQyxPQUFpQjs7UUFDbkQsTUFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzlELE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDOUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUM5QixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRTtnQkFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDdEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQ3RDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQzNDO1lBQ0QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSztZQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzlCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBZEQsMENBY0M7QUFDRCxTQUFzQixXQUFXLENBQUMsR0FBVzs7UUFDekMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFB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