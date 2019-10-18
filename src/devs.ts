//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase from 'firebase/app';
import "firebase/database";
//#endregion
//#region KMPF
import { config } from "./config";
//#endregion
//#endregion

//#region KMPF CMD
export function offBOT(author: any, channel: any) {
    if(author.roles.has('517168972483919929') && channel.id === '611502712571559950') {
        const auxClient = channel.client;
        channel.send('Shutdown...').then(async (msg: any) => { await auxClient.destroy(); await msg.delete(10000); });
    }
}
export function resetBOT(author: any, channel: any) {
    if(author.roles.has('517168972483919929') && channel.id === '611502712571559950') {
        const auxClient = channel.client;
        channel.send('Reset...').then((msg: any) => auxClient.destroy() ).then((msg2: any) => { auxClient.login(config.token); msg2.delete(); });
    }
}
//#region  BOT STATE
export function BOTstate(client: Discord.Client) {
    const fbDB = firebase.database().ref('/bot');
    fbDB.once('value', snapshot => {
        //console.log(snapshot.val().state);
        let state_: any = new String;
        switch(snapshot.val().state){
            case '0': { state_ = { status: 'dnd',    game: { name: 'MODO DESARROLLO' } };      break; }
            case '1': { state_ = { status: 'online', game: { name: 'kmpf help para ayuda' } }; break; }
        } client.user.setPresence(state_);
    })
}
export function changeSTATE(author: any, msg: any) {
    const fbDB = firebase.database().ref('/bot');
    const STATE_: string = (msg.content.split(' '))[2];
    console.log('BOT STATE: ' + STATE_);
    if((author.roles.has('517168972483919929') || author.roles.has('613554375062847501')) && msg.channel.id === '611502712571559950') {
        fbDB.set({ state: STATE_ });
        BOTstate(msg.channel.client);
    }
}
//#endregion
//#endregion 