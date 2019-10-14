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
        firebase.database().ref('/fuhrer').child(pos).update({ 'vac': inVac });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFHM0MsTUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDO0FBRTFCLFNBQXNCLFVBQVUsQ0FBQyxHQUFvQjs7SUFFckQsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFDRCxTQUFzQixNQUFNLENBQUMsTUFBYyxFQUFFLEtBQWM7O1FBQ3ZELElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQztRQUNyQixRQUFPLE1BQU0sRUFBRTtZQUNYLEtBQUssb0JBQW9CLENBQUMsQ0FBRztnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNsRCxLQUFLLG9CQUFvQixDQUFDLENBQUc7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDbEQsS0FBSyxvQkFBb0IsQ0FBQyxDQUFHO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ2xELEtBQUsscUJBQXFCLENBQUMsQ0FBRTtnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNsRCxLQUFLLG9CQUFvQixDQUFDLENBQUc7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFBQyxNQUFNO2FBQUU7U0FDckQ7UUFBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQUE7QUFURCx3QkFTQztBQUNELFNBQXNCLFlBQVksQ0FBQyxJQUFxQjs7UUFDcEQsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNs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