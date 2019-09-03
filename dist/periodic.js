"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase/app");
require("firebase/auth");
const Discord = require("discord.js");
const MSG_ = require("./textos");
function FnPeriodic(client) {
    return __awaiter(this, void 0, void 0, function* () {
        loadKMPFCMD(client);
        yield firebase.auth().signInWithEmailAndPassword('kmpf@discordbot.com', String(Math.abs((Number(client.user.id)) * (Number(client.guilds.find((g_) => g_.name == 'KMPF').id))))).then(() => { console.log('BOT DB Connected'); }).catch(Err => { console.log(Err); });
        client.user.setPresence({ status: 'online', game: { name: 'kmpf help para ayuda' } });
        changeFuhrer(client);
    });
}
exports.FnPeriodic = FnPeriodic;
function loadKMPFCMD(client) {
    return __awaiter(this, void 0, void 0, function* () {
        client.channels.get('614258469066768424').fetchMessages({ limit: 2 }).then((messages) => {
            messages.forEach((msg) => {
                msg.delete();
            });
            let lastMessage = messages.first();
        }).catch(console.error);
        for (let t_ of MSG_.kmpfMSG.kmpfcmd) {
            let embedMSG = new Discord.RichEmbed().setTitle(t_.titulo).setDescription(t_.desc), emojiArr = new Array(0);
            for (let d_ of t_.data) {
                embedMSG.addField(d_.texto, d_.desc, true);
                emojiArr.push(d_.emoji);
            }
            client.channels.get('614258469066768424').send(embedMSG).then((sendEmbed) => { if (emojiArr.length > 0) {
                for (let e_ of emojiArr) {
                    sendEmbed.react(e_);
                }
            } });
        }
        let embedMSG = new Discord.RichEmbed().setTitle('_**JUEGOS**_'), emojiArr = new Array(0);
        for (let d_ of MSG_.juegos) {
            embedMSG.addField(client.emojis.get(d_.EID) + ' ➽' + d_.nombre, '', true);
            emojiArr.push(d_.EID);
        }
        client.channels.get('614258469066768424').send(embedMSG).then((sendEmbed) => { if (emojiArr.length > 0) {
            for (let e_ of emojiArr) {
                sendEmbed.react(e_);
            }
        } });
    });
}
function changeFuhrer(client) {
    firebase.database().ref('/NowLD').on('value', Users => {
        Users.forEach(User => {
            const role_ = client.guilds.find((g) => g.id == '451837050618904577').roles.find((role) => role.id === "521184706142797834");
            const guildMem = client.guilds.find((g) => g.id == '451837050618904577').members.find((u) => u.id == User.key);
            role_.members.find((u) => {
                if ((User.val()).nWeek == getWeekNumber() && User.key != u.id) {
                    guildMem.addRole(role_);
                    u.removeRole(role_);
                    firebase.database().ref('/NowLD/' + User.key).update({ nWeek: (getWeekNumber() + 3) });
                }
            });
        });
    });
}
function getWeekNumber() {
    let d = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyaW9kaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGVyaW9kaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlDQUF5QztBQUN6Qyx5QkFBdUI7QUFDdkIsc0NBQXNDO0FBQ3RDLGlDQUFpQztBQUVqQyxTQUFzQixVQUFVLENBQUMsTUFBVzs7UUFDeEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLDBCQUEwQixDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeFEsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUFBO0FBTEQsZ0NBS0M7QUFDRCxTQUFlLFdBQVcsQ0FBQyxNQUFXOztRQUNsQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ3pGLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFRLEVBQUcsRUFBRTtnQkFDM0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBR25DLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsS0FBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNoQyxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxHQUFlLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hILEtBQUksSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtnQkFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUFFO1lBQy9GLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFLEdBQUcsSUFBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFBRSxLQUFJLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtvQkFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUFFO2FBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2SztRQUdELElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxRQUFRLEdBQWUsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckcsS0FBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBRTtRQUNoSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRSxHQUFHLElBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFBRSxLQUFJLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQUU7U0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVLLENBQUM7Q0FBQTtBQUNELFNBQVMsWUFBWSxDQUFDLE1BQVc7SUFDN0IsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ2xELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsTUFBTSxLQUFLLEdBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksb0JBQW9CLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLG9CQUFvQixDQUFDLENBQUM7WUFDMUksTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6SCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO2dCQUMxQixJQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLGFBQWEsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDMUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNoSDtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLGFBQWE7SUFDbEIsSUFBSSxDQUFDLEdBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkcsSUFBSSxNQUFNLEdBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDMUMsSUFBSSxTQUFTLEdBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMxRCxDQUFDIn0=