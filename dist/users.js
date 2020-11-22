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
exports.checkIfCumple = exports.checkIfleft = exports.upgradingRank = exports.downgradingRank = exports.isAFK = exports.kickUsuarioByMsg = exports.addFCumple = exports.addToWpp = void 0;
const Discord = require("discord.js");
const const_1 = require("./const");
const api_1 = require("./api");
function addToWpp(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const_1.getUser(userID).then((myUser) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield myUser.send('Por favor, escribe tu numero de celular para ser añadido al grupo de WPP\n__(ie: +5491162908200)__');
            yield ((_a = myUser.dmChannel) === null || _a === void 0 ? void 0 : _a.awaitMessages((m) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] }).then((collected) => {
                const_1.getTChannel('667006073441484801').then((c) => {
                    const channel_ = c;
                    channel_.send('El usuario <@' + userID + '> desea ser añadido al grupo de Whatsapp\nNro: ' + collected.first().content);
                });
            }));
            yield myUser.send('Su numero fue enviado a los Coroneles\nEn breve sera agregado al grupo\n**Saludos, KMPF!**');
        })).catch(err => console.log(err));
    });
}
exports.addToWpp = addToWpp;
function addFCumple(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const_1.getUser(userID).then((myUser) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield myUser.send('Por favor, ingrese su fecha de cumpleaños\n:warning: El formato debe ser AÑO-MES-DIA\n__(ie: 2018-5-31)__');
            yield ((_a = myUser.dmChannel) === null || _a === void 0 ? void 0 : _a.awaitMessages((m) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] }).then((collected) => {
                api_1.birthPUT(myUser.id, { birth: collected.first().content });
            }));
            yield myUser.send('Su fecha ya fue guardada\n**Saludos, KMPF!**');
        })).catch(err => console.log(err));
    });
}
exports.addFCumple = addFCumple;
function kickUsuarioByMsg(uid, server, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const_1.getUser(uid).then((u) => { u.send(data.txt + const_1.serverLink + '\n Saludos, KMPF').then(() => { u.kick(data.rzn); }); });
        const_1.getTChannel(const_1.disTC[4]).then((guildCh) => {
            guildCh.send('**El USUARIO** <@' + uid + '> FUE EXPULSADO');
        });
    });
}
exports.kickUsuarioByMsg = kickUsuarioByMsg;
function isAFK(client) {
    let msgem = new Discord.MessageEmbed().setTitle('Usuarios AFK').setColor('#ff0000');
    let afklst = new Array(0);
    api_1.redlightsGET().then((AFKlist) => {
        let IDs = AFKlist;
        if (IDs.length > 0) {
            IDs.forEach(user => {
                const_1.getUserGuild(const_1.kmpfID, user.id).then((userGuikd) => {
                    let flag = false;
                    for (let i = 0; i < const_1.noboroles.length; i++)
                        if (userGuikd.roles.has(const_1.noboroles[i]))
                            flag = true;
                    if (!flag) {
                        afklst.push({ id_: user.id, msg: '<@' + user.id + '>\nSu rango fue __DESCENDIDO__ por INACTIVIDAD!\nKMPF' });
                        msgem.addField(user.id + ' | ' + user.daysinac + ' Dias Inactivo', false);
                    }
                });
            });
        }
        const_1.getTChannel(const_1.disTC[4]).then((C_) => {
            if (C_.isText()) {
                C_.send(msgem).then(() => {
                    afklst.forEach((user_) => __awaiter(this, void 0, void 0, function* () {
                        yield downgradingRank(user_.id_, client);
                        yield client.users.get(user_.id_).send(user_.msg);
                    }));
                });
            }
        });
    });
}
exports.isAFK = isAFK;
function downgradingRank(uid, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = client.guilds.find((g) => g.id == const_1.serverID);
        server.fetchMember(uid).then((u) => {
            for (let i = 0; i < const_1.rolespoints.length; i++) {
                if (u.roles.has(const_1.rolespoints[i]) && i < const_1.roles.length) {
                    u.addRole(const_1.rolespoints[i + 1]);
                    u.removeRole(const_1.rolespoints[i]);
                    api_1.decpointsPUT(uid, { points: 500 });
                }
            }
        });
    });
}
exports.downgradingRank = downgradingRank;
function upgradingRank(uid, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = client.guilds.find((g) => g.id == const_1.serverID);
        server.fetchMember(uid).then((u) => {
            for (let i = const_1.roles.length; 1 > i; i--) {
                if (u.roles.has(const_1.roles[i]) && (1 > i)) {
                    u.addRole(const_1.roles[i]);
                    u.removeRole(const_1.roles[i + 1]);
                }
            }
        });
    });
}
exports.upgradingRank = upgradingRank;
function checkIfleft(client) {
    api_1.usersGET().then((users) => {
        let usersIDs = users;
        usersIDs.forEach(user => {
            const_1.getUser(user.id).catch((err) => {
                console.log(err);
                api_1.userDELETE(user.id);
            });
        });
    });
}
exports.checkIfleft = checkIfleft;
function checkIfCumple(client) {
    api_1.birthsGET().then((cumples) => {
        let IDs = cumples;
        IDs.forEach(user => {
            let embedMSG = new Discord.MessageEmbed().setTitle(const_1.kmpfMSG.kmpfNews.Arr[0].titulo).setDescription('Que tengas un **Feliz Cumpleaños** <@' + (user.id).toString() + '>\nCLAN <@594571311171371008>\n\n@here');
            const_1.getTChannel(const_1.kmpfMSG.kmpfNews.MC).then((C_) => {
                if (C_.isText())
                    C_.send(embedMSG);
            });
        });
    });
}
exports.checkIfCumple = checkIfCumple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBQ3RDLG1DQUEwSTtBQUMxSSwrQkFBZ0c7QUFLNUYsU0FBc0IsUUFBUSxDQUFDLE1BQWM7O1FBQ3pDLGVBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTSxNQUFvQixFQUFFLEVBQUU7O1lBQy9DLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1lBQ3hILGFBQU0sTUFBTSxDQUFDLFNBQVMsMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFDL0csSUFBSSxDQUFDLENBQUMsU0FBYyxFQUFFLEVBQUU7Z0JBQ3JCLG1CQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtvQkFDOUMsTUFBTSxRQUFRLEdBQXdCLENBQUMsQ0FBQztvQkFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxHQUFHLGlEQUFpRCxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDM0gsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDLEVBQUMsQ0FBQztZQUFDLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyw0RkFBNEYsQ0FBQyxDQUFDO1FBQzVILENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7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