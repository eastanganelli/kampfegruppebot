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
            const myUser = u;
            yield myUser.sendMessage('Por favor, escribe tu numero de celular para ser añadido al grupo de WPP\n__(ie: +5491162908200)__');
            yield myUser.dmChannel.awaitMessages((m) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] })
                .then((collected) => {
                const_1.getTChannel('667006073441484801').then((c) => {
                    const channel_ = c;
                    channel_.send('El usuario <@' + userID + '> desea ser añadido al grupo de Whatsapp\nNro: ' + collected.first().content);
                });
            });
            yield myUser.sendMessage('Su numero fue enviado a los Coroneles\nEn breve sera agregado al grupo\n**Saludos, KMPF!**');
        }));
    });
}
exports.addToWpp = addToWpp;
function addFCumple(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const_1.getUser(userID).then((u) => __awaiter(this, void 0, void 0, function* () {
            const myUser = u;
            yield myUser.sendMessage('Por favor, ingrese su fecha de cumpleaños\n:warning: El formato debe ser AÑO-MES-DIA\n__(ie: 2018-5-31)__');
            yield myUser.dmChannel.awaitMessages((m) => m.author.id === userID, { max: 1, time: 300000, errors: ["time"] })
                .then((collected) => {
                console.log(collected.first().content);
                api_1.birthPUT(myUser.id, { birth: collected.first().content });
            });
            yield myUser.sendMessage('Su fecha ya fue guardada\n**Saludos, KMPF!**');
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
    let msgem = new Discord.RichEmbed().setTitle('Usuarios AFK').setColor('#ff0000');
    let afklst = new Array(0);
    api_1.redlightsGET().then((AFKlist) => {
        let IDs = AFKlist;
        IDs.forEach(user => {
            const_1.getUserGuild(user.id).then((userGuikd) => {
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
            let embedMSG = new Discord.RichEmbed().setTitle(const_1.kmpfMSG.kmpfNews.Arr[0].titulo).setDescription('Que tengas un **Feliz Cumpleaños** <@' + user.id + '>\nCLAN <@594571311171371008>\n\n@here');
            client.channels.get(const_1.kmpfMSG.kmpfNews.MC).send(embedMSG);
        });
    });
}
exports.checkIfCumple = checkIfCumple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBQ3RDLG1DQUFrSTtBQUNsSSwrQkFBZ0c7QUFLNUYsU0FBc0IsUUFBUSxDQUFDLE1BQWM7O1FBQ3pDLGVBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTSxDQUFNLEVBQUUsRUFBRTtZQUNqQyxNQUFNLE1BQU0sR0FBaUIsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1lBQy9ILE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2lCQUMvRyxJQUFJLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTtnQkFDckIsbUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO29CQUM5QyxNQUFNLFFBQVEsR0FBd0IsQ0FBQyxDQUFDO29CQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLEdBQUcsaURBQWlELEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMzSCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLDRGQUE0RixDQUFDLENBQUM7UUFDbkksQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQVpELDRCQVlDO0FBQ0QsU0FBc0IsVUFBVSxDQUFD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