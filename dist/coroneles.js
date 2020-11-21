"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextFuhrer = exports.dmALL = exports.perfiluser = void 0;
const const_1 = require("./const");
const api_1 = require("./api");
const min = 60000;
function perfiluser(msg, author_) {
    return __awaiter(this, void 0, void 0, function* () {
        if (author_.roles.has('517168972483919929')) {
            let MSG_ = msg.content.split('kmpf perfil ').slice(0);
            let profileUser = null;
        }
        else {
            msg.author.send("no tienes el permiso para usar el comando.");
        }
    });
}
exports.perfiluser = perfiluser;
function dmALL(msg, author_) {
    var _a;
    if (author_.roles.has('517169596059615252')) {
        let MSG_ = msg.content.split('kmpf dmall ').slice(1);
        (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.members.cache.each((user) => { console.log(MSG_); user.send(MSG_); });
    }
    else {
        msg.author.send("No tienes el permiso para usar el comando.");
    }
}
exports.dmALL = dmALL;
function nextFuhrer(client) {
    api_1.fuhrersGET().then((CORONELES) => {
        const_1.getServer(const_1.serverID).then((G) => {
            G.roles.fetch(const_1.roleF).then((R) => {
                let i = 0;
                for (i = 0; i < CORONELES.length; i++) {
                    if (CORONELES[i].id == R.members.firstKey()) {
                        if (i >= (CORONELES.length - 1)) {
                            changeFuhrer(client, CORONELES[i].id, CORONELES[0].id);
                        }
                        changeFuhrer(client, CORONELES[i].id, CORONELES[i + 1].id);
                    }
                }
            });
        });
    });
}
exports.nextFuhrer = nextFuhrer;
function changeFuhrer(client, outID, inID) {
    const fuhrer = client.guilds.fetch(const_1.kmpfID);
    fuhrer.members.forEach((u) => {
        fuhrer.members.forEach((o) => { if (o.id == outID) {
            o.removeRole(const_1.roleF);
        } });
        fuhrer.members.forEach((n) => { if (n.id == inID) {
            n.addRole(const_1.roleF);
        } });
        console.log('Viejo fuhrer: ' + outID + ' - Nuevo fuhrer: ' + inID);
        const_1.getTChannel('620642948660330506').then((ch) => {
            ch.send('Führer __SALIENTE__: <@' + outID + '> - __ENTRANTE__: <@' + inID + '>');
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBd0Y7QUFDeEYsK0JBQW1DO0FBQ25DLE1BQU0sR0FBRyxHQUFXLEtBQUssQ0FBQztBQUcxQixTQUFzQixVQUFVLENBQUMsR0FBb0IsRUFBRSxPQUFZOztRQUMvRCxJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxHQUFRLElBQUksQ0FBQztTQUUvQjthQUFNO1lBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUFFO0lBQzdFLENBQUM7Q0FBQTtBQU5ELGdDQU1DO0FBQ0QsU0FBZ0IsS0FBSyxDQUFDLEdBQW9CLEVBQUUsT0FBWTs7SUFDcEQsSUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ3hDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBeUIsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7S0FDekc7U0FBTTtRQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7S0FBRTtBQUM3RSxDQUFDO0FBTEQsc0JBS0M7QUFHRCxTQUFnQixVQUFVLENBQUMsTUFBc0I7SUFDN0MsZ0JBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFO1FBQ2pDLGlCQUFTLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQWdCLEVBQUUsRUFBRTtZQUMxQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFtQixFQUFFLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDUixLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLElBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUN0QyxJQUFHLENBQUMsSUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ3hCLFlBQVksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7eUJBQzFEO3dCQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUM5RDtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFmRCxnQ0FlQztBQUNELFNBQVMsWUFBWSxDQUFDLE1BQXNCLEVBQUUsS0FBYSxFQUFFLElBQVk7SUFDckUsTUFBTSxNQUFNLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBTSxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsSUFBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssRUFBRTtZQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLENBQUM7U0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxJQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFHO1lBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFLLENBQUMsQ0FBQTtTQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLEdBQUcsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkUsbUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFO1lBQy9DLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxHQUFHLHNCQUFzQixHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9