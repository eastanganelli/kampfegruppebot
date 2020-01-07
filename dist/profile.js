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
const roles_1 = require("./roles");
const users_1 = require("./users");
const questions = [
    { txt: "Nombre **ie: _Pedro_**", react: false },
    { txt: "Cumpleños :cake::cake:? **AÑO MES DIA ie: _31/5/2018_**", react: false },
    { txt: "Nro Celular :iphone::iphone: **ES PARA WHATSAPP ie: _+54 011 31454151_**", react: false },
    { txt: "Ingresar _#war_ si tiene **Battlefield, Warthunder, GTAV** o _#otros_ si no tiene alguno de los anteriormente mencionados", react: true }
];
let questionsFiltered = new Array(0);
const applying = [];
let uDat = {
    uid: '-',
    userDat: {
        loaded: false,
        nombre: '',
        birth: new Date(0),
        phone: '',
        steam: '',
        origin: '',
        uplay: '',
        connect: {
            joinAt: new Date(0),
            laston: new Date(0)
        }
    }
};
function CargarPerfil(user, reaction) {
    return __awaiter(this, void 0, void 0, function* () {
        firebase.database().ref('/Users/').child(user.id).on('value', snapshot => {
            let uDat = snapshot.val();
            if (!(snapshot.exists())) {
                cargarProfile(reaction, user);
            }
            else if (snapshot.exists() && uDat.nombre == '-' || uDat.birth == 0) {
                cargarProfile(reaction, user);
            }
        }, (Err) => { console.log(Err); });
    });
}
exports.CargarPerfil = CargarPerfil;
function cargarProfile(reaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const guildMember = reaction.message.guild.members.get(user.id);
        if (applying.includes(user.id))
            return;
        for (let i = 0; i < 3; i++) {
            questionsFiltered.push(questions[i]);
        }
        if (!roles_1.sinRango(guildMember)) {
            questionsFiltered.push(questions[3]);
        }
        try {
            let cancel = false, isMeming = false;
            console.log(`${user.tag} began applying.`);
            applying.push(user.id);
            yield user.sendMessage(":pencil: **Comencemos!** Escribe `#cancelar` para salir.");
            for (let i = 0; i < questionsFiltered.length && cancel === false && !isMeming; i++) {
                yield user.sendMessage(questionsFiltered[i].txt);
                yield user.dmChannel.awaitMessages((m) => m.author.id === user.id, { max: 1, time: 300000, errors: ["time"] })
                    .then((collected) => {
                    if (collected.first().content.toLowerCase() === "#cancelar") {
                        user.sendMessage(":x: **Carga cancelada!**");
                        applying.splice(applying.indexOf(user.id), 1);
                        cancel = true;
                        users_1.escribirUsuario(uDat);
                        console.log(`${user.tag} cancelled their application.`);
                    }
                    else {
                        saveData(collected.first().content, i, reaction, user);
                    }
                }).catch(() => {
                    user.sendMessage(":hourglass: **Se termino el tiempo.**");
                    applying.splice(applying.indexOf(user.id), 1);
                    cancel = true;
                    console.log(`${user.tag} let their application time out.`);
                });
            }
            if (!cancel) {
                uDat.userDat.loaded = true;
                uDat.uid = user.id;
                users_1.escribirUsuario(uDat);
            }
            yield user.sendMessage(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**");
            console.log(`${user.tag} finished applying.`);
        }
        catch (err) {
            console.error(err);
        }
        questionsFiltered = new Array(0);
        console.log(uDat);
    });
}
function saveData(data, idQ, reaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const guildMember = reaction.message.guild.members.get(user.id);
        switch (idQ) {
            case 0: {
                uDat.userDat.nombre = data;
                break;
            }
            case 1: {
                const fecha = data.split('/');
                uDat.userDat.birth = new Date(fecha[2] + '/' + fecha[1] + '/' + fecha[0]);
                uDat.userDat.connect.joinAt = guildMember.joinedAt;
                break;
            }
            case 2: {
                uDat.userDat.phone = data;
                break;
            }
            case 3: {
                if (data.toLowerCase() === "#war") {
                    guildMember.addRole('521709396863090698');
                }
                else if (data.toLowerCase() === "#otros") {
                    guildMember.addRole('533069497561513994');
                }
                break;
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUczQixtQ0FBbUM7QUFDbkMsbUNBQTBDO0FBSTFDLE1BQU0sU0FBUyxHQUEyQztJQUN0RCxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQy9DLEVBQUUsR0FBRyxFQUFFLHlEQUF5RCxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDbkYsRUFBRSxHQUFHLEVBQUUsMEVBQTBFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNqRyxFQUFFLEdBQUcsRUFBRSwySEFBMkgsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0NBQ2pKLENBQUM7QUFDRixJQUFJLGlCQUFpQixHQUEyQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RSxNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7QUFDekIsSUFBSSxJQUFJLEdBQVE7SUFDZixHQUFHLEVBQUUsR0FBRztJQUNSLE9BQU8sRUFBRTtRQUNSLE1BQU0sRUFBRSxLQUFLO1FBQ2IsTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssRUFBRSxFQUFFO1FBQ1QsS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRTtRQUNWLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFO1lBQ1IsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25CO0tBQ0Q7Q0FDRCxDQUFDO0FBQ0YsU0FBc0IsWUFBWSxDQUFDLElBQVMsRUFBRSxRQUFhOztRQUMxRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FB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