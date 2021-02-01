import { EMPTY_EVENT } from "../../components/const.js";

export default {
    state: {
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


    },
    actions: {
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