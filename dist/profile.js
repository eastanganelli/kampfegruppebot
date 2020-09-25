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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQyxNQUFNLFNBQVMsR0FBMkM7SUFDekQsRUFBRSxHQUFHLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMvQyxFQUFFLEdBQUcsRUFBRSx5REFBeUQsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ2hGLEVBQUUsR0FBRyxFQUFFLDBFQUEwRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Q0FDakcsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztBQUN6QixJQUFJLElBQUksR0FBUTtJQUNmLEdBQUcsRUFBRSxHQUFHO0lBQ1IsT0FBTyxFQUFFO1FBQ1IsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRTtZQUNSLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNEO0NBQ0QsQ0FBQztBQUVILFNBQWUsYUFBYSxDQUFDLFFBQWEsRUFBRSxJQUFTOztRQUNwRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUFFLE9BQU87UUFFdkMsSUFBSTtZQUNILElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztZQUU1QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsMERBQTBELENBQUMsQ0FB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