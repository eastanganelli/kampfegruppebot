import { uJuego } from "./varInterfaces";

export const kmpfMSG = {
    kmpfcmd: [
        {
            texto: '_**INFORMACIÓN IMPORTANTE**_\nSi sos un _USUARIO NUEVO_ y no podes participar dentro de ningún canal de texto, debes\n-> Seleccionar los juegos',
            emojis: []
        }, {
            texto: '_**PERFIL**_\n:new:➽ **CARGAR PERFIL**\n>Nombre, Fecha Nacimiento\n\n:pencil:➽ **EDITAR PERFIL** _(DESHABILITADO)_\n>Modificar los datos ya cargados',
            emojis: ['🆕', '📝']
        }
    ]
};
export const juegos: Array<uJuego> = [
    { nombre: 'Battlefield 1', code: 'bf1', EID: '613181668672536600' },
    { nombre: 'Battlefield 4', code: 'bf4', EID: '613182924745080862' },
    { nombre: 'Battlefield V', code: 'bf5', EID: '613181661273653291' },
    { nombre: 'Warthunder', code: 'wt', EID: '613182915563618315' },
    { nombre: 'Euro Truck Simulator 2', code: 'ets2', EID: '613182913676050442' },
    { nombre: 'Grand theft Auto V', code: 'gta5', EID: '617123585701445659' }
];