import { uJuego } from "./varInterfaces";

export const kmpfMSG = {
    kmpfroles: {
        MC: '614258469066768424',
        Arr: [{
            titulo: '_**INFORMACIÓN IMPORTANTE**_',
            desc: 'Si sos un _USUARIO NUEVO_  y no podes participar dentro de ningún _canal de texto_ o _de voz_, debes:',
            data: [
                { texto: '**Reacciona a los msj**', desc: 'Haz click en las reaciones para realizar las acciones', emoji: '' },
                { texto: '**Selecionar juegos**', desc: 'Te hablita los canales ocultos y te signa el role _Invitado_ o _Candidato_', emoji: '' },
                { texto: '**Crear tu Perfil**', desc: 'Nos permite saber cuando es tu cumple', emoji: '' }
            ]
        },{
            titulo: '_**PERFIL**_',
            desc: 'Carga de datos de perfil de _USUARIO_ o edición del mismo',
            data: [
                { texto: '**CARGAR PERFIL**', desc: 'Nombre, Fecha Nacimiento', emoji: '🆕' },
                { texto: '**EDITAR PERFIL** _(DESHABILITADO)_', desc: 'Modificar los datos ya cargados', emoji: '📝' }
            ]
        },{
            titulo: '_**ROLES**_',
            desc: 'Seleccionar el roles que quieres',
            data: [
                { texto: '**NSFW**', desc: 'Te permite ver el canal <#623672085474050059>', emoji: '🔞' }
            ]
        }
    ]}, kmpfCoroneles: {
        MC: '620642948660330506',
        Arr: [{
                titulo: '_**KMPF CORONELES**_',
                desc: ':exclamation::exclamation: _UTILIZAR LAS ACCIONES CON RESPONSABILIDAD_',
                data: [
                    { texto: '**PRUNE** _(DESHABILITADO)_', desc: 'Elimina a todos los jugadores ya inactivos hace 30 o más días', emoji: '❌' },
                    { texto: '**PERFILES DE USUARIOS** _(DESHABILITADO)_', desc: 'Permite ver los perfil de los usuarios, votar para eliminar, enviar msj de advertencia', emoji: '📁' }
                ]
            }, {
                titulo: '_**KMPF FÜHRER**_',
                desc: ' ',
                data: [
                    { texto: '**PRESENTE** _(DESHABILITADO)_', desc: 'Permite vovler a ser Führer', emoji: '🏠' },
                    { texto: '**AUSENTE** _(DESHABILITADO)_', desc: 'Le saltea en Orden Führer por ausencia', emoji: '⛱' }
                ]
            }
        ]
    }
};
export const juegos: Array<uJuego> = [
    { nombre: 'Battlefield 1', code: 'bf1', EID: '613181668672536600' },
    { nombre: 'Battlefield 4', code: 'bf4', EID: '613182924745080862' },
    { nombre: 'Battlefield V', code: 'bf5', EID: '613181661273653291' },
    { nombre: 'Warthunder', code: 'wt', EID: '613182915563618315' },
    { nombre: 'Euro Truck Simulator 2', code: 'ets2', EID: '613182913676050442' },
    { nombre: 'Grand theft Auto V', code: 'gta5', EID: '617123585701445659' }
];