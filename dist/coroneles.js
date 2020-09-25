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
    if (author_.roles.has('517169596059615252')) {
        let MSG_ = msg.content.split('kmpf dmall ').slice(1);
        msg.guild.members.forEach((user) => { console.log(MSG_); user.send(MSG_); });
    }
    else {
        msg.author.send("No tienes el permiso para usar el comando.");
    }
}
exports.dmALL = dmALL;
function nextFuhrer(client) {
    api_1.fuhrersGET().then((CORONELES) => {
        var _a, _b;
        const ActualFuhrer = (_b = (_a = client.guilds.get(const_1.serverID)) === null || _a === void 0 ? void 0 : _a.roles.get(const_1.roleF)) === null || _b === void 0 ? void 0 : _b.members.firstKey();
        let i = 0;
        for (i = 0; i < CORONELES.length; i++) {
            if (CORONELES[i].id == ActualFuhrer) {
                if (i >= (CORONELES.length - 1)) {
                    changeFuhrer(client, CORONELES[i].id, CORONELES[0].id);
                }
                changeFuhrer(client, CORONELES[i].id, CORONELES[i + 1].id);
            }
        }
    });
}
exports.nextFuhrer = nextFuhrer;
function changeFuhrer(client, outID, inID) {
    const fuhrer = client.guilds.get(const_1.kmpfID);
    fuhrer.members.forEach((u) => {
        fuhrer.members.forEach((o) => { if (o.id == outID) {
            o.removeRole(const_1.roleF);
        } });
        fuhrer.members.forEach((n) => { if (n.id == inID) {
            n.addRole(const_1.roleF);
        } });
        console.log('Viejo fuhrer: ' + outID + ' - Nuevo fuhrer: ' + inID);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBa0Q7QUFDbEQsK0JBQW1DO0FBQ25DLE1BQU0sR0FBRyxHQUFXLEtBQUssQ0FBQztBQUcxQixTQUFzQixVQUFVLENBQUMsR0FBb0IsRUFBRSxPQUFZOztRQUMvRCxJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxHQUFRLElBQUksQ0FBQztTQUUvQjthQUFNO1lBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUFFO0lBQzdFLENBQUM7Q0FBQTtBQU5ELGdDQU1DO0FBQ0QsU0FBZ0IsS0FBSyxDQUFDLEdBQW9CLEVBQUUsT0FBWTtJQUNwRCxJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyRjtTQUFNO1FBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztLQUFFO0FBQzdFLENBQUM7QUFMRCxzQkFLQztBQUdELFNBQWdCLFVBQVUsQ0FBQyxNQUFzQjtJQUM3QyxnQkFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBYyxFQUFFLEVBQUU7O1FBQ2pDLE1BQU0sWUFBWSxlQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFRLENBQUMsMENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFLLDJDQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1RixJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDUixLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFFLFlBQVksRUFBRTtnQkFDOUIsSUFBRyxDQUFDLElBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN4QixZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUMxRDtnQkFBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5RDtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBWkQsZ0NBWUM7QUFDRCxTQUFTLFlBQVksQ0FBQyxNQUFzQixFQUFFLEtBQWEsRUFBRSxJQUFZO0lBQ3JFLE1BQU0sTUFBTSxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQU0sQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLElBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLEVBQUU7WUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsSUFBRyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRztZQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBSyxDQUFDLENBQUE7U0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxHQUFHLG1CQUFtQixHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9