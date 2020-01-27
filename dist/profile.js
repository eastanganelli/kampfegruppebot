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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUkzQixtQ0FBMEM7QUFLekMsTUFBTSxTQUFTLEdBQTJDO0lBQ3pELEVBQUUsR0FBRyxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDL0MsRUFBRSxHQUFHLEVBQUUseURBQXlELEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNoRixFQUFFLEdBQUcsRUFBRSwwRUFBMEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQ2pHLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7QUFDekIsSUFBSSxJQUFJLEdBQVE7SUFDZixHQUFHLEVBQUUsR0FBRztJQUNSLE9BQU8sRUFBRTtRQUNSLE1BQU0sRUFBRSxLQUFLO1FBQ2IsTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssRUFBRSxFQUFFO1FBQ1QsS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRTtRQUNWLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFO1lBQ1IsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25CO0tBQ0Q7Q0FDRCxDQUFDO0FBR0gsU0FBc0IsWUFBWSxDQUFDLElBQVMsRUFBRSxRQUFhOztRQUMxRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRTtZQUN4RSxJQUFJLElBQUksR0FBUSxRQUFRLENB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