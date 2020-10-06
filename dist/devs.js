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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLHFDQUFrQztBQUtsQyxTQUFnQixNQUFNLENBQUMsTUFBVyxFQUFFLE9BQVk7SUFDNUMsSUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7UUFDOUUsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLEdBQVEsRUFBRSxFQUFFLGdEQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUNqSDtBQUNMLENBQUM7QUFMRCx3QkFLQztBQUNELFNBQWdCLFFBQVEsQ0FBQyxNQUFXLEVBQUUsT0FBWTtJQUM5QyxJQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsRUFBRTtRQUM5RSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUk7QUFDTCxDQUFDO0FBTEQsNEJBS0MifQ==