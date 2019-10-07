export interface lProfile { uid: string; userDat: uProfile }
export interface lConnect { joinAt: Date; laston: Date; lastAdv: Date }
export interface uProfile { loaded: boolean; nombre: string; birth: Date; phone: string; connect: lConnect; steam: string; origin: string; uplay: string; }
export interface uJuego   { nombre: string; code: string; EID: string }
export interface uCoronel { uid: string; vac: boolean }
export interface uFuhrer  { leader: number; nmbWeek: number; coroneles: Array<uCoronel> }