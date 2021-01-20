const MONTH = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];

const MINUTES = ["00", "15", "30", "45"];

const HOURS = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24"
  ];

const EMPTY_EVENT = {
  id: 0,
  dateStart: 0,
  dateEnd: 0,
  name: "",
  desc: "",
  attendees: [],
  services: [],
  calendarId: 0,
  timeZone: 0,
  status: {},
  preview: {
  }
}


export {HOURS, MINUTES, MONTH, EMPTY_EVENT};