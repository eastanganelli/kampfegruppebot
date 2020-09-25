"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayOfYear = exports.getWeekNumber = void 0;
function getWeekNumber() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
exports.getWeekNumber = getWeekNumber;
function getDayOfYear(inDate) {
    let start = new Date(inDate);
    let now = new Date();
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    return day;
}
exports.getDayOfYear = getDayOfYear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZW50aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGVudGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTQSxTQUFnQixhQUFhO0lBQ3pCLE1BQU0sS0FBSyxHQUFRLElBQUksSUFBSSxFQUFFLENBQUM7SUFDOUIsTUFBTSxjQUFjLEdBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDM0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBTEQsc0NBS0M7QUFDRCxTQUFnQixZQUFZLENBQUMsTUFBVztJQUNwQyxJQUFJLEtBQUssR0FBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzFCLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQVRELG9DQVNDIn0=