import { uJuego } from "./varInterfaces";

export const kmpfMSG = {
    kmpfcmd: [
        {
            titulo: '_**INFORMACIÓN IMPORTANTE**_',
            desc: 'Si sos un _USUARIO NUEVO_ y no podes participar dentro de ningún _canal de texto o de voz_, debes:',
            data: [
                { texto: '**Reacciona a los msj**', desc: 'Haz click en las reaciones para realizar las acciones', emoji: '' },
                { texto: '**Selecionar juegos**', desc: 'Te hablita los canales ocultos y te signa el role <@533069497561513994> o <@521709396863090698>', emoji: '' },
                { texto: '**Crear tu Perfil**', desc: 'Nos permite saber cuando es tu cumple', emoji: '' }
            ]
        },{
            titulo: '_**PERFIL**_',
            desc: 'Carga de datos de perfil de _USUARIO_ o edición del mismo',
            data: [
                { texto: '**CARGAR PERFIL**', desc: 'Nombre, Fecha Nacimiento', emoji: '🆕' },
                { texto: '**EDITAR PERFIL** _(DESHABILITADO)_', desc: 'Modificar los datos ya cargados', emoji: '📝' }
            ]
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