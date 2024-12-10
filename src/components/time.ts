export function FormatDate(date: Date): string {
  let week: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  let months: string[] = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  let getWeek: number = date.getDay();
  let getMonth: number = date.getMonth();
  let d: number = date.getDate();

  return `${week[getWeek]} ${months[getMonth]} ${d} `;
}
