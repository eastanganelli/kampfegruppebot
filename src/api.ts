import axios from "axios";
/*LOCALHOST*/ const localhost: any = 'http://localhost:8000/api/v1/';
/*WEBHOST*/   const webhost:   any = 'http://pofbatto.heliohost.org/api/v1/';

const apiClient = axios.create({
    baseURL: webhost,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 20000
  });

//#region TODAY GET
    export async function birthsGET() {
        return (await apiClient.get('birthlist')).data;
    }
    export async function redlightsGET() {
        return (await apiClient.get('redlist')).data;
    }
//#endregion

//#region  USER
//#region  GET
    export async function usersGET() {
        return (await apiClient.get('users')).data;
    }
    export async function userGET(id: any) {
        return (await apiClient.get('user/'+id)).data;
    }
//#endregion
//#region POST
export async function userPOST(data_: { id: any; }) {
    return (await apiClient.post<{ id: any; }>('user', data_)).request;
}
//#endregion
//#region PUT
    export async function birthPUT(id: string, data_: { birth: any|null; }) {
        let response = apiClient.put<{ birth: any|null; }>('users/'+id.toString(), data_);
        console.log(response);
    }
    export async function lastconPUT(id: string) {
        return (await apiClient.put('userlaston/'+id)).request;
    }
    export async function incpointsPUT(id: string, data_: { points: number; }) {
        return (await apiClient.put<{ points: number; }>('useruppts/'+id, data_)).request;
    }
    export async function decpointsPUT(id: string, data_: { points: number; }) {
        return (await apiClient.put<{ points: number; }>('userdopts/'+id, data_)).request;
    }
//#endregion
//#region DELETE
export async function userDELETE(id: string) {
    return (await apiClient.delete('userdopts/'+id)).request;
}
//#endregion 
//#endregion
//#region FUHRER
//#region GET
    export async function fuhrersGET() {
        return (await apiClient.get('fuhrers')).data;
    }
    export async function fuhrerGET(id: string) {
        return (await apiClient.get('fuhrer/'+id)).data;
    }
//#endregion
//#endregion