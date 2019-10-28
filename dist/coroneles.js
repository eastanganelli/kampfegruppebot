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
const datentime_1 = require("./datentime");
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
            yield m.delete(100);
            m.awaitReactions(filter, { max: 1, time: min, errors: ['time'] }).then((collected) => {
                const reaction = collected.first();
                if (reaction.emoji.name == '📨') {
                    for (let id_ of arrUID) {
                        dsClient.guilds.first().members.get(id_).send('<@' + id_ + '>\nTiene que registrarse\nIr a _BOTS_ -> _#kmpf_ -> Hacer click en :pencil2:\n**KMPF**');
                    }
                    m.delete();
                }
            });
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
    const fuhrerDB = firebase.database().ref('/fuhrer');
    fuhrerDB.on("value", snapshot => {
        const fPos = snapshot.val().leader, ldWeek = snapshot.val().nmbWeek;
        if (ldWeek < datentime_1.getWeekNumber()) {
            console.log('Cambio de Reich');
            let bandera = true, i = fPos + 1;
            fuhrerDB.child(fPos).once("value", oldF => {
                do {
                    if (i >= snapshot.val().cnt) {
                        i = 0;
                        console.log('reiniciar');
                    }
                    fuhrerDB.child(String(i)).once('value', nextF => {
                        if (nextF.val().vac == false) {
                            changeFuhrer(client, oldF.val().uid, nextF.val().uid, i);
                            bandera = false;
                        }
                        else {
                            i++;
                        }
                    });
                } while (bandera);
                console.log('mori');
            });
        }
        else {
            console.log('Sigue Reich');
        }
    });
}
exports.nextFuhrer = nextFuhrer;
function changeFuhrer(client, outID, inID, pos) {
    const fuhrer = client.guilds.get(const_1.kmpfID);
    fuhrer.members.forEach((u) => __awaiter(this, void 0, void 0, function* () {
        fuhrer.members.forEach((o) => { if (o.id == outID) {
            o.removeRole(const_1.roleF);
        } });
        fuhrer.members.forEach((n) => { if (n.id == inID) {
            n.addRole(const_1.roleF);
        } });
        console.log('Viejo fuhrer: ' + outID + ' - Nuevo fuhrer: ' + inID);
        firebase.database().ref('/fuhrer').update({ leader: pos, nmbWeek: datentime_1.getWeekNumber() });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFDM0MsNkJBQTJCO0FBSTNCLG1DQUF3QztBQUN4QywyQ0FBNEM7QUFHNUMsTUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDO0FBRzFCLFNBQXNCLE1BQU0sQ0FBQyxNQUFjLEVBQUUsS0FBYzs7UUFDdkQsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFFBQU8sTUFBTSxFQUFFO1lBQ1gsS0FBSyxvQkFBb0IsQ0FBQyxDQUFHO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ2xELEtBQUssb0JBQW9CLENBQUMsQ0FBRztnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUNsRCxLQUFLLG9CQUFvQixDQUFDLENBQUc7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDbEQsS0FBSyxxQkFBcUIsQ0FBQyxDQUFFO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQ2xELEtBQUssb0JBQW9CLENBQUMsQ0FBRztnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUFDLE1BQU07YUFBRTtTQUNyRDtRQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7Q0FBQTtBQVRELHdCQVNDO0FBQ0QsU0FBZ0IsWUFBWSxDQUFDLElBQXFCO0lBQzlDLE1BQU0sUUFBUSxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbEMsTUFBTSxPQUFPLEdBQVEs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