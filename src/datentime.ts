//#region IMPORTS
//#region Plug

//#endregion
//#region KMPF

//#endregion
//#endregion

export function getWeekNumber() {
    let d: any = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    let dayNum: any = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}
export function getDayOfYear(inDate: any) {
    let start:   any = new Date(inDate);
    console.log(start);
    let now: any = new Date();
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    console.log('Day of year: ' + day);
    return day;
}