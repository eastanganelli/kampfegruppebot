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
const questions = [
    { txt: "Como te llamas?", react: false },
    { txt: "Cuando es tu Cumple:cake::cake:? **AÑO MES DIA ie: _31/05/2018_**", react: false },
];
const applying = [];
let uDat = {
    uid: '-',
    userDat: {
        nombre: '-',
        birth: 0,
        steam: '-',
        origin: '-',
        uplay: '-',
        connect: {
            joinAt: 0,
            lastAdv: -1,
            laston: -1
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
function saveData(data, idQ, raction_, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const guildMember = raction_.message.guild.members.get(user.id);
        switch (idQ) {
            case 0: {
                uDat.userDat.nombre = data;
                break;
            }
            case 1: {
                uDat.userDat.birth = data;
                break;
            }
            case 2: {
                if (isNewMem(guildMember, raction_.message.guild)) {
                    if (!isoldMem(guildMember, raction_.guild)) {
                        guildMember.addRole(raction_.message.guild.roles.get('521709396863090698'));
                    }
                }
                else if (!isNewMem(guildMember, raction_.message.guild)) {
                    if (!isoldMem(guildMember, raction_.guild)) {
                        guildMember.addRole(raction_.message.guild.roles.get('533069497561513994'));
                    }
                }
                break;
            }
        }
    });
}
function cargarProfile(reaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (applying.includes(user.id))
            return;
        try {
            let cancel = false;
            console.log(`${user.tag} began applying.`);
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
                        console.log(`${user.tag} cancelled their application.`);
                    }
                    else {
                        console.log(collected.first().content);
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
                firebase.database().ref('/users/').child(user.id).set(uDat.userDat);
            }
            yield user.sendMessage(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**");
            console.log(`${user.tag} finished applying.`);
        }
        catch (err) {
            console.error(err);
        }
        console.log(uDat);
    });
}
function isNewMem(guildMember, guild) {
    const game_ = ['BF4', 'BF1', 'BFV'];
    for (let i = 0; i < game_.length; i++) {
        if (guildMember.roles.has(guild.roles.find('name', game_[i])).id) {
            return true;
        }
    }
    return false;
}
function isoldMem(guildMember, guild) {
    const roles = ['Coronel', 'Teniente', 'Subteniente', 'Cabo primero', 'Soldado raso', 'candidato', 'Invitados (sin representar)'];
    for (let i = 0; i < roles.length; i++) {
        if (guildMember.roles.has(guild.roles.find((r) => r.name === roles[i]).id))
            return true;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBRXpDLDZCQUEyQjtBQUUzQixNQUFNLFNBQVMsR0FBMkM7SUFDdEQsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN4QyxFQUFFLEdBQUcsRUFBRSxtRUFBbUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQzdGLENBQUM7QUFDRixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7QUFDekIsSUFBSSxJQUFJLEdBQWE7SUFDcEIsR0FBRyxFQUFFLEdBQUc7SUFDUixPQUFPLEVBQUU7UUFDUixNQUFNLEVBQUUsR0FBRztRQUNYLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztRQUNYLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFO1lBQ1IsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNWO0tBQ0Q7Q0FDRCxDQUFDO0FBRUYsU0FBc0IsWUFBWSxDQUFDLElBQVMsRUFBRSxRQUFhOztRQUMxRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRTtZQUN4RSxJQUFJLElBQUksR0FBUSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDL0IsSUFBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7Z0JBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUFFO2lCQUN0RCxJQUFHLFFBQVEsQ0FBQyxN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