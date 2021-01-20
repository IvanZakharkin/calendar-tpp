import axios from "axios";
import lodash from 'lodash';
import moment from "moment-timezone";
import { EMPTY_EVENT, EMPTY_ROOM } from "../../components/const.js"
const calendar = {
    state: {
        year: 0,
        month: 0,
        todayDate: 0,
        todayYear: 0,
        todayMonth: 0,
        day: 0,
        events: [
            //       {
            //         calendarId: "2224",
            //         dateEnd: 1605531600,
            //         dateStart: 1605528000,
            //         desc: "Заявка № 1988090<br /><br />Встреча С.Н.Катырина с генеральным директором Ассоциации европейского бизнеса Тадзио Шиллингом<br />Ответственный:<br />Грабовская, Валерия Олеговна<br />Старший эксперт<br />тел. 046<br /><br />204-6 Зал заседаний<br />16.11.2020<br />15:00 - 16:00<br /><br />Участников: 7<br />Цель проведения: обсуждение возможностей для сотрудничества между ТПП РФ и АЕБ<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Нет<br />Трансляция: Нет<br />Аудиозапись: Нет<br />Видеозапись: Нет",
            //         detail_url: "/",
            //         id: "381772",
            //         name: "Встреча С.Н.Катырина с генеральным директором Ассоциации европейского бизнеса Тадзио Шиллингом",
            //         status: {id: 0, value: null, externalId: null},
            //         timeZone: 1831954},
            // {
            // calendarId: "2225",
            // dateEnd: 1605538800,
            // dateStart: 1605524400,
            // desc: "Заявка № 1992386<br /><br />Круглый стол Актуальные вызовы для института банкротства в России в условиях пандемии<br />Ответственный:<br />Шашкова, Полина Геннадьевна<br />Заместитель директора Департамента <br />тел. 025<br /><br />310-6 Библиотека<br />16.11.2020<br />14:00 - 18:00<br /><br />Участников: 30<br />Цель проведения: подготовка предложений в Правительство РФ<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Согласовано<br />Трансляция: Согласовано<br />Аудиозапись: Согласовано<br />Видеозапись: Согласовано<br />Евдокимов &nbsp;Дмитрий Сергеевич [6123]<br />",
            // detail_url: "/",
            // id: "381773",
            // name: "Круглый стол Актуальные вызовы для института банкротства в России в условиях пандемии",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954},
            // {
            // calendarId: "2224",
            // dateEnd: 1605270600,
            // dateStart: 1605265200,
            // desc: "Заявка № 1993274<br /><br />Встреча С.Н.Катырина с председателем правления ПАО 'СИБУР Холдинг' Д.В.Коновым<br />Ответственный:<br />Грабовская, Валерия Олеговна<br />Старший эксперт<br />тел. 046<br /><br />204-6 Зал заседаний<br />13.11.2020<br />14:00 - 15:30<br /><br />Участников: 7<br />Цель проведения: обсуждение вопросов деятельности Российско-Итальянского комитета предпринимателей <br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Нет<br />Трансляция: Нет<br />Аудиозапись: Нет<br />Видеозапись: Нет",
            // detail_url: "/",
            // id: "381776",
            // name: "Встреча С.Н.Катырина с председателем правления ПАО 'СИБУР Холдинг' Д.В.Коновым",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,},
            // {
            // calendarId: "2224",
            // dateEnd: 1605258000,
            // dateStart: 1605250800,
            // desc: "Заявка № 1987307<br /><br />встреча с министром экономического развития Решетниковым М.Г.<br />Ответственный:<br />Борищенко, Анатолий Анатольевич<br />Главный эксперт<br />тел. 578<br /><br />204-6 Зал заседаний<br />13.11.2020<br />10:00 - 12:00<br /><br />Участников: 25<br />Цель проведения: обсуждение проблем развития предпринимательства<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Согласовано<br />Трансляция: Согласовано<br />Аудиозапись: Согласовано<br />Видеозапись: Согласовано<br />Евдокимов &nbsp;Дмитрий Сергеевич [6123]<br />",
            // detail_url: "/",
            // id: "381777",
            // name: "встреча с министром экономического развития Решетниковым М.Г.",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,},
            // {
            // calendarId: "2225",
            // dateEnd: 1605268800,
            // dateStart: 1605250800,
            // desc: "Заявка № 1991720<br /><br />Третейское разбирательство по спортивному спору<br />Ответственный:<br />Смирнова, Валерия Михайловна<br />Главный эксперт<br />тел. 089<br /><br />310-6 Библиотека<br />13.11.2020<br />10:00 - 15:00<br /><br />Участников: 9<br />Цель проведения: Третейское разбирательство по спортивному спору<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Нет<br />Трансляция: Нет<br />Аудиозапись: Нет<br />Видеозапись: Нет",
            // detail_url: "/",
            // id: "381778",
            // name: "Третейское разбирательство по спортивному спору",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,},
            // {
            // calendarId: "2225",
            // dateEnd: 1605186000,
            // dateStart: 1605160800,
            // desc: "Заявка № 1968353<br /><br />Проведение семинара по правилам определения страны происхождения товара<br />Ответственный:<br />Петрова, Ирина Станиславовна<br />Старший эксперт<br />тел. 190<br /><br />310-6 Библиотека<br />12.11.2020<br />09:00 - 16:00<br /><br />Участников: 20<br />Цель проведения: Повышение &nbsp;уровня компетентности экспертов тпп<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Согласование<br />Трансляция: Нет<br />Аудиозапись: Согласование<br />Видеозапись: Согласование",
            // detail_url: "/",
            // id: "381781",
            // name: "Проведение семинара по правилам определения страны происхождения товара",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954
            // },
            // {
            // calendarId: "2225",
            // dateEnd: 1605099600,
            // dateStart: 1605092400,
            // desc: "Заявка № 1993732<br /><br />Заседание Комитета по природопользованию<br />Ответственный:<br />Самсонов, Кирилл Сергеевич<br />Главный эксперт<br />тел. <br /><br />310-6 Библиотека<br />11.11.2020<br />14:00 - 16:00<br /><br />Участников: 10<br />Цель проведения: рассмотрение текущих вопросов<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Согласовано<br />Трансляция: Нет<br />Аудиозапись: Согласовано<br />Видеозапись: Нет<br />Евдокимов &nbsp;Дмитрий Сергеевич [6123]<br />",
            // detail_url: "/",
            // id: "381784",
            // name: "Заседание Комитета по природопользованию",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,
            // },
            // {
            // calendarId: "2225",
            // dateEnd: 1605092400,
            // dateStart: 1605078000,
            // desc: "Заявка № 1918886<br /><br />Проведение семинара по правилам определения страны происхождения товара<br />Ответственный:<br />Петрова, Ирина Станиславовна<br />Старший эксперт<br />тел. 190<br /><br />310-6 Библиотека<br />11.11.2020<br />10:00 - 14:00<br /><br />Участников: 60<br />Цель проведения: Повышение &nbsp;уровня компетентности экспертов тпп<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Согласовано<br />Трансляция: Нет<br />Аудиозапись: Согласовано<br />Видеозапись: Согласовано<br />Евдокимов &nbsp;Дмитрий Сергеевич [6123]<br />",
            // detail_url: "/",
            // id: "381787",
            // name: "Проведение семинара по правилам определения страны происхождения товара",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,
            // },
            // {
            // calendarId: "2225",
            // dateEnd: 1605020400,
            // dateStart: 1605006000,
            // desc: "Заявка № 1990985<br /><br />Заседание Экспертной группы по направлению 'Подключение (технологическое присоединение) к сетям инженерно-технического обеспечения'<br />Ответственный:<br />Силкина, Галина Викторовна<br />Руководитель направления<br />тел. 335<br /><br />310-6 Библиотека<br />10.11.2020<br />14:00 - 18:00<br /><br />Участников: 10<br />Цель проведения: Подготовка предложений органам власти<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Согласовано<br />Трансляция: Нет<br />Аудиозапись: Согласовано<br />Видеозапись: Нет<br />Евдокимов &nbsp;Дмитрий Сергеевич [6123]<br />",
            // detail_url: "/",
            // id: "381789",
            // name: "Заседание Экспертной группы по направлению 'Подключение (технологическое присоединение) к сетям инженерно-технического обеспечения'",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,
            // },

            // {
            // calendarId: "2224",
            // dateEnd: 1605016800,
            // dateStart: 1605002400,
            // desc: "Заявка № 1980196<br /><br />Годовое заседание Делового совета БРИКС<br />Ответственный:<br />Зубрилина, Анастасия Игоревна<br />Старший эксперт<br />тел. 466<br /><br />204-6 Зал заседаний<br />10.11.2020<br />13:00 - 17:00<br /><br />Участников: 20<br />Цель проведения: ДС БРИКС<br />Финансовая основа: Возмездная<br /><br />Видеоконференция: Нет<br />Трансляция: Нет<br />Аудиозапись: Нет<br />Видеозапись: Нет",
            // detail_url: "/",
            // id: "381790",
            // name: "Годовое заседание Делового совета БРИКС",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,
            // },
            // {
            // calendarId: "2224",
            // dateEnd: 1604928600,
            // dateStart: 1604923200,
            // desc: "Заявка № 1995301<br /><br />встреча актива комитета с президентом ТПП РФ<br />Ответственный:<br />Борищенко, Анатолий Анатольевич<br />Главный эксперт<br />тел. 578<br /><br />204-6 Зал заседаний<br />09.11.2020<br />15:00 - 16:30<br /><br />Участников: 8<br />Цель проведения: обсуждение проблем развития предпринимательства<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Нет<br />Трансляция: Нет<br />Аудиозапись: Согласовано<br />Видеозапись: Согласовано<br />Евдокимов &nbsp;Дмитрий Сергеевич [6123]<br />",
            // detail_url: "/",
            // id: "381793",
            // name: "встреча актива комитета с президентом ТПП РФ",
            // status: {id: 0, value: null, externalId: null},
            // timeZone: 1831954,},
            // {
            // calendarId: "2224",
            // dateEnd: 1604919600,
            // dateStart: 1604914200,
            // desc: "Заявка № 1996718<br /><br />ВКС Е.Н. Дыбовой с представителями Минпромторга<br />Ответственный:<br />ДРП, Референт <br /><br />тел. 102<br /><br />204-6 Зал заседаний<br />09.11.2020<br />12:30 - 14:00<br /><br />Участников: 5<br />Цель проведения: Решение текущих вопросов<br />Финансовая основа: Безвозмездная<br /><br />Видеоконференция: Согласование<br />Трансляция: Нет<br />Аудиозапись: Согласование<br />Видеозапись: Согласование",
            // detail_url: "/",
            // id: "381794",
            // name: "ВКС Е.Н. Дыбовой с представителями Минпромторга",
            // status: {id: 1563, value: "Заявка", externalId: "application"},
            // timeZone: 1831954,},
            // {
            //   calendarId: "2225",
            //   dateEnd: 1592560800,
            //   dateStart: 1592539200,
            //   desc: null,
            //   id: "322571",
            //   name: "НОВОЕ 6",
            //   timeZone: 1771927,
            //   status: {
            //     externalId: "plan",
            //     id: 1508,
            //     value: "Заявка"
            //   }
            // },
            // {
            //   calendarId: "2224",
            //   dateEnd: 1592568000,
            //   dateStart: 1592553600,
            //   desc: null,
            //   id: "322572",
            //   name: "НОВОЕ 7",
            //   timeZone: 1771927,
            //   status: {
            //     externalId: "done",
            //     id: 1508,
            //     value: "Заявка"
            //   }
            // },
            // {
            //   calendarId: "2224",
            //   dateEnd: 1592568000,
            //   dateStart: 1592553600,
            //   desc: null,
            //   id: "322572123",
            //   name: "НОВОЕ 7",
            //   timeZone: 1771927,
            //   status: {
            //     externalId: "done",
            //     id: 1508,
            //     value: "Заявка"
            //   }
            // },
            // {
            //   calendarId: "2225",
            //   dateEnd: 1592604000,
            //   dateStart: 1592589600,
            //   desc: null,
            //   id: "322572",
            //   name: "НОВОЕ 123",
            //   timeZone: 1771927,
            //   status: {
            //     externalId: "application",
            //     id: 1508,
            //     value: "Заявка"
            //   }
            // },
            // {
            //   calendarId: "1728",
            //   dateEnd: 1592463600,
            //   dateStart: 1592424000,
            //   desc: null,
            //   id: "322572",
            //   name: "123",
            //   timeZone: 1771927,
            //   status: {
            //     externalId: "application",
            //     id: 1508,
            //     value: "Заявка"
            //   }
            // },
            // {
            //   "id": 3,
            //   "dateStart": 1590401667,
            //   "dateEnd": 1590419667,
            //   "name": "TestEvent2",
            //   "desc": "TestEventDesk2",
            //   "calendarId": 2,
            //   "timeZone": 1771923,
            //   "status": "plan",
            // },
            // {
            //   "id": 4,
            //   "dateStart": 1590592467,
            //   "dateEnd": 1590603267,
            //   "name": "TestEvent3",
            //   "desc": "TestEventDesk3",
            //   "calendarId": 3,
            //   "timeZone": 1771922,
            //   "status": "done",
            // },
            // {
            //   "id": 5,
            //   "dateStart": 1590675267,
            //   "dateEnd": 1590686067,
            //   "name": "TestEvent4",
            //   "desc": "TestEventDesk4",
            //   "calendarId": 4,
            //   "timeZone": 1771921,
            //   "status": "application",
            // }
        ],
        calendars: [{
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
        ],
        createdEvent: {
            create: false,
            dataStart: 0,
            dataEnd: 0,
            dataInterim: 0,
            selectedGuest: [],
            selectedGroups: [],
            name: "",
            calendarId: 0,
        },
        event: {
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
            responsiblePerson: [],
            template: []


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
        },
        editRoom: {
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
        },
        userInfo: [{
            code: 123,
            label: "Захаркин Иван"
        }],
        detailsEvent: {},
        shownPopapAddingEvent: false,
        shownPopapEventFullScreen: false,
        shownPopapAddingCalendar: false,
        shownPopapDetailsEvent: false,
        shownPopapEventEdit: false,
        yandexMap: {
            room: "",
            show: false
        },
        timeZones: [{
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
            },
        ],
        statusList: [{
                externalId: "plan",
                id: "1509",
                value: "Запланировано"
            },
            {
                externalId: "done",
                id: "1511",
                value: "Состоялось"
            },
            {
                externalId: "denied",
                id: "1510",
                value: "Отказано"
            },
            {
                externalId: "canceled",
                id: "1512",
                value: "Отменено"
            },
            {
                externalId: "application",
                id: "1508",
                value: "Заявка"
            }
        ],
        tagsAreaOfInfluence: [{
                id: 1771942,
                name: "Тег 3"
            },
            {
                id: 1771941,
                name: "Тег 2"
            },
            {
                id: 1771940,
                name: "Тег 1"
            },
        ],
        tagsPersons: [{
                id: 1771939,
                name: "Иванов Иван"
            },
            {
                id: 1771938,
                name: "Персона 1"
            },
        ],
        tagsSubjects: [{
                id: 1771939,
                name: "Иванов Иван"
            },
            {
                id: 1771938,
                name: "Персона 1"
            },
        ],
        services: [{
                externalId: "videotranslation",
                id: "1504",
                value: "Видеотрансляция"
            },
            {
                externalId: "videoconference",
                id: "1503",
                value: "Видеоконференция",
            },
            {
                externalId: "audio",
                id: "1505",
                value: "Аудиозапись"
            },
            {
                externalId: "voting",
                id: "1506",
                value: "Голосование"
            }
        ],
        roles: [{
                id: "1617878",
                name: "Модератор голосования"
            },
            {
                id: "1617879",
                name: "Модератор видеоконференции"
            },
            {
                id: "1617884",
                name: "Секретарь мероприятия"
            },
            {
                id: "1617867",
                name: "Член Правления ТПП РФ"
            },
            {
                id: "1617866",
                name: "Председатель Правления ТПП РФ"
            },
            {
                id: "1617865",
                name: "Член Совета ТПП РФ"
            },
            {
                id: "1617863",
                name: "Председатель Совета ТПП РФ"
            },
            {
                id: "1618026",
                name: "Член Ревизионной комиссии ТПП РФ"
            },
            {
                id: "1618021",
                name: "Председатель Ревизионной комиссии ТПП РФ"
            },
            {
                id: "1632907",
                name: "Организатор"
            },
            {
                id: "1632906",
                name: "Участник голосования"
            },
        ],
        registration: [{
                externalId: "presence_booking",
                id: "1565",
                value: "Размещение"
            },
            {
                externalId: "presence",
                id: "1563",
                value: "Очная"
            },
            {
                externalId: "open_event",
                id: "1566",
                value: "Открытое мероприятие"
            },
            {
                externalId: "remote",
                id: "1564",
                value: "Заочная"
            },
        ],
        canEditCalendars: 1,
        canEditEvents: 1,
        loadings: {
            savingEvent: false
        }
    },
    actions: {
        getEventsInWeek({ getters, commit }) {
            const vm = this;
            $.ajax({
                type: "POST",
                url: "./index.php",
                data: {
                    "ajax": "Y",
                    "action": "events-list",
                    "time_from": getters.dataStartWeek,
                    "time_to": getters.dataStartNextWeek,
                    "ids": getters.idChekedCalendars
                },
                success: function(response) {
                    commit("updateEvents", response.data);
                }
            });
        },
        getEventForEdit({ commit }, id) {
            $.ajax({
                type: "POST",
                url: "./index.php",
                data: {
                    "ajax": "Y",
                    "action": "get-event",
                    "id": id
                },
                success: function(response) {
                    commit("updateEvent", response.data);
                    commit("showPopapEventFullScreen");
                }
            });
        },
        getRoomForEdit({ commit }, id) {
            $.ajax({
                type: "POST",
                url: "./index.php",
                data: {
                    "ajax": "Y",
                    "action": "get-calendar",
                    "id": id
                },
                success: function(response) {
                    commit("updateEditRoom", response.data);
                    commit("showPopapAddingCalendar");
                }
            });
        },
        sendEvent({ dispatch, getters, commit, state }) {
            state.loadings.savingEvent = true;
            $.ajax({
                type: "POST",
                url: "./index.php",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                data: getters.dataEventForSend,
                success: function(response) {
                    // commit("closePopapEventFullScreen");
                    commit('resetStateCreatedEvent');
                    commit('closePopapEventFullScreen');
                    dispatch("getEventsInWeek");
                    state.loadings.savingEvent = false;
                },
                errors: function() {
                    state.loadings.savingEvent = false;
                }
            });
        },
        sendNewRoom({ dispatch, commit }, event) {
            $.ajax({
                type: "POST",
                url: "./index.php",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                data: event,
                success: function(response) {
                    if (response.success) {
                        commit('closePopapAddingCalendar');
                        dispatch("getCalendars");
                    } else {
                        alert(`${response.error}`);
                    }
                },
                error: function() {
                    alert("ошибка при получении ответа");
                }
            });
        },
        deleteRoom({ dispatch, commit }, data) {
            $.ajax({
                type: "POST",
                url: "./index.php",
                dataType: "json",
                data: data,
                success: function(response) {
                    if (response.success) {
                        commit('closePopapAddingCalendar');
                        dispatch("getCalendars");
                    } else {
                        alert(`${response.error}`);
                    }
                },
                error: function() {
                    alert("ошибка при получении ответа");
                }
            });
        },
        showRoomOnMap(store, data) {
            const coordinatesInArray = data.coordinates.split(',').map(el => Number(el));
            window.yandexMapRoom.setCenter(coordinatesInArray, 15, {
                checkZoomRange: true
            })
            var myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: coordinatesInArray
                },
                properties: {
                    balloonContent: `${data.address}`,
                }
            });
            window.yandexMapRoom.geoObjects.add(myGeoObject);
            $('.ymaps-modal').modal("show");
        },
        deleteEvent({ commit, dispatch }, id) {
            $.ajax({
                type: "POST",
                url: "./index.php",
                data: {
                    "ajax": "Y",
                    "action": "delete-event",
                    "id": id
                },
                success: function(response) {
                    dispatch("getEventsInWeek");
                }
            });
        },
        getCalendars({ commit }) {
            $.ajax({
                type: "POST",
                url: "./index.php",
                data: {
                    "ajax": "Y",
                    "action": "calendar-list",
                },
                success: function(response) {
                    commit("updateCalendars", response.data);
                },
                error: function() {
                    alert('произошла ошибка при обнолвении календарей')
                }
            });
        }
    },
    getters: {
        timeZonesForSelect: state => {
            return state.timeZones.map(timezone => {
                return {
                    label: timezone.xmlId,
                    code: timezone.id
                };
            });
        },
        dataEventForSend: state => {
            const formData = new FormData();
            if (state.event.id !== 0) {
                formData.append("id", state.event.id);
            }
            formData.append("ajax", `Y`);
            formData.append("action", `edit-event`);
            formData.append("dateStart", `${state.event.dateStart}`);
            formData.append("dateEnd", `${state.event.dateEnd}`);
            formData.append("name", `${state.event.name}`);
            formData.append("desc", `${state.event.desc}`);
            formData.append("status", `${state.event.status.id}`);
            formData.append("calendarId", `${state.event.calendarId}`);
            formData.append("timeZone", `${state.event.timeZone}`);
            formData.append("template", `${state.event.template}`);
            formData.append("link", `${state.event.link}`);
            console.log(state.event.registration);
            state.event.registration.forEach((el, index) => {
                formData.append(`registration[${index}]`, el);
            });
            state.event.services.forEach((el, index) => {
                formData.append(`services[${index}]`, el);
            });
            state.event.attendees.forEach((attendant, i) => {
                formData.append(`attendees[${i}][id]`, attendant.code);
                attendant.roles.forEach((role, j) => {
                    formData.append(`attendees[${i}][roles][${j}]`, role);
                })
            });
            state.event.hotels.forEach((hotel, i) => {
                for (let property in hotel) {
                    if (property === "registered") continue;
                    if (property === "responsiblePerson" && hotel[property].length != 0) {
                        formData.append(`hotels[${i}][${property}]`, hotel[property][0].code);
                    } else {
                        formData.append(`hotels[${i}][${property}]`, hotel[property]);
                    }

                }
            });
            if (!$.isEmptyObject(state.event.preview)) {
                formData.append("preview[name]", `${state.event.preview.name}`);
                formData.append("preview[desc]", `${state.event.preview.desc}`);
                state.event.preview.tagsAreaOfInfluence.forEach((el, index) => {
                    formData.append(`preview[tagsAreaOfInfluence][${index}]`, el);
                });
                state.event.preview.tagsPersons.forEach((el, index) => {
                    formData.append(`preview[tagsPersons][${index}]`, el);
                });
                state.event.preview.tagsSubjects.forEach((el, index) => {
                    formData.append(`preview[tagsSubjects][${index}]`, el);
                });
                formData.append("previewImage", state.event.preview.img);
            }
            state.event.agendas.forEach((agenda, i) => {
                for (const property in agenda) {
                    if (property == "speakers") {
                        agenda[property].forEach((speaker, j) => {
                            formData.append(`agendas[${i}][${property}][${j}]`, `${speaker.code}`);
                        })
                    } else {
                        formData.append(`agendas[${i}][${property}]`, `${agenda[property]}`);
                    }

                }
            });
            return formData;

        },
        tagsAreaOfInfluenceForSelect: state => {
            return state.tagsAreaOfInfluence.map(el => {
                return {
                    label: el.name,
                    code: el.id
                };
            });
        },
        tagsPersonsForSelect: state => {
            return state.tagsPersons.map(el => {
                return {
                    label: el.name,
                    code: el.id
                };
            });
        },
        tagsSubjectsForSelect: state => {
            return state.tagsSubjects.map(el => {
                return {
                    label: el.name,
                    code: el.id
                };
            });
        },
        getStatusByExternalId: state => externalId => {
            return state.statusList.filter(el => {
                return el.externalId === externalId;
            })[0];
        },
        checkedCalendars: state => {
            return state.calendars.filter(el => {
                return el.checked
            })
        },
        getTimeZoneById: state => id => {
            return state.timeZones.filter(timezone => {
                return Number(timezone.id) === Number(id)
            })[0];
        },
        getCurrentTimeZone: state => {
            // return new Date().getTimezoneOffset();
            const offset = moment().utcOffset() / 60;
            const timeZone = state.timeZones.filter(el => {
                return el.utc === offset
            })
            return timeZone[0];
        },
        idChekedCalendars: (state, getters) => {
            return getters.checkedCalendars.map(el => {
                return el.id
            })
        },
        timeZone() {
            return new Date().getTimezoneOffset();
        },
        dataStartWeek: state => {
            let currentDateInWeek = new Date(state.year, state.month, state.day).getDay();
            if (currentDateInWeek === 0) currentDateInWeek = 7;
            return new Date(state.year, state.month, state.day - currentDateInWeek + 1).getTime() / 1000;
        },
        dataStartNextWeek: state => {
            let currentDateInWeek = new Date(state.year, state.month, state.day).getDay();
            if (currentDateInWeek === 0) currentDateInWeek = 7;
            return new Date(state.year, state.month, state.day - currentDateInWeek + 8).getTime() / 1000;
        },
        getEvent: state => id => {
            return state.events.filter(event => event.id === id);
        },
        getCalendar: state => id => {
            return state.calendars.filter(calendar => calendar.id == id)[0];
        },
        getDataStartCreatedEvent: state => {
            let dataStart = Math.min(
                state.createdEvent.dataStart,
                state.createdEvent.dataEnd,
                state.createdEvent.dataInterim
            );
            if (!state.createdEvent.dataInterim) {
                dataStart = Math.min(
                    state.createdEvent.dataStart,
                    state.createdEvent.dataEnd,
                );
            }
            if (!state.createdEvent.dataEnd) {
                dataStart = Math.min(
                    state.createdEvent.dataStart,
                    state.createdEvent.dataInterim
                );
            }
            return dataStart / 1000;
        },
        getDataEndCreatedEvent: state => {
            let dataEnd = Math.max(
                state.createdEvent.dataStart,
                state.createdEvent.dataEnd,
                state.createdEvent.dataInterim
            );
            if (!state.createdEvent.dataInterim) {
                dataEnd = Math.max(
                    state.createdEvent.dataStart,
                    state.createdEvent.dataEnd,
                );
            }
            if (!state.createdEvent.dataEnd) {
                dataEnd = Math.max(
                    state.createdEvent.dataStart,
                    state.createdEvent.dataInterim
                );
            }
            return dataEnd / 1000;
        },
    },
    mutations: {
        //event
        resetEvent(state) {
            state.event = EMPTY_EVENT;
        },
        updateEvent(state, event) {
            state.event = {...state.event, ...event };
        },
        updateEditEvent(state, event) {
            state.editEvent = event;
        },
        //end event

        //room
        updateEditRoom(state, event) {
            state.editRoom = {...state.editRoom, ...event };
        },
        resetEditRoom(state) {
            state.editRoom = EMPTY_ROOM;
        },
        //end room

        //calendars
        updateCheckedCalendars(state, el) {
            state.checkedCalendars = [...state.checkedCalendars, el]
        },
        updateCalendars(state, calendars) {
            state.calendars = calendars;
        },
        checkCalendar(state, dataCalendar) {
            return state.calendars.forEach(el => {
                if (dataCalendar.id === el.id) {
                    el.checked = dataCalendar.check
                }
            })
        },
        showPopapAddingCalendar(state) {
            state.shownPopapAddingCalendar = true;
            $("#popup-room").modal("show");

        },
        closePopapAddingCalendar(state) {
            $("#popup-room").modal("hide");
            state.shownPopapAddingCalendar = false;
        },
        //end calendars

        updateYandexMap(state, dataMap) {
            state.yandexMap = dataMap;
        },
        // updateEditEvent(state, dataEvent) {
        //   state.editEvent = dataEvent;
        // },
        updateEditEvent(state, data) {
            state.editEvent = data;
        },
        changeDetailsEvent(state, eventData) {
            state.detailsEvent = eventData
        },
        changeYandexMap(state, data) {
            state.yandexMap

        },

        showPopapEventFullScreen(state) {
            $('#popup-event-fullscreen').modal('show');
            state.shownPopapEventFullScreen = true;

        },
        closePopapEventFullScreen(state) {
            state.event = EMPTY_EVENT;
            $('#popup-event-fullscreen').modal('hide');
            state.shownPopapEventFullScreen = false;
        },
        showPopapDetailsEvents(state) {
            state.shownPopapDetailsEvent = true;
        },
        closePopapDetailsEvents(state) {
            state.shownPopapDetailsEvent = false;
        },
        showPopapEventEdit(state) {
            $('#calendar-edit-event-popup').modal('show');
            state.shownPopapEventEdit = true;
            // console.log($('#calendar-edit-event-popup'));
            // $('#calendar-edit-event-popup').modal('show');
        },
        closePopapEventEdit(state) {
            $('#calendar-edit-event-popup').modal('hide');
            state.shownPopapEventEdit = false

        },
        resetStateCreatedEvent(state) {
            state.createdEvent.create = false;
            state.createdEvent.dataStart = 0;
            state.createdEvent.dataEnd = 0;
            state.createdEvent.dataInterim = 0;
            state.createdEvent.selectedGuest = [];
            state.createdEvent.selectedGroups = [];
            state.createdEvent.name = "";
        },

        //adding event
        showPopapAddingEvent(state) {
            state.shownPopapAddingEvent = true;
        },
        closePopupCreatedEvent(state) {
            // this.resetStateCreatedEvent();
            state.shownPopapAddingEvent = false;
        },

        updateCreatedEvent(state, update) {
            state.createdEvent[update.state] = update.value;
        },
        setCurrentDate(state) {
            const date = new Date();
            state.year = date.getFullYear();
            state.month = date.getMonth();
            state.todayDate = date.getDate();
            state.day = date.getDate();
            state.todayYear = date.getFullYear();
            state.todayMonth = date.getMonth();
        },
        toggleMonth(state, direction) {
            let newMonth = state.month + Number(direction);
            let newYear = state.year;
            if (newMonth < 0) {
                newMonth = 11;
                newYear -= 1;
            }
            if (newMonth > 11) {
                newMonth = 0;
                newYear += 1;
            }
            if (newYear >= 1970) {
                state.month = newMonth;
                state.year = newYear;
            }
        },
        toggleWeek(state, direction) {
            const numDays = new Date(state.year, state.month + 1, 0).getDate();
            const lastDayPrevMonth = new Date(state.year, state.month, 0).getDate();
            const firstDayNextMonth = new Date(
                state.year,
                state.month + 1,
                1
            ).getDate();
            let newDay = state.day;
            if (direction === "prev") {
                newDay -= 7;
            }
            if (direction === "next") {
                newDay += 7;
            }
            let newMonth = state.month;
            let newYear = state.year;
            if (newDay < 0) {
                newMonth -= 1;
                newDay = lastDayPrevMonth + newDay;
            }
            if (newDay > numDays) {
                newMonth += 1;
                newDay = firstDayNextMonth + newDay - numDays - 1;
            }
            if (newMonth < 0) {
                newMonth = 11;
                newYear -= 1;
            }
            if (newMonth > 11) {
                newMonth = 0;
                newYear += 1;
            }
            if (newYear >= 1970) {
                state.month = newMonth;
                state.year = newYear;
                state.day = newDay;
            }
        },
        setDate(state, date) {
            state.year = date.year;
            state.month = date.month;
            state.day = date.day;
        },
        createEvent(event) {
            const eventTopCoordinate = `${event.timeFrom * 50}px`;
            const eventHeight = "50px";
            return { eventTop: eventTopCoordinate, eventHeight: eventHeight };
        },
        updateEvents(state, events) {
            state.events = events;
        }
    }
};
export default calendar;