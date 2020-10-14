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
exports.fuhrerGET = exports.fuhrersGET = exports.userDELETE = exports.decpointsPUT = exports.incpointsPUT = exports.lastconPUT = exports.birthPUT = exports.userPOST = exports.userGET = exports.usersGET = exports.redlightsGET = exports.birthsGET = void 0;
const axios_1 = require("axios");
const localhost = 'http://localhost:8000/api/v1/';
const webhost = 'http://pofbatto.heliohost.org/api/v1/';
const apiClient = axios_1.default.create({
    baseURL: webhost,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 20000
});
function birthsGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.get('birthlist')).data;
    });
}
exports.birthsGET = birthsGET;
function redlightsGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.get('redlist')).data;
    });
}
exports.redlightsGET = redlightsGET;
function usersGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.get('users')).data;
    });
}
exports.usersGET = usersGET;
function userGET(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.get('user/' + id)).data;
    });
}
exports.userGET = userGET;
function userPOST(data_) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.post('user', data_)).request;
    });
}
exports.userPOST = userPOST;
function birthPUT(id, data_) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = apiClient.put('users/' + id.toString(), data_);
        console.log(response);
    });
}
exports.birthPUT = birthPUT;
function lastconPUT(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.put('userlaston/' + id)).request;
    });
}
exports.lastconPUT = lastconPUT;
function incpointsPUT(id, data_) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.put('useruppts/' + id, data_)).request;
    });
}
exports.incpointsPUT = incpointsPUT;
function decpointsPUT(id, data_) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.put('userdopts/' + id, data_)).request;
    });
}
exports.decpointsPUT = decpointsPUT;
function userDELETE(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.delete('userdopts/' + id)).request;
    });
}
exports.userDELETE = userDELETE;
function fuhrersGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.get('fuhrers')).data;
    });
}
exports.fuhrersGET = fuhrersGET;
function fuhrerGET(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield apiClient.get('fuhrer/' + id)).data;
    });
}
exports.fuhrerGET = fuhrerGET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMEI7QUFDWixNQUFNLFNBQVMsR0FBUSwrQkFBK0IsQ0FBQztBQUN2RCxNQUFNLE9BQU8sR0FBVSx1Q0FBdUMsQ0FBQztBQUU3RSxNQUFNLFNBQVMsR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNCLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLFlBQVksRUFBRSxNQUFNO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxrQkFBa0I7S0FDbkM7SUFDRCxPQUFPLEVBQUUsS0FBSztDQUNmLENBQUMsQ0FBQztBQUdELFNBQXNCLFNBQVM7O1FBQzNCLE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbkQsQ0FBQztDQUFBO0FBRkQsOEJBRUM7QUFDRCxTQUFzQixZQUFZOztRQUM5QixPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pELENBQUM7Q0FBQTtBQUZELG9DQUVDO0FBS0QsU0FBc0IsUUFBUTs7UUFDMUIsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMvQyxDQUFDO0NBQUE7QUFGRCw0QkFFQztBQUNELFNBQXNCLE9BQU8sQ0FBQyxFQUFPOztRQUNqQyxPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsRCxDQUFDO0NBQUE7QUFGRCwwQkFFQztBQUdMLFNBQXNCLFFBQVEsQ0FBQyxLQUFtQjs7UUFDOUMsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBZSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDdkUsQ0FBQztDQUFBO0FBRkQsNEJBRUM7QUFHRyxTQUFzQixRQUFRLENBQUMsRUFBVSxFQUFFLEtBQTJCOztRQUNsRSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUF1QixRQUFRLEdBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUFBO0FBSEQsNEJBR0M7QUFDRCxTQUFzQixVQUFVLENBQUMsRUFBVTs7UUFDdkMsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDM0QsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFDRCxTQUFzQixZQUFZLENBQUMsRUFBVSxFQUFFLEtBQTBCOztRQUNyRSxPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFzQixZQUFZLEdBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3RGLENBQUM7Q0FBQTtBQUZELG9DQUVDO0FBQ0QsU0FBc0IsWUFBWSxDQUFDLEVBQVUsRUFBRSxLQUEwQjs7UUFDckUsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBc0IsWUFBWSxHQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN0RixDQUFDO0NBQUE7QUFGRCxvQ0FFQztBQUdMLFNBQXNCLFVBQVUsQ0FBQyxFQUFVOztRQUN2QyxPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM3RCxDQUFDO0NBQUE7QUFGRCxnQ0FFQztBQUtHLFNBQXNCLFVBQVU7O1FBQzVCLE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakQsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFDRCxTQUFzQixTQUFTLENBQUMsRUFBVTs7UUFDdEMsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztDQUFBO0FBRkQsOEJBRUMifQ==