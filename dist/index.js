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
const ConfigFile = require("./config");
const readyFNs = require("./periodic");
const rolesFN = require("./roles");
const client = new Discord.Client();
var app = firebase.initializeApp(ConfigFile.configfb);
client.on("ready", () => {
    console.log("Ready to go!!!");
    readyFNs.FnPeriodic(client);
});
client.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
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
            author_.roles.map(roles_ => {
                switch (roles_.id) {
                    case '521184706142797834': {
                        break;
                    }
                    case '517169596059615252': {
                        userCommands.push({ name: "'kmpf prune' **DESHABILITADO**", value: "Permite ver y eliminar a usuarios inactivos hace 30 o más días" });
                        userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
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
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    }, ttle: "Inactividad de Usuarios",
                    fields: userCommands
                } });
        }
        else if (msg.content.startsWith('kmpf dmall') && dmMSG(msg)) {
            if (author_.roles.has('517168972483919929')) {
                let MSG_ = msg.content.split('kmpf dmall ').slice(0);
                msg.guild.members.forEach(user => { console.log(MSG_); if (user.nickname == 'PofBattousai')
                    console.log(msg.author.dmChannel); });
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
        else {
            if (dmMSG(msg))
                msg.reply(`lo siento pero el comando no se encontro. Escribe 'kmpf h' para más ayuda`);
        }
    }
}));
client.on('messageReactionAdd', (reaction, user) => __awaiter(this, void 0, void 0, function* () {
    rolesFN.ponerRoles(reaction, user);
    console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
}));
client.on('messageReactionRemove', (reaction, user) => __awaiter(this, void 0, void 0, function* () {
    rolesFN.quiteRoles(reaction, user);
    console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
}));
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if (oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.user.bot)) {
        firebase.database().ref('/Users/').child(newMember.id).update({ lastCon: new Date() });
    }
    else if (newUserChannel === undefined) { }
});
client.on("presenceUpdate", (oldMember, newMember) => {
    if (oldMember.presence.status !== newMember.presence.status) {
        console.log(newMember.user.username + ' is now ' + newMember.presence.status);
    }
});
client.login(ConfigFile.config.token);
function dmMSG(msg) { return msg.channel.type != 'dm'; }
function checkChannelAllow() {
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFFM0MsNkJBQTJCO0FBRzNCLHVDQUF1QztBQUN2Qyx1Q0FBeUM7QUFDekMsbUNBQW1DO0FBR25DLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwRCxJQUFJLEdBQUcsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFeEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QixRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBTSxHQUFHLEVBQUMsRUFBRTtJQUM3QixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQUU7SUFDL0csSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUFFLE9BQU87S0FBRTtJQUM5QixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQy9CLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FB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