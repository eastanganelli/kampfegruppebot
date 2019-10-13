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
const Discord = require("discord.js");
const firebase = require("firebase/app");
const min = 60000;
function perfiluser(msg) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.perfiluser = perfiluser;
function fOnVac(fuhrer, inVac) {
    return __awaiter(this, void 0, void 0, function* () {
        let pos = -1;
        switch (fuhrer) {
            case '406645486221525000': {
                pos = 0;
                break;
            }
            case '251482884987289600': {
                pos = 1;
                break;
            }
            case '32796650824230500': {
                pos = 2;
                break;
            }
            case '311264984627675140:': {
                pos = 3;
                break;
            }
            case '13959131987718965': {
                pos = 4;
                break;
            }
        }
        if (pos > -1 && pos < 5) {
            firebase.database().ref('/fuhrer').child(String(pos)).child(fuhrer).update(inVac);
        }
    });
}
exports.fOnVac = fOnVac;
function usersNoRegis(dsCh) {
    return __awaiter(this, void 0, void 0, function* () {
        const dsClient = dsCh.client;
        const dsChnnl = dsClient.channels.get(dsCh.id);
        let fUsers = firebase.database().ref('/users'), arrUID = new Array(0);
        fUsers.on('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
            let msgEmb = new Discord.RichEmbed;
            msgEmb.setTitle('**USUARIOS NO REGISTRADOS**').setDescription("_______________\n✅ -> Enviar Notificacion\n_______________").setFooter('El mensaje se eliminara en 2 MIN o al enviar la/s NOTIFICACION/ES');
            snapshot.forEach(snap => {
                let auxU = snap.val();
                if (auxU.loaded = false || auxU.loaded == undefined) {
                    const dsuid = String(snap.key);
                    arrUID.push(dsuid);
                    msgEmb.addField('ID: ' + dsuid, '<@' + dsuid + '>');
                }
            });
            dsChnnl.send(msgEmb).then((m) => __awaiter(this, void 0, void 0, function* () {
                m.react('✅');
                const filter = (reaction, user) => { return ['✅'].includes(reaction.emoji.name) && !(user.bot); };
                m.awaitReactions(filter, { max: 1, time: min * 2, errors: ['time'] }).then((collected) => {
                    console.log(collected);
                    const reaction = collected.first();
                    if (reaction.emoji.name == '✅') {
                        for (let id_ of arrUID) {
                            dsClient.guilds.first().members.get(id_).send('<@' + id_ + '>\nTiene que registrarse\nIr a _BOTS_ -> _#kmpf_ -> Hacer click en :pencil2:\n**KMPF**');
                        }
                        m.delete();
                    }
                }).catch(() => { m.delete(); });
            }));
        }));
    });
}
exports.usersNoRegis = usersNoRegis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFHM0MsTUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDO0FBRTFCLFNBQXNCLFVBQVUsQ0FBQyxHQUFvQjs7SUFFckQsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFDRCxTQUFzQixNQUFNLENBQUMsTUFBYyxFQUFFLEtBQWM7O1FBQ3ZELElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFFBQU8sTUFBTSxFQUFFO1lBQ1gsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQzlDLEtBQUssb0JBQW9CLENBQUMsQ0FBQztnQkFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUM5QyxLQUFLLG1CQUFtQixDQUFDLENBQUM7Z0JBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDN0MsS0FBSyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQy9DLEtBQUssbUJBQW1CLENBQUMsQ0FBQztnQkFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtTQUNoRDtRQUFDLElBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQUU7SUFDbkgsQ0FBQztDQUFB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