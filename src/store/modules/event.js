import { EMPTY_EVENT } from "../../components/const.js";

export default {
    state: {
        data: {
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
        popup: false
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
        resetEvent(state) {
            state.event = EMPTY_EVENT;
        },
        updateEvent(state, event) {
            state.event = {...state.event, ...event };
        },
        showPopap(state) {
            $('#popup-event-fullscreen').modal('show');
            state.popup = true;

        },
        closePopapEventFullScreen(state) {
            $('#popup-event-fullscreen').modal('hide');
            state.event = EMPTY_EVENT;
            state.popup = false;
        }
    }
};