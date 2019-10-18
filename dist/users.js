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
function downgradingRank(uid, client) {
    return __awaiter(this, void 0, void 0, function* () {
        client.guilds.find((g) => g.id == const_1.serverID).fetchMember(uid).then((u) => {
            for (let i = 0; i < const_1.roles.length; i++) {
                if (u.roles.has(const_1.roles[i]) && i < const_1.roles.length) {
                    console.log('Username: ' + u.name);
                    firebase.database().ref('/users').child(uid).child('connect').update({ lastadv: new Date() });
                    u.addRole(const_1.roles[i + 1]);
                    u.removeRole(const_1.roles[i]);
                }
            }
        });
    });
}
exports.downgradingRank = downgradingRank;
function kickUsuario(uid, client, data) {
    return __awaiter(this, void 0, void 0, function* () {
        client.guilds.find((g) => g.id == const_1.serverID).fetchMember(uid).then((u) => {
            u.send(data.txt + const_1.serverLink).then(() => { u.kick(data.rzn); +'\n Saludos, KMPF'; });
        });
    });
}
exports.kickUsuario = kickUsuario;
function kickUsuarioByMsg(uid, client, data) {
    return __awaiter(this, void 0, void 0, function* () {
        client.fetchMember(uid).then((u) => {
            u.send(data.txt + const_1.serverLink).then(() => { u.kick(data.rzn); +'\n Saludos, KMPF'; });
        });
    });
}
exports.kickUsuarioByMsg = kickUsuarioByMsg;
function checkIfAFK(client) {
    const usersfb = firebase.database().ref('/users');
    usersfb.once('value', snapshot => {
        snapshot.forEach(snap => {
            let auxuser = snap.val();
            let daydif = datentime_1.getDayOfYear(auxuser.connect.laston);
            if (daydif >= 14 && daydif < 21) {
                const msg_ = '<@' + snap.key + '>\nLleva ' + daydif + ' días de **INACTIVIDAD** en el servidor.\nPara dejar de recibir este mensaje, presente actividad. Caso contrario, __cada semana que pase descendera un rango__. Si llega a rango **CANDIDATO**, y no presento actividad, sera expulsado.\nSi tiene rol **INVITADO** o **CANDIDATO**, al vencer la semana de advertencia, __será expulsado directamente__.\nKMPF';
                client.fetchMember(snap.key).send(msg_).then(() => { usersfb.child(String(snap.key)).child('connect').update({ lastadv: datentime_1.getWeekNumber() }); });
            }
            else if (daydif >= 21) {
                if (Number(auxuser.connect.lastAdv) < datentime_1.getWeekNumber()) {
                    const msg_ = '<@' + snap.key + '>\nSu rango fue __DESCENDIDO__!\nSeguira descendiendo, hasta que presente actividad.\n:warning::warning:Recuerde: **Si llega a rango __CANDIDATO__, y no presento actividad, sera expulsado.**:warning::warning:\nKMPF';
                    client.fetchMember(snap.key).send(msg_).then(() => { usersfb.child(String(snap.key)).child('connect').update({ lastadv: datentime_1.getWeekNumber() }); });
                }
            }
        });
    });
}
exports.checkIfAFK = checkIfAFK;
function checkIfCumple(client) {
    const userfb = firebase.database().ref('/users');
}
exports.checkIfCumple = checkIfCumple;
function checkIfleft() {
}
exports.checkIfleft = checkIfleft;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSx5Q0FBMkM7QUFDM0MsNkJBQTJCO0FBSTNCLG1DQUFzRDtBQUN0RCwyQ0FBMEQ7QUFLMUQsU0FBc0IsZUFBZSxDQUFDLE9BQWlCOztRQUNuRCxNQUFNLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDOUQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUM5QixNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzlCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDNUIsT0FBTyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUN0QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDdEMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDM0M7WUFDRCxLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzVCLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDOUIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSztTQUMvQixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQUE7QUFkRCwwQ0FjQztBQUNELFNBQXNCLFdBQVcsQ0FBQyxHQUFXOztRQUN6QyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxF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