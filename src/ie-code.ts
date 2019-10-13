//#region help code
    //if(!msg.content.startsWith(ConfigFile.config.prefix) + `quien es el más puto?`) { msg.channel.send(`JERE`); }
    //msg.channel.send(`${msg.author.username} just used a command!`);
    //let args = msg.content.split("").slice(8);
    //.then((sendEmbed: any) => { sendEmbed.react("❎"); sendEmbed.react("✅"); }).catch(err => {alert(err)});
    //msg.send(`WELCOME ${newMember.user.username}`, { tts: true });
//#endregion
//#region Code ie
/* function playSongs(connection: any, nextSong: any, msg_: any, pos: number) {
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
} */
/*
else if( msg.content.startsWith('kmpf mvtroll') && dmMSG(msg) ) {
    if(author_.roles.has('517169596059615252') || author_.roles.has('517171083384979456') || author_.roles.has('517168972483919929')) {
        msg.delete();
        setInterval(() => {
            msg.mentions.users.map(user => { msg.guild.members.find('id', user.id).setVoiceChannel(msg.mentions.channels.first()); });
        }, 5000);
    } else { msg.delete(); msg.author.send("no tienes el permiso para usar el comando."); }
}
*/
//#endregion
/*
const questions = [                    // ------------------------------------
    "What's your IGN?",                  //
    "How old are you?",                  // Define the questions you'd like the
    "What time zone do you reside in?",  // application to have in this array.
    "Do you have Schematica?"            //
  ];                                     // ------------------------------------
  
  const applying: any = [];
  
client.on("message", async message => {
    if (message.author.bot) return;
  
    if (message.content.toLowerCase() === "%apply") {
      if (applying.includes(message.author.id)) return;
  
      try {
        console.log(`${message.author.tag} began applying.`);
  
        applying.push(message.author.id);
        await message.channel.send(":pencil: **Application started!** Type `#cancel` to exit.");
  
        for (let i = 0, cancel = false; i < questions.length && cancel === false; i++) {
          await message.channel.send(questions[i]);
          await message.channel.awaitMessages((m: any) => m.author.id === message.author.id, { max: 1, time: 300000, errors: ["time"] })
            .then((collected: any) => {
              if (collected.first().content.toLowerCase() === "#cancel") {
                message.channel.send(":x: **Application cancelled.**");
                applying.splice(applying.indexOf(message.author.id), 1);
                cancel = true;
  
                console.log(`${message.author.tag} cancelled their application.`);
              }
            }).catch(() => {
              message.channel.send(":hourglass: **Application timed out.**");
              applying.splice(applying.indexOf(message.author.id), 1);
              cancel = true;
  
              console.log(`${message.author.tag} let their application time out.`);
            });
        }
  
        await message.channel.send(":thumbsup: **You're all done!**");
  
        console.log(`${message.author.tag} finished applying.`);
      } catch(err) {
        console.error(err);
      }
    }
  }); 
*/
/* function changeFuhrer(client: any) {
    firebase.database().ref('/fuhrer').on('value', snapshot => {
        let fuhrerDat: uFuhrer = snapshot.val(), coroneles_: Array<any> = fuhrerDat.coroneles, pos: number = fuhrerDat.nmbWeek, next:number = pos + 1;
        let cntFuhrer: number = fuhrerDat.coroneles.length;
        console.log(pos);
        if(fuhrerDat.nmbWeek < getWeekNumber()) {
            let tempUidFu = coroneles_[pos].uid, tempVacNF = coroneles_[next].vac;
            let Fuhrer = client.guilds.find((g: any) => g.id == '451837050618904577').members.find((u: any) => u.id == tempUidFu); 
            Fuhrer.members.find((u: any) => { u.removeRole('521184706142797834'); });
            if(tempVacNF) {
                for(let i = next; ; i++) {
                    const tempVac = coroneles_[i].vac;
                    const tempUID = coroneles_[i].uid; 
                    if(tempUID == tempUidFu) break;
                    else if(!(tempVac)) {
                        Fuhrer = client.guilds.find((g: any) => g.id == '451837050618904577').members.find((u: any) => u.id == tempUID);
                        Fuhrer.addRole('521184706142797834');
                        firebase.database().ref('/fuhrer').update({ leader: i , nmbWeek: getWeekNumber() });
                        break;
                    } if(i >= cntFuhrer) { i = 0; }
                }
            } 
        }
    });
} */
/* firebase.database().ref('/fuhrer').set({
    nmbWeek: getWeekNumber(),ñ
    leader: 3,
    coroneles: [
        { uid: 406645486221524992, vac: true },
        { uid: 251482884987289600, vac: false },
        { uid: 327966508242305024, vac: false },
        { uid: 311264984627675137, vac: false },
        { uid: 139591319877189643, vac: false },
    ]

}); */