"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
                if (author_.roles.has('517169596059615252') || author_.roles.has('517168972483919929')) {
                    msg.delete();
                    msg.guild.pruneMembers(30, true).then((prune) => {
                        msg.channel.send({ embed: {
                                color: 16711680,
                                author: {
                                    name: msg.user.username,
                                    icon_url: msg.user.avatarURL
                                }, ttle: "Inactividad de Usuarios",
                                fields: [{
                                        name: "Inactivos hace 30 días o más",
                                        value: `Usuarios inactivos: ${prune}`
                                    },
                                    { name: "✅ Para eliminar a los inactivos", value: "." },
                                    { name: "❎ Para cancelar", value: "." }
                                ]
                            } }).then((sendEmbed) => { sendEmbed.react("❎"); sendEmbed.react("✅"); }).catch((err) => { alert(err); });
                    });
                }
                else {
                    msg.delete();
                    msg.author.send("no tienes el permiso para usar el comando.");
                }
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
                    if (MSG_[1] == 'lista') {
                        msg.channel.send('__**KMPF USUARIOS**__\n');
                        msg.guild.members.find((u_) => {
                            firebase.database().ref('/Users/').child(u_.user.id).once('value', snapshot => {
                                let uData = snapshot.val();
                                if (uData != null && uData.nombre != 'undefined') {
                                    let hasRoles = false;
                                    msg.guild.roles.find((r_) => { if (u_.roles.find((r) => r.name === r_.name)) {
                                        hasRoles = true;
                                    } ; });
                                    msg.channel.send('```' + "<@" + u_.user.id + "> {" + u_.user.name + "}" + '\nCumpleaños: ' + uData.birth + '\tUltima Conexión: ' + uData.lastCon + '\tPerfil Cargado: SI --- : ' + '```');
                                }
                            }, (Err) => { console.log(Err); });
                        });
                    }
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
            else if (!disarmy_) {
                console.log(msg.content.slice(17));
                msg.fetchUser(msg.content.slice(17)).then((data) => {
                    const coronel_ = ['251482884987289600', '311264984627675137', '406645486221524992', '327966508242305024'];
                    for (let i = 0; i < 4; i++) {
                        data.sendMessage("Usted ha recibido un Strike por el coronel <@" + coronel_[i] + ">");
                    }
                    data.sendMessage("En breve le notificaremos, si sera baneado o no.");
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLHlDQUEyQztBQUMzQyw2QkFBMkI7QUFJM0IsSUFBSSxRQUFRLEdBQVksSUFBSSxDQUFDO0FBQzdCLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVwRCxTQUFzQixPQUFPLENBQUMsR0FBUTs7UUFDbEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUFFO1FBQy9HLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDOUIsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDL0MsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNiLElBQUksWUFBWSxHQUF5QyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtvQkFDOUIsUUFBTyxNQUFNLENBQUMsRUFBRSxFQUFFO3dCQUNkLEtBQUssb0JBQW9CLENBQUMsQ0FBQzs0QkFDdkIsTUFBTTt5QkFDVDt3QkFDRCxLQUFLLG9CQUFvQixDQUFDLENBQUM7NEJBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0NBQWdDLEVBQUUsS0FBSyxFQUFFLGdFQUFnRSxFQUFDLENBQUMsQ0FBQzs0QkFDdEksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSwyQ0FBMkMsRUFBRSxLQUFLLEVBQUUsd0NBQXdDLEVBQUUsQ0FBQyxDQUFDOzRCQUMxSCxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDekQsTUFBTTt5QkFDVDt3QkFDRCxLQUFLLG9CQUFvQixDQUFDLENBQUM7NEJBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsMkNBQTJDLEVBQUUsS0FBSyxFQUFFLHdDQUF3QyxFQUFFLENBQUMsQ0FBQzs0QkFDMUgsTUFBTTt5QkFDVDt3QkFDRCxLQUFLLG9CQUFvQixDQUFDLENBQUM7NEJBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUM7NEJBQ3JFLE1BQU07eUJBQ1Q7d0JBQ0QsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDOzRCQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLCtCQUErQixFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBQyxDQUFDLENBQUM7NEJBQzdGLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLGlEQUFpRCxFQUFDLENBQUMsQ0FBQzs0QkFDekcsTUFBTTt5QkFDVDtxQkFLSjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRTt3QkFDckIsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsTUFBTSxFQUFFOzRCQUNKLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7NEJBQ3ZCLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7eUJBQy9CLEVBQUUsSUFBSSxFQUFFLHlCQUF5Qjt3QkFDbEMsTUFBTSxFQUFFLFlBQVk7cUJBQ3ZCLEVBQUMsQ0FBQyxDQUFDO2FBQ1A7aUJBQU0sSUFBRyxDQUFDLFFBQVEsRUFBMEQ7Z0JBQ3pFLElBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO29CQUNuRixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO3dCQUNqRCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRTtnQ0FDckIsS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsTUFBTSxFQUFFO29DQUNKLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7b0NBQ3ZCLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7aUNBQy9CLEVBQUUsSUFBSSxFQUFFLHlCQUF5QjtnQ0FDbEMsTUFBTSxFQUFFLENBQUM7d0NBQ0QsSUFBSSxFQUFFLDhCQUE4Qjt3Q0FDcEMsS0FBSyxFQUFFLHVCQUF1QixLQUFLLEVBQUU7cUNBQ3hDO29DQUNELEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0NBQ3ZELEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7aUNBQzFDOzZCQUNKLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO29CQUNwSCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztpQkFBRTthQUMxRjtpQkFBTSxJQUFHLENBQUMsUUFBUSxFQUF1RDtnQkFDdEUsSUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBRTtvQkFDOUgsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEk7cUJBQU07b0JBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7aUJBQUU7YUFDMUY7aUJBQU0sSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFELElBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBRTtvQkFDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBd0IsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLGNBQWM7d0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7aUJBQ2hLO3FCQUFNO29CQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO2lCQUFFO2FBQzFGO2lCQUFNLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzRCxJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7b0JBQ3hDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFFO3dCQUNuQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO3dCQUM1QyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTs0QkFDL0IsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dDQUMxRSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQzNCLElBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLFdBQVcsRUFBRTtvQ0FDN0MsSUFBSSxRQUFRLEdBQVksS0FBSyxDQUFDO29DQUM5QixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxHQUFHLElBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO3dDQUFFLFFBQVEsR0FBRyxJQUFJLENBQUM7cUNBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQy9HLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLEdBQUcsS0FBSyxDQUFDLENBQUM7aUNBQ3pMOzRCQUNMLENBQUMsRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxDQUFDLENBQUMsQ0FBQztxQkFDTjtpQkFDSjtxQkFBTTtvQkFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztpQkFBRTthQUMxRjtpQkFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtvQkFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7d0JBQ3BELEdBQUcsQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQzt3QkFDM0QsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztpQkFDOUM7cUJBQU07b0JBQ0gsR0FBRyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2lCQUN4RDthQUNKO2lCQUFNLElBQUksQ0FBQyxRQUFRLEVBQXFHO2dCQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQUU7aUJBQ3RKLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6RCxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlELE1BQU0sVUFBVSxHQUFrQixDQUFDLDBCQUEwQixFQUFFLHVDQUF1QyxFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2hMLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzRjtpQkFBTSxJQUFHLENBQUMsUUFBUSxFQUFpRTtnQkFDaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7b0JBQ3BELE1BQU0sUUFBUSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQTtvQkFDekcsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLCtDQUErQyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFBRTtvQkFDaEgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO2dCQUN4RSxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUFFLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLDJFQUEyRSxDQUFDLENBQUM7YUFBRTtTQUNwSDtJQUNMLENBQUM7Q0FBQTtBQXJIRCwwQkFxSEM7QUFDRCxTQUFTLEtBQUssQ0FBQyxHQUFRLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUEsQ0FBQyxDQUFDO0FBQzVELFNBQVMsaUJBQWlCLEtBQU0sQ0FBQztBQUNqQyxTQUFTLFNBQVMsQ0FBQyxVQUFlLEVBQUUsUUFBYSxFQUFFLElBQVMsRUFBRSxHQUFXO0lBQ3JFLE1BQU0sS0FBSyxHQUFlLENBQUMsaURBQWlELEVBQUUsZ0VBQWdFLEVBQUUsc0VBQXNFLEVBQUUsc0NBQXNDLENBQUMsQ0FBQTtJQUMvUCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUVoRCxJQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUU7UUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUU7SUFDckMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN6RixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUU7UUFDL0IsSUFBRyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQUU7YUFDeEQ7WUFDRCxTQUFTLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN4RDtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9