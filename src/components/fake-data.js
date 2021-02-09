const events = [
    {
        calendarId: "2224",
        dateEnd: 1612361700,
        dateStart: 1612352700,
        desc: null,
        detail_url: "https://portal.tpprf.ru/extranet/meropriyatiya/341042/",
        id: "341042",
        link: "",
        name: "8888888888888",
        status: {id: 1545, value: "Заявка", externalId: "canceled"},
        timeZone: 1771922,
    },
    {
        calendarId: "2224",
        dateEnd: 1612435500,
        dateStart: 1612419300,
        desc: null,
        detail_url: "https://portal.tpprf.ru/extranet/meropriyatiya/341045/",
        id: "341045",
        link: "",
        name: "ггггггггггггггггггггг",
        status: {id: 1545, value: "Заявка", externalId: "application"},
        timeZone: 1771922,
    },
    {
        calendarId: "2224",
        dateEnd: 1612264500,
        dateStart: 1612247400,
        desc: null,
        detail_url: "https://portal.tpprf.ru/extranet/meropriyatiya/341055/",
        id: "341055",
        link: "аааааааааааааааааа",
        name: "тест 666 555",
        status: {id: 1545, value: "Заявка", externalId: "application"},
        timeZone: 1771922
    },
    {
        calendarId: "2224",
        dateEnd: 1612194300,
        dateStart: 1612181700,
        desc: null,
        detail_url: "https://portal.tpprf.ru/extranet/meropriyatiya/341059/",
        id: "341059",
        link: "",
        name: "123123",
        status: {id: 1545, value: "Заявка", externalId: "application"},
        timeZone: 1771922,
    },
];
const calendars = [{
        color: "#DAA187",
        description: "Описание важных мероприятий",
        id: "2224",
        name: "Важное",
        address: "пр. Ленина, 92, Тула, Тульская обл.,",
        checked: true,
        coordinates: "54.166607, 37.587232",
        detail_text: "",
        time_zone: "1771927",
        xml_id: "calendar_2224"
    },
    {
        color: "#C8CDD3",
        description: "Образовательные мероприятия",
        id: "2226",
        name: "Обучение",
        checked: false,
        name: "Обучение",
    },
    {
        color: "#CEE669",
        description: "Календарь был создан автоматически",
        id: "1728",
        name: "Основные события",
        checked: false,
    },
    {
        color: "#78D4F1",
        description: "Праздничные мероприятия",
        id: "2225",
        name: "Праздничные мероприятия",
        address: "пр. Ленина, 47, Тула, Тульская обл., 300041",
        checked: false,
        coordinates: "54.186429, 37.610497",
        detail_text: "",
        time_zone: "1771922",
        xml_id: "calendar_2225"
    }

]

const timezones = [{
        checked: false,
        id: 1771921,
        name: "Europe/Kaliningrad",
        utc: 2,
        xmlId: "MSK-1"
    },
    {
        checked: false,
        id: 1771922,
        name: "Europe/Moscow",
        utc: 3,
        xmlId: "MSK"
    },
    {
        checked: false,
        id: 1771923,
        name: "Europe/Samara",
        utc: 4,
        xmlId: "MSK+1"
    },
    {
        checked: false,
        id: 1771924,
        name: "Asia/Yekaterinburg",
        utc: 5,
        xmlId: "MSK+2"
    },
    {
        checked: false,
        id: 1771925,
        name: "Asia/Omsk",
        utc: 6,
        xmlId: "MSK+3"
    },
    {
        checked: false,
        id: 1771926,
        name: "Asia/Krasnoyarsk",
        utc: 7,
        xmlId: "MSK+4"
    },
    {
        checked: false,
        id: 1771927,
        name: "Asia/Irkutsk",
        utc: 8,
        xmlId: "MSK+5"
    },
    {
        checked: false,
        id: 1771928,
        name: "Asia/Yakutsk",
        utc: 9,
        xmlId: "MSK+6"
    },
    {
        checked: false,
        id: 1771929,
        name: "Asia/Vladivostok",
        utc: 10,
        xmlId: "MSK+7"
    },
    {
        checked: false,
        id: 1771930,
        name: "Asia/Magadan",
        utc: 11,
        xmlId: "MSK+8"
    },
    {
        checked: false,
        id: 1771931,
        name: "Asia/Kamchatka",
        utc: 12,
        xmlId: "MSK+9"
    }
];


export { events, calendars, timezones };

// calendarId: 0,
// dateEnd: 0,
// dateStart: 0,
// desc: "",
// id: 1123,
// name: "",
// preview: {},
// registration: [],
// responsiblePerson: [],
// services: [],
// status: {},
// template: 0,
// registration: [],
// agendas:[],
// timeZone: 0,
// hotels: [
//   {
//     name: "Гостиница 1",
//     id: 1,
//     tel: "89539234422",
//     email: "asdad@asd.ru",
//     responsiblePerson: [{
//       code: "5060",
//       label: "Федунков Ярослав Владимирович",
//       roles: [
//         "1618026",
//         "1617867",
//         "1617866"
//       ]
//     }],
//     registered: [
//       {
//         name: "Агафонов Петр Петрович",
//         comment: "Карты, деньги, два ствола",
//         arrivalDate: "22.05.2020",
//         departureDate: "24.05.2020",
//       },
//       {
//         name: "Петров Агафон Трофимович",
//         comment: "Просто два ствола",
//         arrivalDate: "24.05.2020",
//         departureDate: "25.05.2020",
//       },
//       {
//         name: "Сидоров Афанасий Дворфович",
//         comment: "Топор и кружку эля",
//         arrivalDate: "26.05.2020",
//         departureDate: "30.05.2020",
//       },
//     ]
//   },
//   {
//     name: "Гостиница 2",
//     ids: 2,
//     tel: "8922222222",
//     email: "22222@2222.ru",
//     responsiblePerson: [
//       {
//         code: "5061",
//         label: "Каспаров Ярослав Владимирович",
//         roles: [
//           "1617879",
//           "1617884",
//           "1617866"
//         ]
//       },
//     ],
//     registered: [
//       {
//         name: "Королевич Арагорн",
//         comment: "Армию мертвых",
//         arrivalDate: "28.05.2020",
//         departureDate: "29.05.2020",
//       },
//       {
//         name: "Леголас Леголасович Светоликий",
//         comment: "Побольше стрел",
//         arrivalDate: "24.05.2020",
//         departureDate: "25.05.2020",
//       },
//     ]
//   },
//   // {
//   //   name: "Гостиница 3",
//   //   id: 3,
//   //   tel: "8933333333333",
//   //   email: "3333@asd.ru",
//   //   responsiblePerson: [],
//   //   registered: []
//   // },
//   // {
//   //   name: "Гостиница 4",
//   //   id: 4,
//   //   tel: "895444444444",
//   //   email: "44444@asd.ru",
//   //   responsiblePerson: [],
//   //   registered: []
//   // },
// ],
// attendees: [
//   {
//     code: "5060",
//     label: "Федунков Ярослав Владимирович",
//     roles: [
//       "1618026",
//       "1617867",
//       "1617866"
//     ]
//   },
//   {
//     code: "5061",
//     label: "Каспаров Ярослав Владимирович",
//     roles: [
//       "1617879",
//       "1617884",
//       "1617866"
//     ]
//   },
//   {
//     code: "5062",
//     label: "Дунаев Ярослав Владимирович",
//     roles: [
//       "1617879",
//       "1617884",
//       "1617865",
//       "1618026",
//       "1617867",
//       "1617866"
//     ]
//   },

// ]