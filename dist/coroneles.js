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
const Discord = require("discord.js");
const firebase = require("firebase/app");
const undefined = require("firebase/empty-import");
function perfiluser(msg) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.perfiluser = perfiluser;
function fOnVac(fuhrer, inVac) {
    return __awaiter(this, void 0, void 0, function* () {
        let pos = -1;
        switch (fuhrer) {
            case '406645486221525000': {
                pos = 0;
                break;
            }
            case '251482884987289600': {
                pos = 1;
                break;
            }
            case '32796650824230500': {
                pos = 2;
                break;
            }
            case '311264984627675140:': {
                pos = 3;
                break;
            }
            case '13959131987718965': {
                pos = 4;
                break;
            }
        }
        if (pos > -1 && pos < 5) {
            firebase.database().ref('/fuhrer').child(String(pos)).update({ fuhrer: inVac });
        }
    });
}
exports.fOnVac = fOnVac;
function usersNoRegis(dsCh) {
    return __awaiter(this, void 0, void 0, function* () {
        let fUsers = firebase.database().ref('/users');
        fUsers.on('value', snapshot => {
            let msgEmb = new Discord.RichEmbed;
            msgEmb.setTitle('**USUARIOS NO REGISTRADOS**').setDescription("_______________");
            snapshot.forEach(snap => {
                let auxU = snap.val();
                if (auxU.loaded = false || auxU.loaded == undefined) {
                    console.log('no tiene datos');
                }
            });
        });
    });
}
exports.usersNoRegis = usersNoRegis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb25lbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nvcm9uZWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx5Q0FBMkM7QUFFM0MsbURBQW9EO0FBRXBELFNBQXNCLFVBQVUsQ0FBQyxHQUFvQjs7SUFFckQsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFDRCxTQUFzQixNQUFNLENBQUMsTUFBYyxFQUFFLEtBQWM7O1FBQ3ZELElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFFBQU8sTUFBTSxFQUFFO1lBQ1gsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQzlDLEtBQUssb0JBQW9CLENBQUMsQ0FBQztnQkFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtZQUM5QyxLQUFLLG1CQUFtQixDQUFDLENBQUM7Z0JBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFBQyxNQUFNO2FBQUU7WUFDN0MsS0FBSyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTthQUFFO1lBQy9DLEtBQUssbUJBQW1CLENBQUMsQ0FBQztnQkFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE1BQU07YUFBRTtTQUNoRDtRQUFDLElBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUFFO0lBQ2pILENBQUM7Q0FBQTtBQVRELHdCQVNDO0FBQ0QsU0FBc0IsWUFBWSxDQUFDLElBQXFCOztRQUNwRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLElBQUksTUFBTSxHQUFzQixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDdEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pGLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksSUFBSSxHQUFhLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTtvQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUNqQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQUE7QUFaRCxvQ0FZQyJ9