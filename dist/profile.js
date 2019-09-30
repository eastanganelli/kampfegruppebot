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
            joinAt: new Date(),
            lastAdv: -1,
            lastCon: -1
        }
    }
};
function CargarPerfil(user, reaction) {
    return __awaiter(this, void 0, void 0, function* () {
        firebase.database().ref('/Users/').child(user.id).on('value', snapshot => {
            let uDat = snapshot.val();
            if (uDat.nombre == '-' || uDat.birth == 0) {
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
                firebase.database().ref('/Users/').child(user.id).set(uDat);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBRXpDLDZCQUEyQjtBQUUzQixNQUFNLFNBQVMsR0FBMkM7SUFDdEQsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN4QyxFQUFFLEdBQUcsRUFBRSxtRUFBbUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQzdGLENBQUM7QUFDRixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7QUFDekIsSUFBSSxJQUFJLEdBQWE7SUFDcEIsR0FBRyxFQUFFLEdBQUc7SUFDUixPQUFPLEVBQUU7UUFDUixNQUFNLEVBQUUsR0FBRztRQUNYLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztRQUNYLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFO1lBQ1IsTUFBTSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ1g7S0FDRDtDQUNELENBQUM7QUFFRixTQUFzQixZQUFZLENBQUMsSUFBUyxFQUFFLFFBQWE7O1FBQzFELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ3hFLElBQUksSUFBSSxHQUFRLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMvQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENB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