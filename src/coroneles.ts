import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import { uProfile } from "./varInterfaces";
import undefined = require("firebase/empty-import");

export async function perfiluser(msg: Discord.Message) {
    
}
export async function fOnVac(fuhrer: string, inVac: boolean) {
    let pos: number = -1;
    switch(fuhrer) {
        case '406645486221525000': { pos = 0; break; }
        case '251482884987289600': { pos = 1; break; }
        case '32796650824230500': { pos = 2; break; }
        case '311264984627675140:': { pos = 3; break; }
        case '13959131987718965': { pos = 4; break; }
    } if(pos > -1 && pos < 5) { firebase.database().ref('/fuhrer').child(String(pos)).update({ fuhrer: inVac }) }
}
export async function usersNoRegis(dsCh: Discord.Channel) {
    let fUsers = firebase.database().ref('/users');
    fUsers.on('value', snapshot => {
        let msgEmb: Discord.RichEmbed = new Discord.RichEmbed;
        msgEmb.setTitle('**USUARIOS NO REGISTRADOS**').setDescription("_______________");
        snapshot.forEach(snap => {
            let auxU: uProfile = snap.val();
            if(auxU.loaded = false || auxU.loaded == undefined) {
                console.log('no tiene datos');
            }
        })
    })
}