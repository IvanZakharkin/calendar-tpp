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
    preview: {},
    agendas: [],
    registration: [],
    hotels: [],
    link: ''
};
const EMPTY_ROOM = {
    address: "",
    capacityRoom: "",
    cci: "",
    color: "",
    coordinates: "",
    description: "",
    email: "",
    fileContract: "",
    id: "",
    imagesRooms: [],
    moderators: [],
    name: "",
    numberRoom: "",
    phones: [],
    timeZone: 0,
    hotels: []
};

const HOURS_FOR_CALENDAR = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00"
]

export { HOURS, MINUTES, MONTH, EMPTY_EVENT, EMPTY_ROOM, HOURS_FOR_CALENDAR };