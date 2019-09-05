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
            if (data.val().nombre == null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFFekMsNkJBQTJCO0FBRTNCLE1BQU0sU0FBUyxHQUEyQztJQUN0RCxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hDLEVBQUUsR0FBRyxFQUFFLG1FQUFtRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Q0FDN0YsQ0FBQztBQUNGLE1BQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztBQUN6QixJQUFJLEtBQUssR0FBYSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFFL0UsU0FBc0IsWUFBWSxDQUFDLElBQVMsRUFBRSxRQUFhOztRQUMxRCxNQUFNLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzFFLElBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUFFO1FBQ2pFLENBQUMsRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FBQTtBQUpELG9DQUlDO0FBQ0QsU0FBZSxRQUFRLENBQUMsSUFBWSxFQUFFLEdBQVcsRUFBRSxRQUFhLEVBQUUsSUFBUzs7UUFDMUUsTUFBTSxXQUFXLEdBQUcs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