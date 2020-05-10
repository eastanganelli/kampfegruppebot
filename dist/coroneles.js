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
require("firebase/database");
const const_1 = require("./const");
const min = 60000;
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
    const dsClient = dsCh.client;
    const dsChnnl = dsClient.channels.get(dsCh.id);
    let fUsers = firebase.database().ref('/users'), arrUID = new Array(0);
    fUsers.on('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
        let msgEmb = new Discord.RichEmbed;
        msgEmb.setTitle('**USUARIOS NO REGISTRADOS**').setDescription("📨 -> Enviar Notificacion\n_______________").setFooter('El mensaje se eliminara en 1 MIN o al enviar las NOTIFICACIONES');
        snapshot.forEach(snap => {
            let auxU = snap.val();
            if (auxU.loaded = false || auxU.loaded == undefined) {
                const dsuid = String(snap.key);
                arrUID.push(dsuid);
                msgEmb.addField('ID: ' + dsuid, '<@' + dsuid + '>');
            }
        });
        dsChnnl.send(msgEmb).then((m) => __awaiter(this, void 0, void 0, function* () {
            m.react('📨');
            const filter = (reaction, user) => { return ['📨'].includes(reaction.emoji.name) && !(user.bot); };
            yield m.awaitReactions(filter, { max: 1, time: min, errors: ['time'] }).then((collected) => {
                const reaction = collected.first();
                if (reaction.emoji.name == '📨') {
                    for (let id_ of arrUID) {
                        dsClient.guilds.first().members.get(id_).send('<@' + id_ + '>\nTiene que registrarse\nIr a _BOTS_ -> _#kmpf_ -> Hacer click en :pencil2:\n**KMPF**');
                    }
                    m.delete();
                }
            });
            m.delete(100);
        }));
    }));
}
exports.usersNoRegis = usersNoRegis;
function perfiluser(msg, author_) {
    return __awaiter(this, void 0, void 0, function* () {
        if (author_.roles.has('517168972483919929')) {
            let MSG_ = msg.content.split('kmpf perfil ').slice(0);
            let profileUser = null;
        }
        else {
            msg.author.send("no tienes el permiso para usar el comando.");
        }
    });
}
exports.perfiluser = perfiluser;
function banUsuario() {
}
exports.banUsuario = banUsuario;
function dmALL(msg, author_) {
    if (author_.roles.has('517169596059615252')) {
        let MSG_ = msg.content.split('kmpf dmall ').slice(1);
        msg.guild.members.forEach((user) => { console.log(MSG_); user.send(MSG_); });
    }
    else {
        msg.author.send("No tienes el permiso para usar el comando.");
    }
}
exports.dmALL = dmALL;
function nextFuhrer(client) {
    var _a, _b;
    const CORONELES = ['251482884987289600', '406645486221524992', '327966508242305024', '311264984627675137', '139591319877189643'];
    const ActualFuhrer = (_b = (_a = client.guilds.get(const_1.serverID)) === null || _a === void 0 ? void 0 : _a.roles.get(const_1.roleF)) === null || _b === void 0 ? void 0 : _b.members.firstKey();
    let i = 0;
    for (i = 0; i < CORONELES.length; i++) {
        if (CORONELES[i] == ActualFuhrer) {
            if (i >= (CORONELES.length - 1)) {
                changeFuhrer(client, CORONELES[i], CORONELES[0]);
            }
            changeFuhrer(client, CORONELES[i], CORONELES[i + 1]);
        }
    }
}
exports.nextFuhrer = nextFuhrer;
function changeFuhrer(client, outID, inID) {
    const fuhrer = client.guilds.get(const_1.kmpfID);
    fuhrer.members.forEach((u) => {
        fuhrer.members.forEach((o) => { if (o.id == outID) {
            o.removeRole(const_1.roleF);
        } });
        fuhrer.members.forEach((n) => { if (n.id == inID) {
            n.addRole(const_1.roleF);
        } });
        console.log('Viejo fuhrer: ' + outID + ' - Nuevo fuhrer: ' + inID);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFDM0MsNkJBQTJCO0FBSTNCLG1DQUFrRDtBQUdsRCxNQUFNLEdBQUcsR0FBVyxLQUFLLENBQUM7QUFHMUIsU0FBc0IsTUFBTSxDQUFDLE1BQWMsRUFBRSxLQUFjOztRQUN2RCxJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUM7UUFDckIsUUFBTyxNQUFNLEVBQUU7WUFDWCxLQUFLLG9CQUFvQixDQUFDLENBQUc7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDbEQsS0FBSyxvQkFBb0IsQ0FBQyxDQUFHO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ2xELEtBQUssb0JBQW9CLENBQUMsQ0FBRztnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNsRCxLQUFLLHFCQUFxQixDQUFDLENBQUU7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDbEQsS0FBSyxvQkFBb0IsQ0FBQyxDQUFHO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQUMsTUFBTTthQUFFO1NBQ3JEO1FBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUFBO0FBVEQsd0JBU0M7QUFDRCxTQUFnQixZQUFZLENBQUMsSUFBcUI7SUFDOUMsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxNQUFNLE9BQU8sR0FBUSxRQUFRLENBQUMsUUFB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