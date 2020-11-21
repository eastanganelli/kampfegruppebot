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
        const_1.getUser(userID).then((u) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const myUser = u;
            yield myUser.send('Por favor, escribe tu numero de celular para ser añadido al grupo de WPP\n__(ie: +5491162908200)__');
            yield ((_a = myUser.dmChannel) === null || _a === void 0 ? void 0 : _a.awaitMessages((m) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] }).then((collected) => {
                const_1.getTChannel('667006073441484801').then((c) => {
                    const channel_ = c;
                    channel_.send('El usuario <@' + userID + '> desea ser añadido al grupo de Whatsapp\nNro: ' + collected.first().content);
                });
            }));
            yield myUser.send('Su numero fue enviado a los Coroneles\nEn breve sera agregado al grupo\n**Saludos, KMPF!**');
        }));
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
        }));
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
        client.channels.get(const_1.disTC[4]).send(msgem).then(() => {
            afklst.forEach((user_) => __awaiter(this, void 0, void 0, function* () {
                yield downgradingRank(user_.id_, client);
                yield client.users.get(user_.id_).send(user_.msg);
            }));
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
            client.channels.get(const_1.kmpfMSG.kmpfNews.MC).send(embedMSG);
        });
    });
}
exports.checkIfCumple = checkIfCumple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBQ3RDLG1DQUEwSTtBQUMxSSwrQkFBZ0c7QUFLNUYsU0FBc0IsUUFBUSxDQUFDLE1BQWM7O1FBQ3pDLGVBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTSxDQUFNLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxNQUFNLEdBQWlCLENBQUMsQ0FBQztZQUMvQixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0dBQW9HLENBQUMsQ0FBQztZQUN4SCxhQUFNLE1BQU0sQ0FBQyxTQUFTLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQy9HLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFO2dCQUNyQixtQkFBVyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7b0JBQzlDLE1BQU0sUUFBUSxHQUF3QixDQUFDLENBQUM7b0JBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sR0FBRyxpREFBaUQsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzNILENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxFQUFDLENBQUM7WUFBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEZBQTRGLENBQUMsQ0FBQztRQUM1SCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBWkQsNEJBWUM7QUFDRCxTQUFzQixVQUFVLENBQUMsTUFB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