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
        let pos = '';
        switch (fuhrer) {
            case '406645486221524992': {
                pos = '0';
                break;
            }
            case '251482884987289600': {
                pos = '1';
                break;
            }
            case '327966508242305024': {
                pos = '2';
                break;
            }
            case '311264984627675137:': {
                pos = '3';
                break;
            }
            case '139591319877189643': {
                pos = '4';
                break;
            }
        }
        firebase.database().ref('/fuhrer').child(pos).child(fuhrer).update(inVac);
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
            msgEmb.setTitle('**USUARIOS NO REGISTRADOS**').setDescription("✅ -> Enviar Notificacion\n_______________").setFooter('El mensaje se eliminara en 2 MIN o al enviar la/s NOTIFICACION/ES');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFHM0MsTUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDO0FBRTFCLFNBQXNCLFVBQVUsQ0FBQyxHQUFvQjs7SUFFckQsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFDRCxTQUFzQixNQUFNLENBQUMsTUFBYyxFQUFFLEtBQWM7O1FBQ3ZELElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQztRQUNyQixRQUFPLE1BQU0sRUFBRTtZQUNYLEtBQUssb0JBQW9CLENBQUMsQ0FBRTtnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNqRCxLQUFLLG9CQUFvQixDQUFDLENBQUU7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDakQsS0FBSyxvQkFBb0IsQ0FBQyxDQUFHO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ2xELEtBQUsscUJBQXFCLENBQUMsQ0FBQztnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNqRCxLQUFLLG9CQUFvQixDQUFDLENBQUc7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFBQyxNQUFNO2FBQUU7U0FDckQ7UUFBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQy9FLENBQUM7Q0FBQTtBQVRELHdCQVNDO0FBQ0QsU0FBc0IsWUFBWSxDQUFDLElBQXFCOztRQUNwRCxNQUFNLFFBQVEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFD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