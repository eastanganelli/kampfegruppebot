export interface uProfile { nombre: string; birth: any; joinAt: any; lastCon: any }
export interface uJuego   { nombre: string; code: string; EID: string }
export interface uCoronel { uid: string; vac: boolean };
export interface uFuhrer  { leader: number; nmbWeek: number; coroneles: Array<uCoronel> };