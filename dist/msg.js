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
let disarmy_ = true;
const client = new Discord.Client();
function menuBOT(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let author_ = msg.member;
        if (!(msg.author.bot)) {
            firebase.database().ref('/Users/').child(author_.id).update({ lastCon: new Date() });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFDM0MsNkJBQTJCO0FBRTNCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQztBQUM3QixNQUFNLE1BQU0sR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFcEQsU0FBc0IsT0FBTyxDQUFDLEdBQVE7O1FBQ2xDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUMvRyxJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzlCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQy9DLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDYixJQUFJLFlBQVksR0FBeUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7b0JBQzlCLFFBQU8sTUFBTSxDQUFDLEVBQUUsRUFBRTt3QkFDZCxLQUFLLG9CQUFvQixDQUFDLENBQUM7NEJB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