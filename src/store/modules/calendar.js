import moment from "moment-timezone";
import { EMPTY_EVENT, EMPTY_ROOM } from "../../components/const.js";
import { modalPopup } from "../../functions.js";
import {
    events as fEvents,
    calendars as fCalendars,
    timezones as fTimezones

} from "../../components/fake-data.js"
const calendar = {
    state: {
        year: 0,
        month: 0,
        todayDate: 0,
        todayYear: 0,
        todayMonth: 0,
        day: 0,
        events: [
            ...fEvents
        ],
        calendars: [
            ...fCalendars
        ],
        timeZones: [
            ...fTimezones
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
        },
        editRoom: {
            address: "",
            capacityRoom: "",
            cci: "",
            color: "",
            coordinates: "",
            description: "",
            email: [],
            fileContract: "",
            id: "",
            imagesRooms: [],
            moderators: [],
            name: "",
            numberRoom: "",
            phones: [],
            timeZone: 0,
            servicesList: [
                // {
                //     iblock_id: "31",
                //     measure: "1504",
                //     name: "Питьевая вода бутилированная б/г 0,33 л",
                //     product_id: "1864623",
                //     product_price: "5000.00",
                //     product_quantity: "100",
                //     ratio: 1,
                //     currency: "150123",
                //     type: "voting"
                // },
                // {
                //     iblock_id: "31",
                //     measure: "1504",
                //     name: "Питьевая вода бутилированная б/г 0,33 л",
                //     product_id: "186462312323",
                //     product_price: "5000.00",
                //     product_quantity: "100",
                //     ratio: 1,
                //     currency: "150123",
                //     type: "voting"
                // },
            ]
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
        services: [
            // {
            //     iblock_id: "31",
            //     measure: "1504",
            //     name: "Питьевая вода бутилированная б/г 0,33 л",
            //     id: "1864623",
            //     price: "5000.00",
            //     product_quantity: "100",
            //     ratio: 1,
            //     currency: "150123",
            //     type: "voting"
            // },
            // {
            //     iblock_id: "31",
            //     measure: "1504",
            //     name: "Питьевая вода бутилированная б/г 0,33 л",
            //     id: "186462312323",
            //     price: "5000.00",
            //     quantity: "100",
            //     ratio: 1,
            //     currency: "150123",
            //     type: "voting"
            // },
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
            savingEvent: false,
            savingCalendar: false
        },
        measureList: [{
                id: "1504",
                name: "литры"
            },
            {
                id: "1505",
                name: "килограммы"
            },
        ],
        currencyList: [{
                id: "150123",
                name: "доллары"
            },
            {
                id: "150124",
                name: "рубли"
            },
        ]
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
                    if (response.success) {
                        commit('resetStateCreatedEvent');
                        commit('closePopapEventFullScreen');
                        dispatch("getEventsInWeek");
                    } else {
                        modalPopup({
                            title: 'Ошибка при сохранении события',
                            content: response.errors
                        });
                    }
                    state.loadings.savingEvent = false;
                },
                errors: function() {
                    modalPopup({
                        title: 'Ошибка при сохранении события',
                        content: 'Повторите попытку позже'
                    });
                    state.loadings.savingEvent = false;
                }
            });
        },
        sendNewRoom({ state, dispatch, commit }, event) {
            state.loadings.savingCalendar = true;
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
                        modalPopup({
                            title: 'Ошибка при сохранении календаря',
                            content: response.errors
                        });
                        // alert(`${response.error}`);
                    }
                    state.loadings.savingCalendar = false;
                },
                error: function() {
                    modalPopup({
                        title: 'Ошибка при сохранении календаря',
                        content: 'Повторите попытку позже'
                    });
                    state.loadings.savingCalendar = false;
                    // alert("ошибка при получении ответа");
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
                },

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
                    alert('произошла ошибка при обновлении календарей')
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
            formData.append("public", `${state.event.public}`);
            console.log(state.event.registration);
            state.event.registration.forEach((el, index) => {
                formData.append(`registration[${index}]`, el);
            });
            state.event.services.forEach((el, index) => {
                formData.append(`products[${index}]`, el);
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
                    if (property === "ids") continue;
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
            $('#popup-event-fullscreen').modal('hide');
            state.event = EMPTY_EVENT;
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