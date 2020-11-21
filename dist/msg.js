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
exports.menuBOT = void 0;
const Discord = require("discord.js");
const coroneles_1 = require("./coroneles");
const devs_1 = require("./devs");
let disarmy_ = true;
const client = new Discord.Client();
const applying = [];
function menuBOT(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let author_ = msg.member;
        let cmd = (msg.content.split(' '))[1];
        if (msg.content.startsWith('kmpf') && dmMSG(msg)) {
            msg.delete();
            switch (cmd) {
                case 'h': {
                    helpMsg(msg, author_);
                    break;
                }
                case 'help': {
                    helpMsg(msg, author_);
                    break;
                }
                case 'dmall': {
                    coroneles_1.dmALL(msg, author_);
                    break;
                }
                case 'mv': {
                    if (author_.roles.has('517169596059615252') || author_.roles.has('517171083384979456') || author_.roles.has('517168972483919929')) {
                        msg.mentions.users.map((user) => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
                    }
                    else {
                        msg.author.send("no tienes el permiso para usar el comando.");
                    }
                    break;
                }
                case 'perfil': {
                    break;
                }
                case '-r': {
                    devs_1.resetBOT(author_, msg.channel);
                    break;
                }
                case '-s': {
                    devs_1.offBOT(author_, msg.channel);
                    break;
                }
                case '-st': { }
                case 'ping': {
                    msg.reply(' Pong');
                    break;
                }
                default: {
                    msg.reply(`Lo siento pero el comando no se encontro. Escribe __kmpf h__ o __kmpf help__ para más ayuda`);
                    break;
                }
            }
        }
    });
}
exports.menuBOT = menuBOT;
function dmMSG(msg) { return msg.channel.type != 'dm'; }
function helpMsg(msg, author) {
    let userCommands = new Array(0);
    let msgEmbed = new Discord.MessageEmbed().setColor(16711680).setTitle("Commandos").setAuthor({ name: msg.author.username, icon_url: msg.author.avatarURL });
    author.roles.map((roles_) => {
        switch (roles_.id) {
            case '521184706142797834': {
                break;
            }
            case '517169596059615252': {
                userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                break;
            }
            case '517171083384979456': {
                userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                break;
            }
            case '517168972483919929': {
                userCommands.push({ name: "'kmpf -r'", value: "Reinicia BOT __SOLO DEV LEADER__" });
                userCommands.push({ name: "'kmpf -s'", value: "Apaga BOT __SOLO DEV LEADER__" });
                userCommands.push({ name: "'kmpf -st'", value: "Cambia el estado [0: **DESARROLLO** | 1: **ACTIVO**]" });
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
    msgEmbed.addFields(userCommands);
    msg.channel.send(msgEmbed);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFHdEMsMkNBQW9DO0FBQ3BDLGlDQUEwQztBQUkxQyxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7QUFDN0IsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BELE1BQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztBQUV6QixTQUFzQixPQUFPLENBQUMsR0FBUTs7UUFFbEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEMsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDNUQsUUFBTyxHQUFHLEVBQUU7Z0JBQ1IsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUFJLE1BQU07aUJBQUU7Z0JBQzlDLEtBQUssTUFBTSxDQUFDLENBQUM7b0JBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFBQyxNQUFNO2lCQUFFO2dCQUM5QyxLQUFLLE9BQU8sQ0FBQyxDQUFDO29CQUFFLGlCQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUFFLE1BQU07aUJBQUU7Z0JBQzlDLEtBQUssSUFBSSxDQUFDLENBQUM7b0JBQ1AsSUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLE9BQU8sQ0FB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