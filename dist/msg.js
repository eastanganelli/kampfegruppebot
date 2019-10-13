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
require("firebase/database");
let disarmy_ = true;
const client = new Discord.Client();
const applying = [];
function menuBOT(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let author_ = msg.member;
        if (msg.author.bot) {
            return;
        }
        if (msg.content.startsWith('kmpf')) {
            if (msg.content.startsWith('kmpf h') && dmMSG(msg)) {
                msg.delete();
                let userCommands = new Array(0);
                author_.roles.map((roles_) => {
                    switch (roles_.id) {
                        case '521184706142797834': {
                            break;
                        }
                        case '517169596059615252': {
                            userCommands.push({ name: "'kmpf prune' **DESHABILITADO**", value: "Permite ver y eliminar a usuarios inactivos hace 30 o más días" });
                            userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                            userCommands.push({ name: "'kmpf ", value: 'Usuarios' });
                            break;
                        }
                        case '517171083384979456': {
                            userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                            break;
                        }
                        case '517168972483919929': {
                            userCommands.push({ name: "'kmpf ping'", value: "Devuelve el PING" });
                            break;
                        }
                        case '451837050618904577': {
                            userCommands.push({ name: "'kmpf play' **DESHABILITADO**", value: "Para reproducir música" });
                            userCommands.push({ name: "'kmpf jerequote'", value: "Para leer unas de las famosas frases de Mr Jere" });
                            break;
                        }
                    }
                });
                msg.channel.send({ embed: {
                        color: 16711680,
                        author: {
                            name: msg.user.username,
                            icon_url: msg.user.avatarURL
                        }, ttle: "Inactividad de Usuarios",
                        fields: userCommands
                    } });
            }
            else if (!disarmy_) {
                if (author_.roles.has('517169596059615252') || author_.roles.has('517171083384979456') || author_.roles.has('517168972483919929')) {
                    msg.delete();
                    msg.mentions.users.map((user) => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
                }
                else {
                    msg.delete();
                    msg.author.send("no tienes el permiso para usar el comando.");
                }
            }
            else if (msg.content.startsWith('kmpf dmall') && dmMSG(msg)) {
                if (author_.roles.has('517168972483919929')) {
                    let MSG_ = msg.content.split('kmpf dmall ').slice(0);
                    msg.guild.members.forEach((user) => { console.log(MSG_); if (user.nickname == 'PofBattousai')
                        console.log(msg.author.dmChannel); });
                }
                else {
                    msg.delete();
                    msg.author.send("no tienes el permiso para usar el comando.");
                }
            }
            else if (msg.content.startsWith('kmpf perfil') && dmMSG(msg)) {
                if (author_.roles.has('517168972483919929')) {
                    let MSG_ = msg.content.split('kmpf perfil ').slice(0);
                    let profileUser = null;
                }
                else {
                    msg.delete();
                    msg.author.send("no tienes el permiso para usar el comando.");
                }
            }
            else if (msg.content.startsWith('kmpf ping') && dmMSG(msg)) {
                msg.reply(' Pong');
            }
            else if (msg.content.startsWith('kmpf jerequote') && dmMSG(msg)) {
                const jereFrases = ['Voy a ser mi propio JEFE', 'Estoy ganando muchos dolares en FOREX', 'Mi team es lo mejor', 'Le debo dolares a Mak', 'SOY RE JUDIO, Y QUE?'];
                msg.channel.send('JudioJere: ' + jereFrases[Math.floor(Math.floor(Math.random() * 5))]);
            }
            else if (msg.content.startsWith('kmpf mvtroll')) {
                if (author_.roles.has('517168972483919929')) {
                    msg.delete();
                    setInterval(() => {
                        msg.mentions.users.map((user) => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
                    }, 10000);
                }
                else {
                    msg.delete();
                    msg.author.send("no tienes el permiso para usar el comando.");
                }
            }
            else {
                if (dmMSG(msg))
                    msg.reply(`Lo siento pero el comando no se encontro. Escribe 'kmpf h' para más ayuda`);
            }
        }
    });
}
exports.menuBOT = menuBOT;
function dmMSG(msg) { return msg.channel.type != 'dm'; }
function checkChannelAllow() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUV6Qyw2QkFBMkI7QUFHM0IsSUFBSSxRQUFRLEdBQVksSUFBSSxDQUFDO0FBQzdCLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwRCxNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7QUFFekIsU0FBc0IsT0FBTyxDQUFDLEdBQVE7O1FBQ2xDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUM5QixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxZQUFZLEdBQXlDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO29CQUM5QixRQUFPLE1BQU0sQ0FBQyxFQUFFLEVBQUU7d0JBQ2QsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDOzRCQUN2QixNQUFNO3lCQUNUO3dCQUNELEtBQUssb0JBQW9CLENBQUMsQ0FBQzs0QkFDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQ0FBZ0MsRUFBRSxLQUFLLEVBQUUsZ0VBQWdFLEVBQUMsQ0FBQyxDQUFDOzRCQUN0SSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJDQUEyQyxFQUFFLEtBQUss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