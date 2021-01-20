import axios from "axios";

const calendar = {
  state: {
    year: 0,
    month: 0,
    todayDate: 0,
    todayYear: 0,
    todayMonth: 0,
    day: 0,
    events: [
      {
        "id": 1,
        "dateStart": 1590491667,
        "dateEnd": 1590502467,
        "name": "TestEvent",
        "desk": "TestEventDesk",
        "calendarId": 1,
        "timeZone": 1771921,
        "status": "application"
      },
      {
        "id": 2,
        "dateStart": 1590480282,
        "dateEnd": 1590491082,
        "name": "NewTestEvent",
        "desc": "NewTestEventDesk",
        "calendarId": 2,
        "timeZone": 1771924,
        "status": "application",
      },
      {
        "id": 3,
        "dateStart": 1590401667,
        "dateEnd": 1590419667,
        "name": "TestEvent2",
        "desc": "TestEventDesk2",
        "calendarId": 2,
        "timeZone": 1771923,
        "status": "plan",
      },
      {
        "id": 4,
        "dateStart": 1590592467,
        "dateEnd": 1590603267,
        "name": "TestEvent3",
        "desc": "TestEventDesk3",
        "calendarId": 3,
        "timeZone": 1771922,
        "status": "done",
      },
      {
        "id": 5,
        "dateStart": 1590675267,
        "dateEnd": 1590686067,
        "name": "TestEvent4",
        "desc": "TestEventDesk4",
        "calendarId": 4,
        "timeZone": 1771921,
        "status": "application",
      }
    ],
    calendars: [
      {
        ID: 1,
        NAME: "Праздники",
        COLOR: "#D733FF",
        location: "",
        responsiblePerson: "",
        checked: true
      },
      {
        ID: 2,
        NAME:"Видеоконференция",
        COLOR: "#14195D",
        location: "",
        responsiblePerson: "",
        checked: false
      },
      {
        ID: 3,
        NAME: "Переговорная",
        COLOR: "#339FFF",
        location: "",
        responsiblePerson: "",
        checked: false
      },
      {
        ID: 4,
        NAME: "123",
        COLOR: "#422523",
        location: "",
        responsiblePerson: "",
        checked: false,
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
    editEvent:{
      id: 111,
      dateStart: 1590491667,
      dateEnd: 1590502467,
      name: "TestEvent",
      desk: "TestEventDesk",
      attendees: ['1', '2', '3'],
      calendarId: 2,
      timeZone: 1771923,

      preview: {
        name: "Preview Name",
        desc: "Preview Desc",
        img:"",
        tagsAreaOfInfluence: [1771942, 1771941],
        tagsPersons: [1771939],
        tagsSubjects: [1771939],

      }

    },
    detailsEvent:{
    },
    shownPopapAddingEvent: false,
    shownPopapEventFullScreen: false,
    shownPopapAddingCalendar: false,
    shownPopapDetailsEvent: false,
    shownPopapEventEdit: false,
    yandexMap:{
      room:"",
      show: false
    },
    timeZones: [
      {
        checked: false,
        id: 1771921,
        utc: 1,
        xmlId: "MSK-1",
        name: "Europe/Volgograd"
      },
      {
        checked: false,
        id: 1771922,
        utc: 2,
        xmlId: "MSK-2",
        name: "Europe/Ulyanovsk",
        status: ""
      },
      {
        checked: false,
        id: 1771923,
        utc: 3,
        xmlId: "MSK-3",
        name: "Europe/Moscow"
      },
      {
        checked: false,
        id: 1771924,
        utc: 4,
        xmlId: "MSK-4",
        name: "Europe/Kaliningrad"
      },
    ],
    statusList: [
      {
        externalId: "plan",
        id: 1509,
        value: "Запланировано"
      },
      {
        externalId: "done",
        id: 1511,
        value: "Состоялось"
      },
      {
        externalId: "denied",
        id: 1510,
        value: "Отказано"
      },
      {
        externalId: "canceled",
        id: 1512,
        value: "Отменено"
      },
      {
        externalId: "application",
        id: 1508,
        value: "Заявка"
      }
    ],
    tagsAreaOfInfluence: [
      {
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
    tagsPersons: [
      {
        id: 1771939,
        name: "Иванов Иван"
      },
      {
        id: 1771938,
        name: "Персона 1"
      },
    ],
    tagsSubjects: [
      {
        id: 1771939,
        name: "Иванов Иван"
      },
      {
        id: 1771938,
        name: "Персона 1"
      },
    ],
  },
  actions: {
    getEventsInWeek({getters, commit}) {
      const vm = this;
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
                  "ajax":"Y",
                  "action":"events-list",
                  "time_from": getters.dataStartWeek,
                  "time_to": getters.dataStartNextWeek,
                  "ids":getters.idChekedCalendars
                  // "ajax":"Y",
                  // "action":"events-list",
                  // "time_from": `${getters.dataStartWeek}`,
                  // "time_to": `${getters.dataStartNextWeek}`,
                  // "ids":`${getters.idChekedCalendars}`
                },
        success: function(response){
          commit("updateEvents", response.data);
        }
      });
    },
    getEventForEdit({commit}, id) {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
                  "ajax":"Y",
                  "action":"get-event",
                  "id": id
                },
        success: function(response){
          commit("updateEditEvent", response.data);
          commit("showPopapEventEdit");
          $('#calendar-edit-event-popup').modal('show');
          console.log(response.data);
        }
      });
    },
    sendEventEdit(event) {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
                  "ajax":"Y",
                  "action":"send-event",
                  "event": event
                },
        success: function(response){
          console.log(response.data);
        }
      });
    },
  },
  getters: {
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
        return timezone.id === id
      })[0];
    },
    idChekedCalendars: (state, getters) => {
      return getters.checkedCalendars.map(el=> {
          return el.ID
      })
    },
    timeZone(){
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
      return state.calendars.filter(calendar => calendar.ID === id)[0];
    },
    getDataStartCreatedEvent: state => {
      let dataStart =  Math.min(
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
      return dataStart;
    },
    getDataEndCreatedEvent: state => {
      let dataEnd =  Math.max(
        state.createdEvent.dataStart,
        state.createdEvent.dataEnd,
        state.createdEvent.dataInterim
      );
      if (!state.createdEvent.dataInterim) {
        dataEnd  = Math.max(
          state.createdEvent.dataStart,
          state.createdEvent.dataEnd,
        );
        }
        if (!state.createdEvent.dataEnd) {
          dataEnd  = Math.max(
            state.createdEvent.dataStart,
            state.createdEvent.dataInterim
          );
      }
      return dataEnd ;
    },
  },
  mutations: {
    updateEditEvent(state, event) {
      state.editEvent = event;
    },
    updateCheckedCalendars(state, el) {
      state.checkedCalendars = [...state.checkedCalendars, el]
    },
    updateCalendars(state, calendars){
      state.calendars = calendars;
    },
    updateYandexMap(state, dataMap){
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
    checkCalendar(state, dataCalendar){
      return state.calendars.forEach(el => {
        if(dataCalendar.id === el.ID) {
          el.checked = dataCalendar.check
        }
      })
    },
    showPopapEventFullScreen(state) {
      state.shownPopapEventFullScreen = true;
    },
    closePopapEventFullScreen(state) {
      state.shownPopapEventFullScreen = false;
    },
    showPopapDetailsEvents(state) {
      state.shownPopapDetailsEvent = true;
    },
    closePopapDetailsEvents(state) {
      state.shownPopapDetailsEvent = false;
    },
    showPopapEventEdit(state) {
      state.shownPopapEventEdit = true
    },
    closePopapEventEdit(state) {
      state.shownPopapEventEdit = false
    },
    addCalendar(state, calendar) {
      state.calendars.push(calendar);
    },
    addCreatedEventToEvents(state) {
      let dataStart = state.createdEvent.dataStart;
      let dataEnd = state.createdEvent.dataEnd;
      dataStart = Math.min(
        state.createdEvent.dataStart,
        state.createdEvent.dataEnd,
        state.createdEvent.dataInterim
      );
      dataEnd = Math.max(
        state.createdEvent.dataStart,
        state.createdEvent.dataEnd,
        state.createdEvent.dataInterim
      );
      if (!state.createdEvent.dataInterim) {
        dataStart = Math.min(
          state.createdEvent.dataStart,
          state.createdEvent.dataEnd,
        );
        dataEnd = Math.max(
          state.createdEvent.dataStart,
          state.createdEvent.dataEnd,
        );
      }
      if (!state.createdEvent.dataEnd) {
        dataStart = Math.min(
          state.createdEvent.dataStart,
          state.createdEvent.dataInterim
        );
        dataEnd = Math.max(
          state.createdEvent.dataStart,
          state.createdEvent.dataInterim
        );
      }
      
      const filterEvent = {
        dateStart: dataStart / 1000,
        dateEnd: dataEnd / 1000,
        guests: state.createdEvent.selectedGuest,
        groups: state.createdEvent.selectedGroups,
        name: state.createdEvent.name,
        calendarId: state.createdEvent.calendarId
      };
      state.events.push(filterEvent);
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
    showPopapAddingEvent(state) {
      state.shownPopapAddingEvent = true;
    },
    closePopupCreatedEvent(state) {
      // this.resetStateCreatedEvent();
      state.shownPopapAddingEvent = false;
    },
    showPopapAddingCalendar(state) {
      state.shownPopapAddingCalendar = true;
    },
    closePopapAddingCalendar(state) {
      state.shownPopapAddingCalendar = false;
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
