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
                    firebase.database().ref('/users').child(uid).child('connect').update({ lastadv: new Date() });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBeUM7QUFDekMseUNBQTJDO0FBQzNDLDZCQUEyQjtBQUkzQixtQ0FBd0Y7QUFDeEYsMkNBQTJDO0FBSzNDLFNBQXNCLGVBQWUsQ0FBQyxPQUFpQjs7UUFDbkQsTUFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzlELE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDOUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUM5QixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRTtnQkFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDdEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQ3RDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQzNDO1lBQ0QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSztZQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzlCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBZEQsMENBY0M7QUFDRCxTQUFzQixXQUFXLENBQUMsR0FBVzs7UUFDekMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFB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