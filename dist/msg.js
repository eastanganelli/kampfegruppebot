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
const users_1 = require("./users");
let disarmy_ = true;
const client = new Discord.Client();
function menuBOT(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let author_ = msg.member;
        if (!(msg.author.bot)) {
            users_1.lastConnectionusuario(author_.id);
        }
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
            else if (msg.content.startsWith('kmpf p ') || msg.content.startsWith('kmpf play') && dmMSG(msg)) {
                if (msg.member.voiceChannel) {
                    msg.member.voiceChannel.join().then((connection) => {
                        msg.reply('I have successfully connected to the channel!');
                        playSongs(connection, '', msg, 0);
                    }).catch((err) => { console.log(err); });
                }
                else {
                    msg.reply('You need to join a voice channel first!');
                }
            }
            else if (!disarmy_) {
                msg.member.voiceChannel.leave();
            }
            else if (msg.content.startsWith('kmpf ping') && dmMSG(msg)) {
                msg.reply(' Pong');
            }
            else if (msg.content.startsWith('kmpf jerequote') && dmMSG(msg)) {
                const jereFrases = ['Voy a ser mi propio JEFE', 'Estoy ganando muchos dolares en FOREX', 'Mi team es lo mejor', 'Le debo dolares a Mak', 'SOY RE JUDIO, Y QUE?'];
                msg.channel.send('JudioJere: ' + jereFrases[Math.floor(Math.floor(Math.random() * 5))]);
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
function playSongs(connection, nextSong, msg_, pos) {
    const music = ['Daft Punk/(2007) Alive 2007/01 - Alive 2007.mp3', 'GARNiDELiA/Albums/[2016] Violet Cry/MP3/08. Gokuraku Joudo.mp3', '2028/Bring Me The Horizon-Can You Feel My Heart [INF1N1TE Remix].mp3', '2028/((FUTURE OF DUBSTEP 2028))).wma'];
    const broadcast = client.createVoiceBroadcast();
    if (pos == 0) {
        nextSong = music[0];
    }
    const playing = connection.playFile('D:/Ezequiel/My Music/' + nextSong).on('start', () => {
    });
    playing.on('end', (reason_) => {
        if (pos == music.length) {
            msg_.member.voiceChannel.leave();
        }
        else {
            playSongs(connection, music[pos + 1], msg_, pos + 1);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUV6Qyw2QkFBMkI7QUFDM0IsbUNBQWdEO0FBRWhELElBQUksUUFBUSxHQUFZLElBQUksQ0FBQztBQUM3QixNQUFNLE1BQU0sR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFcEQsU0FBc0IsT0FBTyxDQUFDLEdBQVE7O1FBQ2xDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUFFLDZCQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUFFO1FBQzVELElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDOUIsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDL0MsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNiLElBQUksWUFBWSxHQUF5QyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtvQkFDOUIsUUFBTyxNQUFNLENBQUMsRUFBRSxFQUFFO3dCQUNkLEtBQUssb0JBQW9CLENBQUMsQ0FBQzs0QkFDdkIsTUFBTTt5QkFDVDt3QkFDRCxLQUFLLG9CQUFvQixDQUFDLENBQUM7NEJBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0NBQWdDLEVBQUUsS0FBSyxF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