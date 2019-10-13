import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
import { kmpfMSG } from "./textos";

let disarmy_: boolean = true;
const client: Discord.Client = new Discord.Client();
const applying: any = [];

export async function menuBOT(msg: any) {
    let author_ = msg.member;
    if(msg.author.bot) { return; }
    if(msg.content.startsWith('kmpf')) {
        if(msg.content.startsWith('kmpf h') && dmMSG(msg)) {
            msg.delete();
            let userCommands: Array<{name: string; value: string}> = new Array(0);
            author_.roles.map((roles_: any) => {
                switch(roles_.id) {
                    case '521184706142797834': { //Führer
                        break;
                    }
                    case '517169596059615252': { //Coronales
                        userCommands.push({ name: "'kmpf prune' **DESHABILITADO**", value: "Permite ver y eliminar a usuarios inactivos hace 30 o más días"});
                        userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                        userCommands.push({ name: "'kmpf ", value: 'Usuarios' });
                        break;
                    }
                    case '517171083384979456': { //Teniente
                        userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                        break;
                    }
                    case '517168972483919929': { //Dev
                        userCommands.push({ name: "'kmpf ping'", value: "Devuelve el PING"});
                        break;
                    }
                    case '451837050618904577': {
                        userCommands.push({ name: "'kmpf play' **DESHABILITADO**", value: "Para reproducir música"});
                        userCommands.push({ name: "'kmpf jerequote'", value: "Para leer unas de las famosas frases de Mr Jere"});
                        break;
                    }
                    /* case '': {
                        userCommands
                        break;
                    } */
                }
            });
            msg.channel.send({embed: {
                color: 16711680,
                author: {
                    name: msg.user.username,
                    icon_url: msg.user.avatarURL
                }, ttle: "Inactividad de Usuarios",
                fields: userCommands
            }});
        } else if(!disarmy_/* msg.content.startsWith('kmpf mv') && dmMSG(msg) */) {
            if(author_.roles.has('517169596059615252') || author_.roles.has('517171083384979456') || author_.roles.has('517168972483919929')) {
                msg.delete();
                msg.mentions.users.map((user: any) => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        } else if(msg.content.startsWith('kmpf dmall') && dmMSG(msg)) {
            if(author_.roles.has('517168972483919929')) {
                let MSG_ = msg.content.split('kmpf dmall ').slice(0);
                msg.guild.members.forEach((user: any) => { console.log(MSG_); /* user.send(MSG_); */ if(user.nickname == 'PofBattousai') console.log(msg.author.dmChannel)});
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        } else if(msg.content.startsWith('kmpf perfil') && dmMSG(msg)) {
            if(author_.roles.has('517168972483919929')) {
                let MSG_ = msg.content.split('kmpf perfil ').slice(0);
                let profileUser: any = null;
                
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        } else if(msg.content.startsWith('kmpf ping') && dmMSG(msg)) {
            msg.reply(' Pong');
        } else if(msg.content.startsWith('kmpf jerequote') && dmMSG(msg)) {
            const jereFrases: Array<string> = ['Voy a ser mi propio JEFE', 'Estoy ganando muchos dolares en FOREX', 'Mi team es lo mejor', 'Le debo dolares a Mak', 'SOY RE JUDIO, Y QUE?']; 
            msg.channel.send('JudioJere: ' + jereFrases[Math.floor(Math.floor(Math.random() * 5))]);
        } else if(msg.content.startsWith('kmpf mvtroll') /* && dmMSG(msg) */) {
            if(author_.roles.has('517168972483919929')) {
                msg.delete();
                setInterval(() => {
                    msg.mentions.users.map((user: any) => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
                }, 10000);
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        }else { if(dmMSG(msg)) msg.reply(`Lo siento pero el comando no se encontro. Escribe 'kmpf h' para más ayuda`); }
    }
}

function dmMSG(msg: any) { return msg.channel.type != 'dm' }
function checkChannelAllow() {  }