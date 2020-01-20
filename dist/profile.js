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
    { txt: "Nro Celular :iphone::iphone: **ES PARA WHATSAPP ie: _+54 011 31454151_**", react: false }
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
                    }
                    else {
                        saveData(collected.first().content, i, reaction, user);
                    }
                }).catch(() => {
                    user.sendMessage(":hourglass: **Se termino el tiempo.**");
                    applying.splice(applying.indexOf(user.id), 1);
                    cancel = true;
                });
            }
            if (!cancel) {
                uDat.userDat.loaded = true;
                uDat.uid = user.id;
                users_1.escribirUsuario(uDat);
            }
            yield user.sendMessage(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**");
            yield guildMember.addRole('521709396863090698');
        }
        catch (err) {
            console.error(err);
        }
        questionsFiltered = new Array(0);
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
                uDat.userDat.birth = fecha[2] + '/' + fecha[1] + '/2000';
                uDat.userDat.connect.joinAt = guildMember.joinedAt;
                break;
            }
            case 2: {
                uDat.userDat.phone = data;
                break;
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUczQixtQ0FBbUM7QUFDbkMsbUNBQTBDO0FBS3pDLE1BQU0sU0FBUyxHQUEyQztJQUN6RCxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQy9DLEVBQUUsR0FBRyxFQUFFLHlEQUF5RCxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDaEYsRUFBRSxHQUFHLEVBQUUsMEVBQTBFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtDQUNqRyxDQUFDO0FBQ0YsSUFBSSxpQkFBaUIsR0FBMkMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0UsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO0FBQ3pCLElBQUksSUFBSSxHQUFRO0lBQ2YsR0FBRyxFQUFFLEdBQUc7SUFDUixPQUFPLEVBQUU7UUFDUixNQUFNLEVBQUUsS0FBSztRQUNiLE1BQU0sRUFBRSxFQUFFO1FBQ1YsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxFQUFFO1FBQ1QsTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRTtZQUNSLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNEO0NBQ0QsQ0FBQztBQUdILFNBQXNCLFlBQVksQ0FBQyxJQUFTLEVBQUUsUUFBYTs7UUFDMUQsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxD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