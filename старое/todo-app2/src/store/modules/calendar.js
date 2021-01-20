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
        "calendarID": 1
      },
      {
        "id": 2,
        "dateStart": 1590480282,
        "dateEnd": 1590491082,
        "name": "NewTestEvent",
        "desk": "NewTestEventDesk",
        "calendarID": 2
      },
      {
        "id": 3,
        "dateStart": 1590401667,
        "dateEnd": 1590419667,
        "name": "TestEvent2",
        "desk": "TestEventDesk2",
        "calendarID": 2
      },
      {
        "id": 4,
        "dateStart": 1590592467,
        "dateEnd": 1590603267,
        "name": "TestEvent3",
        "desk": "TestEventDesk3",
        "calendarID": 3
      },
      {
        "id": 5,
        "dateStart": 1590675267,
        "dateEnd": 1590686067,
        "name": "TestEvent4",
        "desk": "TestEventDesk4",
        "calendarID": 4
      }
    ],
    calendars: [
      {
        id: 1,
        name: "Праздники",
        color: "#D733FF",
        location: "",
        responsiblePerson: "",
        checked: false
      },
      {
        id: 2,
        name:"Видеоконференция",
        color: "#14195D",
        location: "",
        responsiblePerson: "",
        checked: false
      },
      {
        id: 3,
        name: "Переговорная",
        color: "#339FFF",
        location: "",
        responsiblePerson: "",
        checked: false
      },
      {
        id: 4,
        name: "123",
        color: "#422523",
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
      calendarID: 0,
    },
    editEvent:{
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
    }
  },
  actions: {
    getEventsInWeek({getters, commit}) {
      return axios({
        method: 'POST',
        url: 'http://localhost/index.php',
        data: {
          dataStartWeek: `${getters.dataStartWeek}`,
          dataStartNextWeek: `${getters.dataStartNextWeek}`
        }
      })
        .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });;
    },
  },
  getters: {
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
      return state.calendars.filter(calendar => calendar.id === id)[0];
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
    updateEditEvent(state, dataEvent) {
      state.editEvent = dataEvent;
    },
    changeDetailsEvent(state, eventData) {
      state.detailsEvent = eventData
    },
    changeYandexMap(state, data) {
      state.yandexMap

    },
    checkCalendar(state, dataCalendar){
      const calendar = state.calendars.filter(
        calendar => dataCalendar.id === calendar.id
      )[0];
      calendar.checked = dataCalendar.check;
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
        calendarID: state.createdEvent.calendarID
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
