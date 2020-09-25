import axios from "axios";
/*LOCALHOST*/ const localhost: any = 'http://localhost:8000/api/v1/';
/*WEBHOST*/   const webhost:   any = 'https://deltapinc.000webhostapp.com/api/v1/';

//#region TODAY GET
export async function birthsGET() {
    return new Promise((resolve, reject) => {
        axios.get(webhost + 'birthlist').then((data:any) => resolve(data)).catch(err => reject(err));
    });
}
export async function redlightsGET() {
    return new Promise((resolve, reject) => {
        axios.get(webhost + 'redlist/').then((data:any) => resolve(data)).catch(err => reject(err));
    });
}
//#endregion

//#region  USER
//#region  GET
export async function usersGET() {
    return new Promise((resolve, reject) => {
        axios.get(webhost + 'users').then((data:any) => resolve(data)).catch(err => reject(err));
    });
}
export async function userGET(id: string) {
    return new Promise((resolve, reject) => {
        axios.get(webhost + 'users/'+id).then((data:any) => resolve(data)).catch(err => reject(err));
    });
}
//#endregion
//#region POST
export async function userPOST(id: string, data: { id:string; birth: Date; lastcon: Date; }) {
    return new Promise((resolve, reject) => {
        data.lastcon = new Date();
        axios.post(webhost + 'users/'+id, data).then(ans => resolve(ans)).catch(err => reject(err));
    });
}
//#endregion
//#region PUT
export async function birthPUT(id: string, data: { birth: Date; }) {
    return new Promise((resolve, reject) => {
        axios.put(webhost + 'users/'+id, data).then(ans => resolve(ans)).catch(err => reject(err));
    });
}
export async function lastconPUT(id: string) {
    return new Promise((resolve, reject) => {
        axios.put(webhost + 'users/'+id).then(ans => resolve(ans)).catch(err => reject(err));
    });
}
export async function incpointsPUT(id: string, data: { points: number; }) {
    return new Promise((resolve, reject) => {
        axios.put(webhost + 'useruppts/'+id, data).then(ans => resolve(ans)).catch(err => reject(err));
    });
}
export async function decpointsPUT(id: string, data: { points: number; }) {
    return new Promise((resolve, reject) => {
        axios.put(webhost + 'userdopts/'+id, data).then(ans => resolve(ans)).catch(err => reject(err));
    });
}
//#endregion
//#region DELETE
export async function userDELETE(id: string) {
    return new Promise((resolve, reject) => {
        axios.delete(webhost + 'user/'+id).then(ans => resolve(ans)).catch(err => reject(err));
    });
}
//#endregion 
//#endregion
//#region FUHRER
//#region GET
export async function fuhrersGET() {
    return new Promise((resolve, reject) => {
        axios.get(webhost + 'fuhrers').then((data:any) => resolve(data)).catch(err => reject(err));
    });
}
export async function fuhrerGET(id: string) {
    return new Promise((resolve, reject) => {
        axios.get(webhost + 'fuhrer/'+id).then((data:any) => resolve(data)).catch(err => reject(err));
    });
}
//#endregion
//#endregion