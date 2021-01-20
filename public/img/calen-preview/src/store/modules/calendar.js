import axios from "axios";
import lodash from 'lodash';
import moment from "moment-timezone";
import EMPTY_EVENT from "../../components/const.js"
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
        calendarId: "2225",
        dateEnd: 1592560800,
        dateStart: 1592539200,
        desc: null,
        id: "322571",
        name: "НОВОЕ 6",
        timeZone: 1771927,
        status: {
          externalId: "application",
          id: 1508,
          value: "Заявка"
        }
      },
      {
        calendarId: "2224",
        dateEnd: 1592568000,
        dateStart: 1592553600,
        desc: null,
        id: "322572",
        name: "НОВОЕ 7",
        timeZone: 1771927,
        status: {
          externalId: "application",
          id: 1508,
          value: "Заявка"
        }
      },
      {
        calendarId: "2225",
        dateEnd: 1592604000,
        dateStart: 1592589600,
        desc: null,
        id: "322572",
        name: "НОВОЕ 123",
        timeZone: 1771927,
        status: {
          externalId: "application",
          id: 1508,
          value: "Заявка"
        }
      },
      {
        calendarId: "2225",
        dateEnd: 1592463600,
        dateStart: 1592424000,
        desc: null,
        id: "322572",
        name: "123",
        timeZone: 1771927,
        status: {
          externalId: "application",
          id: 1508,
          value: "Заявка"
        }
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
      id: 123,
      "dateStart": 1590675267,
      "dateEnd": 1590686067,
      "name": "TestEvent4",
      "desc": "TestEventDesk4",
      "calendarId": 4,
      "timeZone": 1771921,
      attendees: [],
      services: [],
      status: {},
      preview: {
        name: "123123",
        desc: "",
        img:"/img/img2.jpg",
        tagsAreaOfInfluence: [],
        tagsPersons: [],
        tagsSubjects: [],
      }
    },
    // event:{
    //   id: 111,
    //   dateStart: 1590491667,
    //   dateEnd: 1590502467,
    //   name: "TestEvent",
    //   desk: "TestEventDesk",
    //   attendees: [],
    //   calendarId: 2,
    //   timeZone: 1771923,
    //   services: [],

    //   preview: {
    //     name: "Preview Name",
    //     desc: "Preview Desc",
    //     img:"/img/img2.jpg",
    //     tagsAreaOfInfluence: [1771942, 1771941],
    //     tagsPersons: [1771939],
    //     tagsSubjects: [1771939],

    //   }

    // },
    editRoom: {
      // address: "пр. Ленина, 92, Тула, Тульская обл.,",
      // capacityRoom: "666",
      // cci: "539421",
      // color: "#78D4F1",
      // coordinates: "54.166607, 37.587232",
      // description: "",
      // detail_text: "",
      // element_id: "1772024",
      // email: "666",
      // fileContract: "/upload/iblock/3d6/Epoha_agile.pdf",
      // id: "2273",
      // imagesRooms: Array(0),
      // moderators: Array(2),
      // name: "Конгресс центр ТПП РФ",
      // numberRoom: "666",
      // phones: Array(1),
      // timeZone: 1771922,
      // xml_id: "calendar_2273",
    },
    userInfo: [{
      code: 123,
      label: "Захаркин Иван"
    }],
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
    statusList: [
      {
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
    services: [
      {
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
    ]
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
          // commit("updateEditEvent", response.data);
          console.log(response.data);
          commit("updateEvent", response.data);
          commit("showPopapEventFullScreen");
          // setTimeout(function() {
          //   $('#calendar-edit-event-popup').modal('show');
          // }, 500)
        }
      });
    },
    getRoomForEdit({commit}, id) {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
                  "ajax":"Y",
                  "action":"get-calendar",
                  "id": id
                },
        success: function(response){
          console.log(response.data);
          commit("updateEditRoom", response.data);
          commit("showPopapAddingCalendar");
          // setTimeout(function() {
          //   $('#popup-room').modal('show');
          // }, 500)
        }
      });
    },
    sendEventEdit({dispatch, commit}, event) {
      $.ajax({
        type: "POST",
        url: "./index.php",

        dataType : "json", 
        cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        data: event,
        success: function(response){
          console.log(response.data)
          console.log("успех");
          // commit("closePopapEventFullScreen");
          dispatch("getEventsInWeek");
        }
      });
    },
    sendEvent({dispatch, getters, commit}) {
      $.ajax({
        type: "POST",
        url: "./index.php",
        dataType : "json", 
        cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        data: getters.dataEventForSend,
        success: function(response){
          console.log("успех");
          // commit("closePopapEventFullScreen");
          dispatch("getEventsInWeek");
        }
      });
    },
    sendNewRoom({dispatch}, event) {
      $.ajax({
        type: "POST",
        url: "./index.php",

        dataType : "json", 
        cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        data: event,
        success: function(response){
          // dispatch("getEventsInWeek");
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
        
      //   ymaps.geocode([Number(coordinatesInArray[0]), Number(coordinatesInArray[1])], {results: 1})
      //   .then(function (res) {
          
      //       var firstGeoObject = res.geoObjects.get(0),
      //           coords = firstGeoObject.geometry.getCoordinates(),
      //           bounds = firstGeoObject.properties.get('boundedBy');

      //       firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
      //       firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
      //       window.yandexMapRoom.geoObjects.add(firstGeoObject);
      //       window.yandexMapRoom.setBounds(bounds, {
      //           checkZoomRange: true
      //       });
      //   })
      // });
      $('.ymaps-modal').modal("show");
    },
    deleteEvent({commit, dispatch}, id) {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
                  "ajax":"Y",
                  "action":"delete-event",
                  "id": id
                },
        success: function(response){
          dispatch("getEventsInWeek");
          // setTimeout(function() {
          //   $('#popup-room').modal('show');
          // }, 500)
        }
      });
    },
    geocode() {
      function geocodeGo() {
        // Забираем запрос из поля ввода.
        var request = $('#room-address').val();
        // Геокодируем введённые данные.
        ymaps.geocode(request).then(function (res) {
            var obj = res.geoObjects.get(0),
                error, hint;

            if (obj) {
                // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
                switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                    case 'exact':
                        break;
                    case 'number':
                    case 'near':
                    case 'range':
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'street':
                        error = 'Неполный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'other':
                    default:
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните адрес';
                }
            } else {
                error = 'Адрес не найден';
                hint = 'Уточните адрес';
            }

            // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
            if (error) {
                // showError(error);
                // showMessage(hint);
                console.log(obg);
            } else {
              console.log("ошибка");
                // showResult(obj);
            }
        }, function (e) {
            console.log(e)
        })
      }
      ymaps.ready(
        geocodeGo()
      )
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
      if(state.event.id) {
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
      state.event.services.forEach((el, index) => {
        formData.append(`services[${index}]`, el);
      });
      state.event.attendees.forEach((el, index) => {
        formData.append(`attendees[${index}]`, el);
      });
      if(!$.isEmptyObject(state.event.preview)) {
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
      const offset = moment().utcOffset()/60;
      const timeZone = state.timeZones.filter(el => {
        return el.utc === offset
      })
      return timeZone[0];
    },
    idChekedCalendars: (state, getters) => {
      return getters.checkedCalendars.map(el=> {
          return el.id
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
      return state.calendars.filter(calendar => calendar.id == id)[0];
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
      return dataStart/ 1000;
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
      return dataEnd / 1000 ;
    },
  },
  mutations: {
    resetEvent(state) {
      this.event = EMPTY_EVENT;
    },
    updateEditRoom(state, event) {
      state.editRoom = event;
    },
    resetEditRoom(state) {
      state.editRoom = {};
    },
    updateEvent(state, event) {
      state.event = {...state.event, ...event};
    },
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
        if(dataCalendar.id === el.id) {
          el.checked = dataCalendar.check
        }
      })
    },
    showPopapEventFullScreen(state) {
      $('#popup-event-fullscreen').modal('show');
      state.shownPopapEventFullScreen = true;

    },
    closePopapEventFullScreen(state) {
      this.event = EMPTY_EVENT;
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
    addCalendar(state, calendar) {
      state.calendars.push(calendar);
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
      $("#popup-room").modal("show");
      
    },
    closePopapAddingCalendar(state) {
      $("#popup-room").modal("hide");
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
