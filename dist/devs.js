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
exports.resetBOT = exports.offBOT = void 0;
require("firebase/database");
const config_1 = require("./config");
function offBOT(author, channel) {
    if (author.roles.has('517168972483919929') && channel.id === '611502712571559950') {
        const auxClient = channel.client;
        channel.send('Shutdown...').then((msg) => __awaiter(this, void 0, void 0, function* () { yield auxClient.destroy(); yield msg.delete(10000); }));
    }
}
exports.offBOT = offBOT;
function resetBOT(author, channel) {
    if (author.roles.has('517168972483919929') && channel.id === '611502712571559950') {
        const auxClient = channel.client;
        channel.send('Reset...').then((msg) => auxClient.destroy()).then((msg2) => { auxClient.login(config_1.config.token); msg2.delete(); });
    }
}
exports.resetBOT = resetBOT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLDZCQUEyQjtBQUczQixxQ0FBa0M7QUFLbEMsU0FBZ0IsTUFBTSxDQUFDLE1BQVcsRUFBRSxPQUFZO0lBQzVDLElBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLG9CQUFvQixFQUFFO1FBQzlFLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxHQUFRLEVBQUUsRUFBRSxnREFBRyxNQUFNLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUM7S0FDakg7QUFDTCxDQUFDO0FBTEQsd0JBS0M7QUFDRCxTQUFnQixRQUFRLENBQUMsTUFBVyxFQUFFLE9BQVk7SUFDOUMsSUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7UUFDOUUsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVJO0FBQ0wsQ0FBQztBQUxELDRCQUtDIn0=