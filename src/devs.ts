//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
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
//#endregion
//#endregion 