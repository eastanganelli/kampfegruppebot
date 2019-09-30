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
require("firebase/auth");
const textos_1 = require("./textos");
let roles_ = [
    '517169596059615252',
    '517171083384979456',
    '521709081757745172',
    '521709251941629975',
    '517171515071135764',
    '521709396863090698',
    '533069497561513994'
];
function tieneRegusuario(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        firebase.database().ref('/users').equalTo(uid).once('value', snapshot => {
            if (!(snapshot.exists())) {
                newUsuario(uid);
            }
        });
    });
}
exports.tieneRegusuario = tieneRegusuario;
function newUsuario(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        let uDat = {
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
        };
        escribirUsuario(uDat);
    });
}
exports.newUsuario = newUsuario;
function escribirUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firebase.database().ref('/users').child(usuario.uid).set({
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
            if (auxDat.nombre != '-' && auxDat.birth != '-')
                return true;
        });
        return false;
    });
}
exports.emptyUsuario = emptyUsuario;
function lastConnectionusuario(uid) {
    return __awaiter(this, void 0, void 0, function* () { firebase.database().ref('/users/').child(uid).child('connect').update({ laston: new Date() }); });
}
exports.lastConnectionusuario = lastConnectionusuario;
function loweringRole(uid, client) {
    return __awaiter(this, void 0, void 0, function* () {
        client.guilds.find((g) => g.id == textos_1.serverID).fetchMember(uid).then((u) => {
            for (let i = 0; i < roles_.length; i++) {
                if (u.roles.has(roles_[i])) {
                    console.log('Tiene pos: ' + i);
                    firebase.database().ref('/users').child(uid).child('connect').update({ lastadv: new Date() });
                    u.addRole(roles_[i + 1]);
                    u.removeRole(roles_[i]);
                }
            }
        });
    });
}
exports.loweringRole = loweringRole;
function kickUsuario(uid, client) {
    return __awaiter(this, void 0, void 0, function* () {
        client.guilds.find((g) => g.id == textos_1.serverID).fetchMember(uid).then((u) => {
            u.send('**FUE EXPULSADO POR INACTIVIDAD**\nPara reingresar al clan, acepte la invitación ' + textos_1.serverLink).then(() => { u.kick('INACTIVIDAD'); +'\n Saludos, KMPF'; });
        });
    });
}
exports.kickUsuario = kickUsuario;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMseUJBQXVCO0FBRXZCLHFDQUFnRDtBQUVoRCxJQUFJLE1BQU0sR0FBa0I7SUFDeEIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsb0JBQW9CO0NBQ3ZCLENBQUM7QUFFRixTQUFzQixlQUFlLENBQUMsR0FBVzs7UUFDN0MsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRTtZQUNwRSxJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQUpELDBDQUlDO0FBQ0QsU0FBc0IsVUFBVSxDQUFDLEdBQVc7O1FBQ3hDLElBQUksSUFBSSxHQUFhO1lBQ2pCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsT0FBTyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ1gsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDZDthQUNKO1NBQ0osQ0FBQztRQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFD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