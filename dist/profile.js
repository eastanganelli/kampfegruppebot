"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
let data_ = { nombre: '', birth: new Date(), joinAt: 0, lastCon: 0 };
function CargarPerfil(user, reaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firebase.database().ref('/Users/').child(user.id).on('value', data => {
            cargarProfile(reaction, user);
        }, (Err) => { console.log(Err); });
    });
}
exports.CargarPerfil = CargarPerfil;
function saveData(data, idQ, raction_, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const guildMember = raction_.message.guild.members.get(user.id);
        switch (idQ) {
            case 0: {
                data_.nombre = data;
                break;
            }
            case 1: {
                data_.birth = data;
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
                firebase.database().ref('/Users/').child(user.id).set(data_);
            }
            yield user.sendMessage(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**");
            console.log(`${user.tag} finished applying.`);
        }
        catch (err) {
            console.error(err);
        }
        console.log(data_);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFFekMsNkJBQTJCO0FBRTNCLE1BQU0sU0FBUyxHQUEyQztJQUN0RCxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hDLEVBQUUsR0FBRyxFQUFFLG1FQUFtRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Q0FDN0YsQ0FBQztBQUNGLE1BQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztBQUN6QixJQUFJLEtBQUssR0FBYSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFFL0UsU0FBc0IsWUFBWSxDQUFDLElBQVMsRUFBRSxRQUFhOztRQUFJLE1BQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDM0YsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RSxDQUFDLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQUE7QUFIRCxvQ0FHQztBQUNELFNBQWUsUUFBUSxDQUFDLElBQVksRUFBRSxHQUFXLEVBQUUsUUFBYSxFQUFFLElBQVM7O1FBQzFFLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVB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