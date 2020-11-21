//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
//#endregion
//#region KMPF
import { dmALL } from "./coroneles";
import { resetBOT, offBOT } from "./devs";
//#endregion
//#endregion

let disarmy_: boolean = true;
const client: Discord.Client = new Discord.Client();
const applying: any = [];

export async function menuBOT(msg: any) {
    //#region Var
    let author_ = msg.member; 
    let cmd = (msg.content.split(' '))[1];
    //#endregion
    if(msg.content.startsWith('kmpf') && dmMSG(msg)) { msg.delete();
        switch(cmd) {
            case 'h': { helpMsg(msg, author_);    break; }
            case 'help': { helpMsg(msg, author_); break; }
            case 'dmall': { dmALL(msg, author_);  break; } 
            case 'mv': { 
                if(author_.roles.has('517169596059615252') || author_.roles.has('517171083384979456') || author_.roles.has('517168972483919929')) {
                    msg.mentions.users.map((user: any) => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
                } else { msg.author.send("no tienes el permiso para usar el comando."); }
                break; 
            } case 'perfil': { 

                break; 
            }
            case '-r':  { resetBOT(author_, msg.channel); break; }
            case '-s':  { offBOT(author_, msg.channel);   break; }
            case '-st': { /*changeSTATE(author_, msg);      break;*/ }
            case 'ping': { msg.reply(' Pong'); break; }
            default: { msg.reply(`Lo siento pero el comando no se encontro. Escribe __kmpf h__ o __kmpf help__ para más ayuda`); break; }
        }
    }
}
function dmMSG(msg: Discord.Message) { return msg.channel.type != 'dm' }
function helpMsg(msg: Discord.Message, author: any) {
    let userCommands: Array<{name: string; value: string}> = new Array(0);
    let msgEmbed: Discord.MessageEmbed = new Discord.MessageEmbed().setColor(16711680).setTitle("Commandos").setAuthor({ name: msg.author.username, icon_url: msg.author.avatarURL });
    author.roles.map((roles_: any) => {
        switch(roles_.id) {
            case '521184706142797834': { //Führer
                break;
            }
            case '517169596059615252': { //Coronales
                userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                /* userCommands.push({ name: "'kmpf ", value: 'Usuarios' }); */
                break;
            }
            case '517171083384979456': { //Teniente
                userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
                break;
            }
            case '517168972483919929': { //Dev
                userCommands.push({ name: "'kmpf -r'",    value: "Reinicia BOT __SOLO DEV LEADER__"});
                userCommands.push({ name: "'kmpf -s'",    value: "Apaga BOT __SOLO DEV LEADER__"});
                userCommands.push({ name: "'kmpf -st'", value: "Cambia el estado [0: **DESARROLLO** | 1: **ACTIVO**]"});
                userCommands.push({ name: "'kmpf ping'",  value: "Devuelve el PING"});
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
    msgEmbed.addFields(userCommands);
    msg.channel.send(msgEmbed);
}