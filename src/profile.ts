import * as firebase from "firebase/app";
import { lProfile } from "./varInterfaces";
import { sinRango } from "./roles";
import "firebase/database";
import { escribirUsuario } from "./users";

const questions: Array<{ txt: string; react: boolean }> = [                    // ------------------------------------
    { txt: "Nombre **ie: _Pedro_**", react: false },                  //
    { txt: "Cumpleños :cake::cake:? **AÑO MES DIA ie: _31/5/2018_**", react: false },                  // Define the questions you'd like the application to have in this array.
	{ txt: "Nro Celular :iphone::iphone: **ES PARA WHATSAPP ie: _+54 011 31454151_**", react: false },
	{ txt: "Ingresar _#war_ si tiene **Battlefield, Warthunder, GTAV** o _#otros_ si no tiene alguno de los anteriormente mencionados", react: true }
];  
let questionsFiltered: Array<{ txt: string; react: boolean }> = new Array(0);
const applying: any = [];
let uDat: lProfile = {
	uid: '-',
	userDat: {
		loaded: false,
		nombre: '',
		birth: new Date(0),
		phone: '',
		steam: '',
		origin: '',
		uplay: '',
		connect: {
			joinAt: new Date(0),
			lastAdv: new Date(0),
			laston: new Date(0)
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
async function cargarProfile(reaction: any, user: any) {
	const guildMember = reaction.message.guild.members.get(user.id);
	if (applying.includes(user.id)) return; 
	for(let i = 0; i < 3; i++) { questionsFiltered.push(questions[i]); }
	if(!sinRango(guildMember)) { questionsFiltered.push(questions[3]); }
	try {
		let cancel: boolean = false, isMeming: boolean = false;
		console.log(`${user.tag} began applying.`);
		applying.push(user.id);
		await user.sendMessage(":pencil: **Comencemos!** Escribe `#cancelar` para salir."); //**Application started!** Type `#cancel` to exit.
		for (let i = 0; i < questionsFiltered.length && cancel === false && !isMeming; i++) {
			await user.sendMessage(questionsFiltered[i].txt);
			await user.dmChannel.awaitMessages((m: any) => m.author.id === user.id, { max: 1, time: 300000, errors: ["time"] })
				.then((collected: any) => {
					if (collected.first().content.toLowerCase() === "#cancelar") { //#cancel
						user.sendMessage(":x: **Carga cancelada!**"); //Application cancelled.
						applying.splice(applying.indexOf(user.id), 1);
						cancel = true;
						escribirUsuario(uDat);
						console.log(`${user.tag} cancelled their application.`);
					} else {
						saveData(collected.first().content, i, reaction, user);
						//console.log(collected.first().content);
					}
				}).catch(() => {
					user.sendMessage(":hourglass: **Se termino el tiempo.**"); //Application timed out.
					applying.splice(applying.indexOf(user.id), 1);
					cancel = true;
					console.log(`${user.tag} let their application time out.`);
				});
		}
		if(!cancel) { uDat.userDat.loaded = true; uDat.uid = user.id; escribirUsuario(uDat); }
		await user.sendMessage(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**"); //You're all done!
		console.log(`${user.tag} finished applying.`);
	} catch(err) { console.error(err); }
	questionsFiltered = new Array(0);
 	console.log(uDat);
}
async function saveData(data: any, idQ: number, reaction: any, user: any) {
	const guildMember = reaction.message.guild.members.get(user.id);
    switch(idQ) {
        case 0: { uDat.userDat.nombre = data; break; }
		case 1: { 
			const fecha = data.split('/');
			uDat.userDat.birth  = new Date(fecha[2] + '/' + fecha[1] + '/' + fecha[0]);
			uDat.userDat.connect.joinAt = guildMember.joinedAt;
			break; 
		}
		case 2: { uDat.userDat.phone  = data; break; }
		case 3: {
			if(data.toLowerCase() === "#war") {
				guildMember.addRole('521709396863090698');
			} else if(data.toLowerCase() === "#otros") {
				guildMember.addRole('533069497561513994');
			}
			break;
		}
	}
}