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
const webhost = 'https://deltapinc.000webhostapp.com/api/v1/';
function birthsGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.get(webhost + 'birthlist').then((data) => resolve(data)).catch(err => reject(err));
        });
    });
}
exports.birthsGET = birthsGET;
function redlightsGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.get(webhost + 'redlist/').then((data) => resolve(data)).catch(err => reject(err));
        });
    });
}
exports.redlightsGET = redlightsGET;
function usersGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.get(webhost + 'users').then((data) => resolve(data)).catch(err => reject(err));
        });
    });
}
exports.usersGET = usersGET;
function userGET(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.get(webhost + 'users/' + id).then((data) => resolve(data)).catch(err => reject(err));
        });
    });
}
exports.userGET = userGET;
function userPOST(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            data.lastcon = new Date();
            axios_1.default.post(webhost + 'users/' + id, data).then(ans => resolve(ans)).catch(err => reject(err));
        });
    });
}
exports.userPOST = userPOST;
function birthPUT(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.put(webhost + 'users/' + id, data).then(ans => resolve(ans)).catch(err => reject(err));
        });
    });
}
exports.birthPUT = birthPUT;
function lastconPUT(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.put(webhost + 'users/' + id).then(ans => resolve(ans)).catch(err => reject(err));
        });
    });
}
exports.lastconPUT = lastconPUT;
function incpointsPUT(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.put(webhost + 'useruppts/' + id, data).then(ans => resolve(ans)).catch(err => reject(err));
        });
    });
}
exports.incpointsPUT = incpointsPUT;
function decpointsPUT(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.put(webhost + 'userdopts/' + id, data).then(ans => resolve(ans)).catch(err => reject(err));
        });
    });
}
exports.decpointsPUT = decpointsPUT;
function userDELETE(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.delete(webhost + 'user/' + id).then(ans => resolve(ans)).catch(err => reject(err));
        });
    });
}
exports.userDELETE = userDELETE;
function fuhrersGET() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.get(webhost + 'fuhrers').then((data) => resolve(data)).catch(err => reject(err));
        });
    });
}
exports.fuhrersGET = fuhrersGET;
function fuhrerGET(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.get(webhost + 'fuhrer/' + id).then((data) => resolve(data)).catch(err => reject(err));
        });
    });
}
exports.fuhrerGET = fuhrerGET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMEI7QUFDWixNQUFNLFNBQVMsR0FBUSwrQkFBK0IsQ0FBQztBQUN2RCxNQUFNLE9BQU8sR0FBVSw2Q0FBNkMsQ0FBQztBQUduRixTQUFzQixTQUFTOztRQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakcsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQUE7QUFKRCw4QkFJQztBQUNELFNBQXNCLFlBQVk7O1FBQzlCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQUpELG9DQUlDO0FBS0QsU0FBc0IsUUFBUTs7UUFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FB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