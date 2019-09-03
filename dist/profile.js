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
        if (noLoaded(user.id)) {
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
        }
        console.log(data_);
    });
}
exports.CargarPerfil = CargarPerfil;
function noLoaded(dID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firebase.database().ref('/Users/').child(dID).on('value', data => { if (data.val() == null) {
            return true;
        } return false; }, (Err) => { console.log(Err); });
    });
}
exports.noLoaded = noLoaded;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFFekMsNkJBQTJCO0FBRTNCLE1BQU0sU0FBUyxHQUEyQztJQUN0RCxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hDLEVBQUUsR0FBRyxFQUFFLG1FQUFtRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Q0FDN0YsQ0FBQztBQUNGLE1BQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztBQUN6QixJQUFJLEtBQUssR0FBYSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFFL0UsU0FBc0IsWUFBWSxDQUFDLElBQVMsRUFBRSxRQUFhOztRQUMxRCxJQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQUUsT0FBTztZQUN2QyxJQUFJO2dCQUNILElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUM7Z0JBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsMERBQTBELENBQUMsQ0FBQztnQkFDbkYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0QsTUFBTSxJQUFJ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