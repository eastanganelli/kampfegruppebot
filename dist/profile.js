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
function cargarProfile(reaction, user) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const guildMember = (_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.member(user.id);
        if (applying.includes(user.id))
            return;
        try {
            let cancel = false;
            applying.push(user.id);
            yield user.send(":pencil: **Comencemos!** Escribe `#cancelar` para salir.");
            for (let i = 0; i < questions.length && cancel === false; i++) {
                yield user.send(questions[i].txt);
                yield ((_b = user.dmChannel) === null || _b === void 0 ? void 0 : _b.awaitMessages((m) => m.author.id === user.id, { max: 1, time: 300000, errors: ["time"] }).then((collected) => {
                    if (collected.first().content.toLowerCase() === "#cancelar") {
                        user.send(":x: **Carga cancelada!**");
                        applying.splice(applying.indexOf(user.id), 1);
                        cancel = true;
                    }
                    else {
                        saveData(collected.first().content, i, reaction, user);
                    }
                }).catch(() => {
                    user.send(":hourglass: **Se termino el tiempo.**");
                    applying.splice(applying.indexOf(user.id), 1);
                    cancel = true;
                }));
            }
            if (!cancel) {
                uDat.userDat.loaded = true;
                uDat.uid = user.id;
            }
            yield user.send(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**").then(() => { guildMember.roles.add('521709396863090698'); });
        }
        catch (err) {
            console.error(err);
        }
    });
}
function saveData(data, idQ, reaction, user) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const guildMember = (_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0MsTUFBTSxTQUFTLEdBQTJDO0lBQ3pELEVBQUUsR0FBRyxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDL0MsRUFBRSxHQUFHLEVBQUUseURBQXlELEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNoRixFQUFFLEdBQUcsRUFBRSwwRUFBMEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQ2pHLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7QUFDekIsSUFBSSxJQUFJLEdBQVE7SUFDZixHQUFHLEVBQUUsR0FBRztJQUNSLE9BQU8sRUFBRTtRQUNSLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUU7WUFDUixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkI7S0FDRDtDQUNELENBQUM7QUFFSCxTQUFlLGFBQWEsQ0FBQyxRQUFhLEVBQUUsSUFBUzs7O1FBQ3BELE1BQU0sV0FBVyxTQUF3QixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssMENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUFFLE9BQU87UUFFdkMsSUFBSTtZQUNILElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztZQUU1QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsMERBQTBELENBQUMsQ0FBQztZQUM1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