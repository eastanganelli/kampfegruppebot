//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import * as fs         from "fs";
import "firebase/database";
//#endregion
//#region Mines
import * as ConfigFile from "./config";
import * as readyFNs   from "./periodic";
import * as rolesFN from "./roles";
//#endregion

const client: Discord.Client = new Discord.Client();
var app: firebase.app.App = firebase.initializeApp(ConfigFile.configfb);

client.on("ready", () => { 
    console.log("Ready to go!!!");
    readyFNs.FnPeriodic(client);
});
client.on("message", async msg => {
    let author_ = msg.member;
    firebase.database().ref('/Users/').child(author_.id).update({ lastCon: new Date() });
    if(msg.author.bot) { return; }
    if(msg.content.startsWith('kmpf')) {
        if(msg.content.startsWith('kmpf h') && dmMSG(msg)) {
            msg.delete();
            let userCommands: Array<{name: string; value: string}> = new Array(0);
            author_.roles.map(roles_ => {
                switch(roles_.id) {
                    case '521184706142797834': { //Führer
                        break;
                    }
                    case '517169596059615252': { //Coronales
                        userCommands.push({ name: "'kmpf prune' **DESHABILITADO**", value: "Permite ver y eliminar a usuarios inactivos hace 30 o más días"});
                        userCommands.push({ name: "'kmpf move <#'ID'> @ID' **DESHABILITADO**", value: 'Mueve al/los usuario/s de Canal de Voz' });
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
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                }, ttle: "Inactividad de Usuarios",
                fields: userCommands
            }});
        }/* else if(msg.content.startsWith('kmpf prune') && dmMSG(msg)) {
            if(author_.roles.has('517169596059615252') || author_.roles.has('517168972483919929')) {
                msg.delete(); 
                client.guilds.first().pruneMembers(30, true).then(prune => { 
                    msg.channel.send({embed: {
                        color: 16711680,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        }, ttle: "Inactividad de Usuarios",
                        fields: [{
                                name: "Inactivos hace 30 días o más",
                                value: `Usuarios inactivos: ${prune}`
                            },
                            { name: "✅ Para eliminar a los inactivos", value: "." },
                            { name: "❎ Para cancelar", value: "." }
                        ]
                    }}).then((sendEmbed: any) => { sendEmbed.react("❎"); sendEmbed.react("✅"); }).catch(err => {alert(err)});
                });
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        } else if(msg.content.startsWith('kmpf mv') && dmMSG(msg)) {
            if(author_.roles.has('517169596059615252') || author_.roles.has('517171083384979456') || author_.roles.has('517168972483919929')) {
                msg.delete();
                msg.mentions.users.map(user => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        } else if(msg.content.startsWith('kmpf mvtroll') && dmMSG(msg)) {
            if(author_.roles.has('517169596059615252') || author_.roles.has('517171083384979456') || author_.roles.has('517168972483919929')) {
                msg.delete();
                setInterval(() => {
                    msg.mentions.users.map(user => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
                }, 5000);
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        } */ else if(msg.content.startsWith('kmpf dmall') && dmMSG(msg)) {
            if(author_.roles.has('517168972483919929')) {
                let MSG_ = msg.content.split('kmpf dmall ').slice(0);
                msg.guild.members.forEach(user => { console.log(MSG_); /* user.send(MSG_); */ if(user.nickname == 'PofBattousai') console.log(msg.author.dmChannel)});
            } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
        } /* else if (msg.content.startsWith('kmpf p ') ||  msg.content.startsWith('kmpf play') && dmMSG(msg)) {
            if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join().then(connection => { 
                    msg.reply('I have successfully connected to the channel!');
                    playSongs(connection, '', msg, 0);
                }).catch(err => {console.log(err)});
            } else {
                msg.reply('You need to join a voice channel first!');
            }
        } else if (msg.content.startsWith('kmpf d ') ||  msg.content.startsWith('kmpf disconnect') && dmMSG(msg)) { msg.member.voiceChannel.leave(); }  */
          else if(msg.content.startsWith('kmpf ping') && dmMSG(msg)) {
            msg.reply(' Pong');
        } else if(msg.content.startsWith('kmpf jerequote') && dmMSG(msg)) {
            const jereFrases: Array<string> = ['Voy a ser mi propio JEFE', 'Estoy ganando muchos dolares en FOREX', 'Mi team es lo mejor', 'Le debo dolares a Mak', 'SOY RE JUDIO, Y QUE?']; 
            msg.channel.send('JudioJere: ' + jereFrases[Math.floor(Math.floor(Math.random() * 5))]);
        } //else if(msg.content.startsWith('kmpf profile')) { profileFn.CargarPerfil(msg, client) } 
        /* else if(msg.content.startsWith('kmpf striketroll ') && dmMSG(msg)) {
            console.log(msg.content.slice(17));
            client.fetchUser(msg.content.slice(17)).then(data => {
                const coronel_ = ['251482884987289600', '311264984627675137', '406645486221524992', '327966508242305024']
                for(let i = 0; i < 4; i++) { data.sendMessage("Usted ha recibido un Strike por el coronel <@"+coronel_[i]+">") } 
                data.sendMessage("En breve le notificaremos, si sera baneado o no.")
            }); 
        } */ else {
            if(dmMSG(msg)) msg.reply(`lo siento pero el comando no se encontro. Escribe 'kmpf h' para más ayuda`); 
        }
    }
});
client.on('messageReactionAdd', async (reaction, user) => {
    rolesFN.ponerRoles(reaction, user);
    console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});
client.on('messageReactionRemove', async (reaction, user) => {
    const guildMember: any = reaction.message.guild.members.get(user.id);
    if(reaction.message.channel.id === '614258469066768424' && !user.bot ) {
        switch(reaction.emoji.name) {
            case "bf1":  { guildMember.removeRole('614411015236616206'); break; }
            case "bf4":  { guildMember.removeRole('614411509036089346'); break; }
            case "bf5":  { guildMember.removeRole('614410633282191371'); break; }
            case "ets2": { guildMember.removeRole('614556408524046371'); break; }
            case "gtav": { guildMember.removeRole('614556113798561843'); break; }
            case "wt":   { guildMember.removeRole('614555777402667008'); break; }
        }
    }
    console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`); 
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if(oldUserChannel === undefined && newUserChannel !== undefined) { firebase.database().ref('/Users/').child(newMember.id).update({ lastCon: new Date() }); } 
    else if(newUserChannel === undefined){ /*Leaves VC*/ }
  })
client.on("presenceUpdate", (oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status) {
        /* firebase.database().ref('/Users/').child(newMember.id).on('value', data => {  
            if(newMember.presence.status == 'offline') { 
            } else if(newMember.presence.status == 'online' || newMember.presence.status == 'idle' || newMember.presence.status == 'dnd') {  
                if(data.val() === null && !(newMember.presence.status == 'idle' || newMember.presence.status == 'dnd')) { 
                    newMember.sendMessage("Por Favor, cargue sus datos de Perfil")
                }
                else if(data.val() != null) {  }
            }
        }, (Err: any) => { console.log(Err) });  */
    console.log(newMember.user.username + ' is now ' + newMember.presence.status); } 
});
 
client.login(ConfigFile.config.token);


function dmMSG(msg: any) { return msg.channel.type != 'dm' }
function checkChannelAllow() {
    
}
function playSongs(connection: any, nextSong: any, msg_: any, pos: number) {
    const music: Array<any> = ['Daft Punk/(2007) Alive 2007/01 - Alive 2007.mp3', 'GARNiDELiA/Albums/[2016] Violet Cry/MP3/08. Gokuraku Joudo.mp3', '2028/Bring Me The Horizon-Can You Feel My Heart [INF1N1TE Remix].mp3', '2028/((FUTURE OF DUBSTEP 2028))).wma']
    const broadcast = client.createVoiceBroadcast();
    //broadcast.playFile('D:/Ezequiel/My Music/GARNiDELiA/Albums/[2016] Violet Cry/MP3/08. Gokuraku Joudo.mp3');
    if(pos == 0) { nextSong = music[0]; }
    const playing = connection.playFile('D:/Ezequiel/My Music/' + nextSong).on('start', () => {
    });
    playing.on('end', (reason_: any) => {
        if(pos == music.length) { msg_.member.voiceChannel.leave(); }
        else {
            playSongs(connection, music[pos + 1], msg_, pos + 1);
        }
    });
}
//#region help code
    //if(!msg.content.startsWith(ConfigFile.config.prefix) + `quien es el más puto?`) { msg.channel.send(`JERE`); }
    //msg.channel.send(`${msg.author.username} just used a command!`);
    //let args = msg.content.split("").slice(8);
    //.then((sendEmbed: any) => { sendEmbed.react("❎"); sendEmbed.react("✅"); }).catch(err => {alert(err)});
    //msg.send(`WELCOME ${newMember.user.username}`, { tts: true });
//#endregion