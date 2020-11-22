//#region IMPORTS
import * as Discord from "discord.js";
//#endregion

//#region Vars
	const questions: Array<{ txt: string; react: boolean }> = [                    							// ------------------------------------
		{ txt: "Nombre **ie: _Pedro_**", react: false },                  									//
		{ txt: "Cumpleños :cake::cake:? **AÑO MES DIA ie: _31/5/2018_**", react: false },                   // Define the questions you'd like the application to have in this array.
		{ txt: "Nro Celular :iphone::iphone: **ES PARA WHATSAPP ie: _+54 011 31454151_**", react: false }
	];  
	/* let questionsFiltered: Array<{ txt: string; react: boolean }> = new Array(0); */
	const applying: any = [];
	let uDat: any = {
		uid: '-',
		userDat: {
			birth: new Date(0),
			points: 0,
			connect: {
				joinAt: new Date(0),
				laston: new Date(0)
			}
		}
	};
//#endregion
async function cargarProfile(reaction: any, user: any) {
	const guildMember: Discord.GuildMember = reaction.message.guild?.member(user.id);
	if (applying.includes(user.id)) return; 
	/* if(!sinRango(guildMember)) { questionsFiltered.push(questions[3]); } */
	try {
		let cancel: boolean = false;
		//console.log(`${user.tag} began applying.`);
		applying.push(user.id);
		await user.send(":pencil: **Comencemos!** Escribe `#cancelar` para salir."); //**Application started!** Type `#cancel` to exit.
		for (let i = 0; i < questions.length && cancel === false; i++) {
			await user.send(questions[i].txt);
			await user.dmChannel?.awaitMessages((m: any) => m.author.id === user.id, { max: 1, time: 300000, errors: ["time"] })
				.then((collected: any) => {
					if (collected.first().content.toLowerCase() === "#cancelar") { //#cancel
						user.send(":x: **Carga cancelada!**"); //Application cancelled.
						applying.splice(applying.indexOf(user.id), 1);
						cancel = true;
						//escribirUsuario(uDat);
						//console.log(`${user.tag} cancelled their application.`);
					} else {
						saveData(collected.first().content, i, reaction, user);
						//console.log(collected.first().content);
					}
				}).catch(() => {
					user.send(":hourglass: **Se termino el tiempo.**"); //Application timed out.
					applying.splice(applying.indexOf(user.id), 1);
					cancel = true;
					//console.log(`${user.tag} let their application time out.`);
				});
		}
		if(!cancel) { uDat.userDat.loaded = true; uDat.uid = user.id; /*escribirUsuario(uDat);*/ }
		await user.send(":thumbsup: **Hemos Terminado,\nSaludos KMPF!**").then(() => {  guildMember.roles.add('521709396863090698'); }); //You're all done!
		//console.log(`${user.tag} finished applying.`);
	} catch(err) { console.error(err); }
 	//console.log(uDat);
}
async function saveData(data: any, idQ: number, reaction: any, user: any) {
	const guildMember = reaction.message.guild?.members.fetch(user.id);
    switch(idQ) {
        case 0: { uDat.userDat.nombre = data; break; }
		case 1: { 
			const fecha = data.split('/');
			uDat.userDat.birth  = fecha[2] + '/' + fecha[1] + '/2000'/* + fecha[0] */;
			uDat.userDat.connect.joinAt = guildMember.joinedAt;
			break; 
		} case 2: { uDat.userDat.phone  = String(data); break; }
	}
}