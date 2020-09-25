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
        server.guild.fetchMember(uid).then((u) => { u.send(data.txt + const_1.serverLink + '\n Saludos, KMPF').then(() => { u.kick(data.rzn); }); });
        const channel = server.guild.channels.get(const_1.disTC[4]).send('**El USUARIO** <@' + uid + '> FUE EXPULSADO');
    });
}
exports.kickUsuarioByMsg = kickUsuarioByMsg;
function isAFK(client) {
    let msgem = new Discord.RichEmbed().setTitle('Usuarios AFK').setColor('#ff0000');
    let afklst = new Array(0);
    api_1.redlightsGET().then((AFKlist) => {
        let IDs = AFKlist;
        IDs.forEach(user => {
            afklst.push({ id_: user.id, msg: '<@' + user.id + '>\nSu rango fue __DESCENDIDO__ por INACTIVIDAD!\nKMPF' });
            msgem.addField(user.id + ' | ' + user.daysinac + ' Dias Inactivo', false);
            client.channels.get(const_1.disTC[4]).send(msgem).then(() => {
                afklst.forEach((user_) => __awaiter(this, void 0, void 0, function* () {
                    yield downgradingRank(user_.id_, client);
                    yield client.users.get(user_.id_).send(user_.msg);
                }));
            });
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
                    server.guild.channels.get(const_1.disTC[4]).send('**El USUARIO** <@' + uid + '> fue degrado de <@' + const_1.roles[i] + '> a <@' + const_1.roles[i + 1] + '>');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBQ3RDLG1DQUF5RztBQUN6RywrQkFBZ0c7QUFLNUYsU0FBc0IsUUFBUSxDQUFDLE1BQWM7O1FBQ3pDLGVBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTSxDQUFNLEVBQUUsRUFBRTtZQUNqQyxNQUFNLE1BQU0sR0FBaUIsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1lBQy9ILE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2lCQUMvRyxJQUFJLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTtnQkFDckIsbUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO29CQUM5QyxNQUFNLFFBQVEsR0FBd0IsQ0FBQyxDQUFDO29CQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLEdBQUcsaURBQWlELEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMzSCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLDRGQUE0RixDQUFDLENBQUM7UUFDbkksQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQVpELDRCQVlDO0FBQ0QsU0FBc0IsVUFBVSxDQUFD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