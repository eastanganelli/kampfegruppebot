import * as firebase from "firebase/app";
import { uProfile, lProfile } from "./varInterfaces";
import "firebase/database";

const questions: Array<{ txt: string; react: boolean }> = [                    // ------------------------------------
    { txt: "Como te llamas?", react: false },                  //
    { txt: "Cuando es tu Cumple:cake::cake:? **AÑO MES DIA ie: _31/05/2018_**", react: false },                  // Define the questions you'd like the application to have in this array.
];  
const applying: any = [];
let uDat: lProfile = {
	uid: '-',
	userDat: {
		nombre: '-',
		birth: 0,
		steam: '-',
		origin: '-',
		uplay: '-',
		connect: {
			joinAt: 0,
			lastAdv: -1,
			lastCon: -1
		}
	}
};

export async function CargarPerfil(user: any, reaction: any) { 
	firebase.database().ref('/Users/').child(user.id).on('value', snapshot => { 
		let uDat: any = snapshot.val();
		if(!(snapshot.exists())) { cargarProfile(reaction, user); }
		else if(snapshot.exists() && uDat.nombre == '-' || uDat.birth == 0) { cargarProfile(reaction, user); }
	}, (Err: any) => { console.log(Err) }); 
}
async function saveData(data: string, idQ: number, raction_: any, user: any) {
	const guildMember = raction_.message.guild.members.get(user.id);
    switch(idQ) {
        case 0: { uDat.userDat.nombre = data; break; }
        case 1: { uDat.userDat.birth  = data; break; }
        case 2: { 
			if(isNewMem(guildMember,raction_.message.guild))        { if(!isoldMem(guildMember, raction_.guild)) { guildMember.addRole(raction_.message.guild.roles.get('521709396863090698')); } } 
			else if (!isNewMem(guildMember,raction_.message.guild)) { if(!isoldMem(guildMember, raction_.guild)) { guildMember.addRole(raction_.message.guild.roles.get('533069497561513994')); } }
			break;
		}
    }
}
async function cargarProfile(reaction: any, user: any) {
	if (applying.includes(user.id)) return; 
	try {
		let cancel: boolean = false
		console.log(`${user.tag} began applying.`);
		applying.push(user.id);
		await user.sendMessage(":pencil: **Comencemos!** Escribe `#cancelar` para salir."); //**Application started!** Type `#cancel` to exit.
		for (let i = 0; i < questions.length && cancel === false; i++) {
		await user.sendMessage(questions[i].txt);
		await user.dmChannel.awaitMessages((m: any) => m.author.id === user.id, { max: 1, time: 300000, errors: ["time"] })
			.then((collected: any) => {
				if (collected.first().content.toLowerCase() === "#cancelar") { //#cancel
					user.sendMessage(":x: **Carga cancelada!**"); //Application cancelled.
					applying.splice(applying.indexOf(user.id), 1);
					cancel = true;
					console.log(`${user.tag} cancelled their application.`);
				} else { console.log(collected.first().content); saveData(collected.first().content, i, reaction, user); }
			}).catch(() => {
				user.sendMessage(":hourglass: **Se termino el tiempo.**"); //Application timed out.
				applying.splice(applying.indexOf(user.id), 1);
				cancel = true;
				console.log(`${user.tag} let their application time out.`);
			});
		}
		if(!cancel) { firebase.database().ref('/users/').child(user.id).set(uDat.userDat); }
		await user.sendMessage(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**"); //You're all done!
		console.log(`${user.tag} finished applying.`);
	} catch(err) { console.error(err); }
 	console.log(uDat);
}
function isNewMem(guildMember: any, guild: any) {
	const game_ = ['BF4', 'BF1', 'BFV'];
	for(let i = 0; i < game_.length; i++) {
		if(guildMember.roles.has(guild.roles.find('name', game_[i])).id) { return true; }
	} return false;
}
function isoldMem(guildMember: any, guild: any) {
	const roles = ['Coronel', 'Teniente', 'Subteniente', 'Cabo primero', 'Soldado raso', 'candidato', 'Invitados (sin representar)'];
	for(let i = 0; i < roles.length; i++) {
		if(guildMember.roles.has(guild.roles.find((r: any) => r.name === roles[i]).id)) return true;
	} return true;
}
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