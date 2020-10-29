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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMEI7QUFFUixNQUFNLFNBQVMsR0FBUSwrQkFBK0IsQ0FBQztBQUN2RCxNQUFNLE9BQU8sR0FBVSx1Q0FBdUMsQ0FBQztBQUM3RSxNQUFNLFNBQVMsR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNCLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLFlBQVksRUFBRSxNQUFNO0lBQ3BCLE9BQU8sRUFBRTtRQUNULGNBQWMsRUFBRSxrQkFBa0I7S0FDakM7SUFDRCxPQUFPLEVBQUUsS0FBSztDQUNqQixDQUFDLENBQUM7QUFJSCxTQUFzQixTQUFTOztRQUMzQixPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25ELENBQUM7Q0FBQTtBQUZELDhCQUVDO0FBQ0QsU0FBc0IsWUFBWTs7UUFDOUIsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRCxDQUFDO0NBQUE7QUFGRCxvQ0FFQztBQUtELFNBQXNCLFFBQVE7O1FBQzFCLE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0MsQ0FBQztDQUFBO0FBRkQsNEJBRUM7QUFDRCxTQUFzQixPQUFPLENBQUMsRUFBTzs7UUFDakMsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztDQUFBO0FBRkQsMEJBRUM7QUFHTCxTQUFzQixRQUFRLENBQUMsS0FBbUI7O1FBQzlDLE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQWUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3ZFLENBQUM7Q0FBQTtBQUZELDRCQUVDO0FBR0csU0FBc0IsUUFBUSxDQUFDLEVBQVUsRUFBRSxLQUEyQjs7UUFDbEUsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBdUIsUUFBUSxHQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FBQTtBQUhELDRCQUdDO0FBQ0QsU0FBc0IsVUFBVSxDQUFDLEVBQVU7O1FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzNELENBQUM7Q0FBQTtBQUZELGdDQUVDO0FBQ0QsU0FBc0IsWUFBWSxDQUFDLEVBQVUsRUFBRSxLQUEwQjs7UUFDckUsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBc0IsWUFBWSxHQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN0RixDQUFDO0NBQUE7QUFGRCxvQ0FFQztBQUNELFNBQXNCLFlBQVksQ0FBQyxFQUFVLEVBQUUsS0FBMEI7O1FBQ3JFLE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQXNCLFlBQVksR0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDdEYsQ0FBQztDQUFBO0FBRkQsb0NBRUM7QUFHTCxTQUFzQixVQUFVLENBQUMsRUFBVTs7UUFDdkMsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDN0QsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFLRyxTQUFzQixVQUFVOztRQUM1QixPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pELENBQUM7Q0FBQTtBQUZELGdDQUVDO0FBQ0QsU0FBc0IsU0FBUyxDQUFDLEVBQVU7O1FBQ3RDLE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7Q0FBQTtBQUZELDhCQUVDIn0=