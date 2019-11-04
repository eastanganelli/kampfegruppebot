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
                client.users.get(String(snap.key)).send(msg_).then(() => { usersfb.child(String(snap.key)).child('connect').update({ lastadv: datentime_1.getWeekNumber() }); });
            }
            else if (daydif >= 21) {
                if (Number(auxuser.connect.lastAdv) < datentime_1.getWeekNumber()) {
                    const msg_ = '<@' + snap.key + '>\nSu rango fue __DESCENDIDO__!\nSeguira descendiendo, hasta que presente actividad.\n:warning::warning:Recuerde: **Si llega a rango __CANDIDATO__, y no presento actividad, sera expulsado.**:warning::warning:\nKMPF';
                    client.users.get(String(snap.key)).send(msg_).then(() => { usersfb.child(String(snap.key)).child('connect').update({ lastadv: datentime_1.getWeekNumber() }); });
                }
            }
        });
    });
}
exports.checkIfAFK = checkIfAFK;
function checkIfCumple(client) {
    const userfb = firebase.database().ref('/users');
    userfb.once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
        snapshot.forEach(snap => {
            const disU = snap.val(), uBirth = new Date(disU.birth), todday = new Date();
            if (uBirth.getDate() == todday.getDate() && uBirth.getMonth() == todday.getMonth()) {
                console.log('CUMPLEAÑOS ' + disU.nombre);
                let embedMSG = new Discord.RichEmbed().setTitle(const_1.kmpfMSG.kmpfNews.Arr[0].titulo).setDescription('Que tengas un **Feliz Cumpleaños** <@' + snap.key + '>\nCLAN <@594571311171371008>');
                client.channels.get(const_1.kmpfMSG.kmpfNews.MC).send(embedMSG);
            }
        });
    }));
}
exports.checkIfCumple = checkIfCumple;
function checkIfleft() {
}
exports.checkIfleft = checkIfleft;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBeUM7QUFDekMseUNBQTJDO0FBQzNDLDZCQUEyQjtBQUkzQixtQ0FBK0Q7QUFDL0QsMkNBQTBEO0FBSzFELFNBQXNCLGVBQWUsQ0FBQyxPQUFpQjs7UUFDbkQsTUFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzlELE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDOUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUM5QixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRTtnQkFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDdEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQ3RDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQzNDO1lBQ0QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSztZQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzlCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBZEQsMENBY0M7QUFDRCxTQUFzQixXQUFXLENBQUMsR0FBVzs7UUFDekMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRTtZQUNoRSxJQUFJLE1BQU0sR0FBYSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQUxELGtDQUtDO0FBQ0QsU0FBc0IsWUFBWSxDQUFDLEdBQVc7O1FBQzFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDaEUsSUFBSSxNQUFNLEdBQWEsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RDLElBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFBQyxPQUFPLEtBQUssQ0FBQztJQUNyQixDQUFDO0NBQUE7QUFMRCxvQ0FLQztBQUNELFNBQXNCLHFCQUFxQixDQUFDLEdBQVc7MERBQUksTUFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQztDQUFBO0FBQWhLLHNEQUFnSztBQU9oSyxTQUFzQixlQUFlLENBQUMsR0FBVyxFQUFFLE1BQVc7O1FBQzFELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLGdCQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDOUUsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUYsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzFCO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQVhELDBDQVdDO0FBR0QsU0FBc0IsV0FBVyxDQUFDLEdBQVcsRUFBRSxNQUFXLEVBQUUsSUFBUzs7UUFDakUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksZ0JBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUM5RSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUUsa0JBQWtCLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUN4RixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQUpELGtDQUlDO0FBQ0QsU0FBc0IsZ0JBQWdCLENBQUMsR0FBVyxFQUFFLE1BQVcsRUFBRSxJQUFTOztRQUN0RSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxrQkFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxrQkFBa0IsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBSkQsNENBSUM7QUFLRCxTQUFnQixVQUFVLENBQUMsTUFBVztJQUNsQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxPQUFPLEdBQWEsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25DLElBQUksTUFBTSxHQUFHLHdCQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxJQUFHLE1BQU0sSUFBSSxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRTtnQkFDNUIsTUFBTSxJQUFJLEdBQVcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxHQUFHLE1BQU0sR0FBRyxpV0FBaVcsQ0FBQztnQkFDaGEsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSx5QkFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEo7aUJBQU0sSUFBSSxNQUFNLElBQUksRUFBRSxFQUFFO2dCQUNyQixJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLHlCQUFhLEVBQUUsRUFBRTtvQkFDbEQsTUFBTSxJQUFJLEdBQVcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsd05BQXdOLENBQUM7b0JBQ2hRLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUseUJBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4SjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFqQkQsZ0NBaUJDO0FBQ0QsU0FBZ0IsYUFBYSxDQUFDLE1BQVc7SUFDckMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFNLFFBQVEsRUFBQyxFQUFFO1FBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEdBQWEsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdEYsSUFBRyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsSUFBSSxRQUFRLEdBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLCtCQUErQixDQUFDLENBQUM7Z0JBQzFMLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNEO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQVpELHNDQVlDO0FBQ0QsU0FBZ0IsV0FBVztBQUUzQixDQUFDO0FBRkQsa0NBRUMifQ==