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
const users_1 = require("./users");
const questions = [
    { txt: "Nombre **ie: _Pedro_**", react: false },
    { txt: "Cumpleños :cake::cake:? **AÑO MES DIA ie: _31/5/2018_**", react: false },
    { txt: "Nro Celular :iphone::iphone: **ES PARA WHATSAPP ie: _+54 011 31454151_**", react: false }
];
const applying = [];
let uDat = {
    uid: '-',
    userDat: {
        birth: new Date(0),
        points: 0,
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
        try {
            let cancel = false;
            applying.push(user.id);
            yield user.sendMessage(":pencil: **Comencemos!** Escribe `#cancelar` para salir.");
            for (let i = 0; i < questions.length && cancel === false; i++) {
                yield user.sendMessage(questions[i].txt);
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
            yield user.sendMessage(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**").then(() => { guildMember.addRole('521709396863090698'); });
        }
        catch (err) {
            console.error(err);
        }
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
                uDat.userDat.phone = String(data);
                break;
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUczQixtQ0FBMEM7QUFLekMsTUFBTSxTQUFTLEdBQTJDO0lBQ3pELEVBQUUsR0FBRyxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDL0MsRUFBRSxHQUFHLEVBQUUseURBQXlELEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNoRixFQUFFLEdBQUcsRUFBRSwwRUFBMEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQ2pHLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7QUFDekIsSUFBSSxJQUFJLEdBQVE7SUFDZixHQUFHLEVBQUUsR0FBRztJQUNSLE9BQU8sRUFBRTtRQUNSLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUU7WUFDUixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkI7S0FDRDtDQUNELENBQUM7QUFHSCxTQUFzQixZQUFZLENBQUMsSUFBUyxFQUFFLFFBQWE7O1FBQzFELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ3hFLElBQUksSUFBSSxHQUFRLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMvQixJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUks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