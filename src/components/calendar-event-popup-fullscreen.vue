<template lang="pug">
  .calendar-event-popup-fullscreen
    .calendar-event-popup-fullscreen__close
      button.calendar-event-popup-fullscreen__close-btn(@click="closePopup")
        i.fas.fa-times
    .calendar-popup-event__choice-type
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentEvent}"
        @click="changeTab('event')"
      ) Событие
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentPreview}"
        @click="changeTab('preview')"
      ) Анонс
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentGuest}"
        @click="changeTab('guest')"
      ) Участники
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentAgendas}"
        @click="changeTab('agendas')"
      ) Повестка
      //- button.btn.calendar-popup-event__choice-type-btn(
      //-   :class="{'calendar-popup-event__choice-type-btn_active': showContentHotels}"
      //-   @click="changeTab('hotels')"
      //- ) Гостиницы
      //- button.btn.calendar-popup-event__choice-type-btn(
      //-   :class="{'calendar-popup-event__choice-type-btn_active': showContentReports}"
      //-   @click="changeTab('reports')"
      //- ) Отчетность
    .calendar-event-popup-fullscreen__event-content(v-show="showContentReports")
      .calendar-event-popup-fullscreen__options-row.flex-column
            .calendar-event-popup-fullscreen__options-title.mb-2 Вид
            .v-select-custom.v-select-custom-left-105
              vSelect(
                v-model="kind" :options="kindList"
              )
      .calendar-event-popup-fullscreen__options-row.flex-column
            .calendar-event-popup-fullscreen__options-title.mb-2 Раздел
            .v-select-custom.v-select-custom-left-105
              vSelect(
                v-model="section" :options="sectionList"
              )
      .calendar-event-popup-fullscreen__options-row.flex-column
            .calendar-event-popup-fullscreen__options-title.mb-2 Новость
            input.form-control.form-control-sm(
              v-model="newEvent"
            )
    .calendar-event-popup-fullscreen__event-content(v-show="showContentEvent")
      .calendar-event-popup-fullscreen__header
        .calendar-event-popup-fullscreen__name
          input.calendar-event-popup-fullscreen__input-name(
            v-model="eventName"
            placeholder="Добавьте название"
            )
      .calendar-event-popup-fullscreen__row
        .calendar-event-popup-fullscreen__row-item
          input.btn.text-left.calendar-event-popup-fullscreen__field(
            ref="inputDate" 
            type='text',
            :value='date',  
            onclick='BX.calendar({node: this, field: this, bTime: false});'
            @change="changingDate()"
          )
        .calendar-event-popup-fullscreen__row-item
          time-select(
            :timeStart="`${hourStart}:${minutesStart}`"
            :timeEnd="`${hourEnd}:${minutesEnd}`"
            @changeTimeStart="changeTimeStart($event)"
            @changeTimeEnd="changeTimeEnd($event)"
          )
        .calendar-event-popup-fullscreen__row-item
          .calendar-event-popup-fullscreen__field.calendar-event-popup-fullscreen__field_timezone
            .dropdown
              button.btn.w-100.text-left.d-flex.justify-content-between.align-items-center.calendar-event-popup-fullscreen__field(disabled type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                | {{selectedTimezone.label}}
                i.fas.fa-chevron-down
              .dropdown-menu(aria-labelledby='dropdownMenuButton')
                button.dropdown-item(
                  v-for="timeZone in timeZonesForSelect"
                  @click="selectedTimezone = timeZone"
                  ) {{timeZone.label}}
        .calendar-event-popup-fullscreen__row-item.ml-4
          label.checkbox.text-muted
            input.checkbox__input(type='checkbox' v-model="public")
            .checkbox__title Показывать всем
      .calendar-event-popup-fullscreen__nav
        .calendar-event-popup-fullscreen__nav-item Опции
      .calendar-event-popup-fullscreen__options
        event-options-services(:servicesList="services" :eventServices="selectedServices" @changeServices="changeServices($event)")

        //- .calendar-event-popup-fullscreen__options-row
        //-   .calendar-event-popup-fullscreen__options-checkbox-item(v-for="service in services")
        //-     label.checkbox
        //-       input.checkbox__input(type="checkbox" :checked="isServiceChecked(service)" @change="checkService(service)")
        //-       .checkbox__title {{service.value}}
        

        .calendar-event-popup-fullscreen__options-row.flex-column
            .calendar-event-popup-fullscreen__options-title.mb-2 Ответственный
            .v-select-custom.v-select-custom-left-105
              vSelect(
                v-model="selectedResponsiblePerson" :options="responsiblePerson"
              )
        .calendar-event-popup-fullscreen__options-row
          .calendar-event-popup-fullscreen__options-title.mr-2 Статус:
          .text-black {{status.value}}

        .calendar-event-popup-fullscreen__options-row.align-items-center
          .calendar-event-popup-fullscreen__options-title Календарь
          .calendar-event-popup-fullscreen__options-item
            calendars-select(
              @changeCalendar="changeCalendar($event)"
              :selectedCalendar="calendar"
              
            )
        .calendar-event-popup-fullscreen__options-row.align-items-center
          .calendar-event-popup-fullscreen__options-title Ссылка на страницу мероприятий
          .calendar-event-popup-fullscreen__options-item
            input.form-control.form-control-sm(type="text" v-model="link")
        .calendar-event-popup-fullscreen__options-row
          textarea.form-control.calendar-event-popup-fullscreen__textarea(
            placeholder="Описание"
            v-model="eventDesc"
          )
    
    div(v-show="showContentPreview")
      event-preview(
        @savePreview="savePreview($event)"
        :previewData="preview"
        :date="date"
      )
    div(v-show="showContentGuest")
      event-participant(
        @changeParticipant="changeParticipant($event)"
        @changeTemplates="changeTemplates($event)"
        @changeregistration="changeregistration($event)"
        @changePersonHotel="changePersonHotel($event)"
        :selectedParticipant="selectedParticipant"
        :eventId="event.id"
        :registration="registration"
        :hotels="hotels"
      )
    div(v-show="showContentAgendas")
      event-agendas(
        :dateStart="dateStart"
        :dateEnd="dateEnd"
        :selectedTimezone="selectedTimezone"
        @changeAgendas="changeAgendas($event)"
        :agendasList="agendas"
      )
    div(v-show="showContentHotels")
      event-hotels(
        :hotels="hotels"
        @changeHotels="changeHotels($event)"
        @changeParticipantFromHotel="changeParticipantFromHotel($event)"
      )
    .text-right.mt-auto
        button.btn.calendar-event-popup-fullscreen__btn-save(
          v-show="!showContentPreview"
          :disabled="savingEvent"
          @click="saveEvent"
          ref="btnSaveEvent"
        )
          span.spinner-border.spinner-border-sm.mr-2(role="status" aria-hidden="true" v-show="savingEvent")
          span Сохранить
</template>

<script>
import calendarsSelect from "./calendars-select.vue";
import vSelect from "./v-select/components/Select.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import dropdownTime from "./dropdown-time.vue";
import eventAgendas from "./event-agendas/event-agendas.vue";
import eventPreview from "./event-preview.vue";
import eventParticipant from "./event-participant/event-participant.vue";
import eventHotels from "./event-hotels/event-hotels.vue";
import timeSelect from "./time-select.vue";
import eventOptionsServices from "./event-popup/event-options-services.vue"
import { HOURS, MINUTES } from "./const.js";
import _ from "lodash";

export default {
  data() {
    return {
      eventDesc: "",
      eventName: "",
      timeStart: "",
      timeEnd: "",
      hourStart: "",
      hourEnd: "",
      minutesStart: "",
      minutesEnd: "",
      status: {},
      date: "",
      preview: {},
      calendar: {},
      selectedTimezone: {},
      attendees: [],
      selectedTemplates: [],
      templates: [],
      selectedServices: [],
      optionsGuest: [],
      selectedGuest: [],
      selectedResponsiblePerson: {
        lable: "",
        code: ""
      },
      agendas: [
        // {
        //   id: "1772182",
        //   name: "Повестка 1",
        //   speakers: [
        //     {
        //       avatar: "",
        //       code: 5904,
        //       email: "volskaya@tpphmao.ru",
        //       label: "Вольская Ядвига",
        //       roles: Array(0),
        //       work_company: "",
        //       work_department: "",
        //       work_phone: "",
        //       work_position: "помощник президента",
        //     },
        //     {
        //       avatar: "",
        //       code: 6746,
        //       email: "Shakurskaya_y@tpp-to.ru",
        //       label: "Шакурская Юлия",
        //       work_company: "",
        //       work_department: "",
        //       work_phone: "",
        //       work_position: "помощник президента",
        //     },
        //     {
        //       avatar: "",
        //       code: 7249,
        //       email: "zis@forumedia.ru",
        //       label: "Захаркин Иван",
        //       roles: Array(0),
        //       work_company: "",
        //       work_department: "",
        //       work_phone: "",
        //       work_position: "помощник президента",
        //     },
        //   ],
        //   timeEnd: 1593581400,
        //   timeStart: 1593576000
        // },
        // {
        //   id: "1772183",
        //   name: "Повестка 2",
        //   speakers: [],
        //   timeEnd: 1593584100,
        //   timeStart: 1593579600
        // },
      ],
      hotels:[],
      registration: [],
      responsiblePerson: [],
      showContentEvent: true,
      showContentPreview: false,
      showContentGuest: false,
      showContentAgendas: false,
      showContentHotels: false,
      showContentReports: false,
      kindList: [],
      kind: {},
      sectionList: [],
      section: {},
      newEvent: '',
      selectedParticipant: [
      ],
      link: '',
      public: false,
      calendarServices: [],
      services: []
      
    };
  },
  methods: {
    ...mapMutations([
      "closePopapEventFullScreen",
      "resetStateCreatedEvent",
      "closePopupCreatedEvent",
      "updateEvent"
    ]),
    ...mapActions(["sendEvent"]),
    changeParticipant(participants) {
      this.selectedParticipant = participants;
    },
    changeTemplates(templates) {
      this.selectedTemplates = templates;
    },
    changeAgendas(agendas) {
      this.agendas = agendas;
    },
    changeHotels(hotels) {
      this.hotels = hotels
    },
    changePersonHotel(data) {
      
      this.hotels = this.hotels.map(el => {
        if(el.id && el.id === data.hotel.id) {
          el.responsiblePerson[0] = data.person;
        }
        if(el.ids && el.ids === data.hotel.ids) {
          el.responsiblePerson[0] = data.person;
        }
        return el;
      })
    },
    changeregistration(registration) {
      this.registration = registration;
    },
    changingDate() {
      this.date = this.$refs.inputDate.value;
    },
    changeTab(tab) {
      switch (tab) {
        case "guest": {
          this.showContentEvent = false;
          this.showContentPreview = false;
          this.showContentGuest = true;
          this.showContentAgendas = false;
          this.showContentHotels = false;
          this.showContentReports = false;
          break;
        }
        case "preview": {
          this.showContentEvent = false;
          this.showContentPreview = true;
          this.showContentGuest = false;
          this.showContentAgendas = false;
          this.showContentHotels = false;
          this.showContentReports = false;
          break;
        }
        case "agendas": {
          this.showContentEvent = false;
          this.showContentPreview = false;
          this.showContentGuest = false;
          this.showContentAgendas = true;
          this.showContentHotels = false;
          this.showContentReports = false;
          break;
        }
        case "hotels": {
          this.showContentEvent = false;
          this.showContentPreview = false;
          this.showContentGuest = false;
          this.showContentAgendas = false;
          this.showContentHotels = true;
          this.showContentReports = false;
          break;
        }
        case "reports": {
          this.showContentEvent = false;
          this.showContentPreview = false;
          this.showContentGuest = false;
          this.showContentAgendas = false;
          this.showContentHotels = false;
          this.showContentReports = true;
          break;
        }
        case "event":
        default: {
          this.showContentEvent = true;
          this.showContentPreview = false;
          this.showContentGuest = false;
          this.showContentAgendas = false;
          this.showContentHotels = false;
          this.showContentReports = false;
          break;
        }
      }
    },
    savePreview(previewData) {
      this.preview = previewData;
    },
    closePopup() {
      this.resetStateCreatedEvent();
      this.closePopapEventFullScreen();
    },
    saveEvent() {
      if(!this.eventName) {
        return;
      }
      this.updateEvent({
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        name: this.eventName,
        desc: this.eventDesc,
        attendees: this.selectedParticipant.map(el => {
          return { code: el.code, roles: el.roles };
        }),
        template: this.selectedTemplates,
        calendarId: this.calendar.id,
        timeZone: this.getCurrentTimeZone.id,
        preview: this.preview,
        status: this.status,
        services: this.selectedServices,
        agendas: this.agendas,
        registration: this.registration,
        hotels: this.hotels,
        link: this.link,
        public: this.public ? 1 : 0
      });
      this.sendEvent();
      // this.resetStateCreatedEvent();
      // this.closePopupCreatedEvent();
      // this.closePopapEventFullScreen();
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: (loading, search, vm) => {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "search-users",
          name: `${search}`
        },
        success: function(response) {
          vm.optionsGuest = response.data;
          loading(false);
        }
      });
    },
    changeParticipantFromHotel(data) {
      if(!data) return;
      const isPersonInParticipant = this.selectedParticipant.some(el => {
        return el.code === data.code
      });
      if(!isPersonInParticipant) {
        this.selectedParticipant.push(data)
      }
    },
    changeTimeStart(data) {
      this.hourStart = data.split(':')[0];
      this.minutesStart = data.split(':')[1];
    },
    changeTimeEnd(data) {
      this.hourEnd = data.split(':')[0];
      this.minutesEnd = data.split(':')[1];
    },
    requestCalendarServices() {
      var vm = this;
      $.ajax({
          type: "POST",
          url: "./index.php",
          data: {
              "ajax": "Y",
              "action": "get-services",
              "id": this.calendar.id
          },
          success: function(response) {
              if(response.success && response.data) {
                vm.services = response.data
              } else {
                vm.services = [];
              }
              
          }
      });
    },
    changeCalendar(calendar) {
      this.calendar = calendar;
      this.requestCalendarServices();
    },
    changeServices(services) {
        this.selectedServices = services;
    },
  },

  computed: {
    ...mapState({
      createdEvent: state => state.calendar.createdEvent,
      calendars: state => state.calendar.calendars,
      timeZones: state => state.calendar.timeZones,
      // services: state => state.calendar.services,
      event: state => state.calendar.event,
      userInfo: state => state.calendar.userInfo,
      savingEvent: state => state.calendar.loadings.savingEvent
    }),
    ...mapGetters([
      "tagsPersonsForSelect",
      "tagsSubjectsForSelect",
      "tagsAreaOfInfluenceForSelect",
      "getCalendar",
      "timeZone",
      "getTimeZoneById",
      "getCurrentTimeZone",
      "getStatusByExternalId"
    ]),
    templatesForSelect() {
      return this.templates.map(el => {
        return {
          label: el.name,
          label: el.id
        };
      });
    },
    dateStartMoment() {
      return moment.tz(
        this.event.dateStart * 1000,
        this.getCurrentTimeZone.name
      );
    },
    dateEndMoment() {
      return moment.tz(this.event.dateEnd * 1000, this.getCurrentTimeZone.name);
    },
    timeZonesForSelect() {
      return this.timeZones.map(timezone => {
        return {
          label: timezone.xmlId,
          code: timezone.id
        };
      });
    },
    dateForMoment() {
      return this.date
        .split(".")
        .reverse()
        .join("-");
    },
    selectedTimezoneForMoment() {
      return this.timeZones.filter(el => {
        return el.id === this.selectedTimezone.code;
      })[0].name;
    },
    dateStart() {
      return moment
        .tz(
          `${this.dateForMoment} ${this.hourStart}:${this.minutesStart}:00`,
          `${this.selectedTimezoneForMoment}`
        )
        .unix();
    },
    dateEnd() {
      return moment
        .tz(
          `${this.dateForMoment} ${this.hourEnd}:${this.minutesEnd}:00`,
          `${this.selectedTimezoneForMoment}`
        )
        .unix();
    },
    allTags() {
      return [
        ...this.preview.tagsAreaOfInfluence,
        ...this.preview.tagsPersons,
        ...this.preview.tagsSubjects
      ];
    }
  },
  components: {
    calendarsSelect,
    vSelect,
    dropdownTime,
    eventPreview,
    eventAgendas,
    eventParticipant,
    eventHotels,
    timeSelect,
    eventOptionsServices
  },
  created() {
    this.hours = HOURS;
    this.minutes = MINUTES;

    // если событие создается
    
    if (!this.event.id) {
      this.selectedTimezone = {
        code: this.getCurrentTimeZone.id,
        label: this.getCurrentTimeZone.xmlId
      };
      this.calendar = this.calendars[0];
      this.status = this.getStatusByExternalId("application");
      this.selectedResponsiblePerson = this.userInfo[0];
    } else {
      this.selectedTimezone = this.timeZonesForSelect.filter(
        el => el.code === this.event.timeZone
      )[0];
      this.calendar = this.getCalendar(this.event.calendarId);
      this.status = !this.event.status ? this.getStatusByExternalId("application") : this.event.status;


      this.selectedParticipant = this.event.attendees.map(el => {
        return {...el};
      });

      this.selectedServices = [...this.event.products];
      this.selectedResponsiblePerson = this.event.responsiblePerson;
      this.agendas = this.event.agendas;

      if (!$.isEmptyObject(this.event.preview)) {
        this.preview.name = this.event.preview.name;
        this.preview.desc = this.event.preview.desc;
        if (this.event.preview.tagsAreaOfInfluence) {
          this.preview.tagsAreaOfInfluence = this.event.preview.tagsAreaOfInfluence;
        } else {
          this.preview.tagsAreaOfInfluence = [];
        }
        if (this.event.preview.tagsPersons) {
          this.preview.tagsPersons = this.event.preview.tagsPersons;
        } else {
          this.preview.tagsPersons = [];
        }
        if (this.event.preview.tagsPersons) {
          this.preview.tagsSubjects = this.event.preview.tagsSubjects;
        } else {
          this.preview.tagsSubjects = [];
        }
        this.preview.img = this.event.preview.img;
      }
    }

    this.hourStart = this.dateStartMoment.format("HH");
    this.minutesStart = this.dateStartMoment.format("mm");
    this.hourEnd = this.dateEndMoment.format("HH");
    this.minutesEnd = this.dateEndMoment.format("mm");
    this.date = this.dateStartMoment.format("DD.MM.YYYY");
    this.eventName = this.event.name;
    this.eventDesc = this.event.desc;
    this.link = !this.event.link ? '' : this.event.link;
    this.public = !!this.event.public;
    // this.registration = this.event.registration
    // .filter(el => !!el.VALUE)
    // .map((el) => {
    //   return {
    //     id: el.VALUE,
    //     externalId: el.CODE,
    //     value: el.NAME
    //   }
    // });
    this.registration = this.event.registration
    .filter(el => !!el.VALUE)
    .map((el) => el.VALUE);
    this.hotels = this.event.hotels.map(el=> {
      return {...el};
    });

    this.selectedTimezone = {
        code: this.getCurrentTimeZone.id,
        label: this.getCurrentTimeZone.xmlId
      };
  },
  mounted() {
    $(this.$refs.btnSaveEvent).popover({
      content: 'Укажите название события',
      trigger: 'focus',
      animation: true,
      placement:'top' 
    });
    this.requestCalendarServices();
    // this.services = this.$store.state.calendar.services;

  }
};
</script>

<style lang="scss">
.calendar-event-popup-fullscreen__timezone {
  .vs__dropdown-toggle {
    border: none;
    background-color: #f0efef;
  }

  .v-select {
    // background: #f0efef;
    font-size: 14px;
    color: #656875;
    height: 35px;
  }
}

// .vs__dropdown-toggle {
//   border: none;
// }

.vs__hidden {
  max-height: 300px;
  overflow: auto;
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  position: absolute;
  background: #fff;
  z-index: 100;
  padding: 5px;
  border-radius: 3px;
  width: 100%;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-top: none;
}

.vs__button__collapse {
  position: absolute;
  top: 0;
  right: 0;
}

.v-select-custom .vs__button__collapse {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  color: #333;
  line-height: 1.4;
  margin: 4px 2px 0px 2px;
  padding: 0 0.25em;
  z-index: 10;
}

.v-select-custom .vs__actions .vs__open-indicator {
  display: none;
}
.v-select-custom .vs__actions {
  position: absolute;
  top: -32px;
  left: 85px;
  cursor: pointer;
}

.v-select-custom-left-105 .vs__actions {
  left: 105px;
}
.v-select-custom-left-65 .vs__actions {
  left: 65px;
}
.v-select-custom-left-80 .vs__actions {
  left: 80px;
}
.v-select-custom .vs__actions::after {
  content: "+ Добавить";
  color: #4162a9;
  display: block;
}
.v-select-custom .vs__selected_hidden {
  display: none;
}

.calendar-popup-event__file {
  display: flex;
  position: relative;
  align-items: center;
}
.calendar-popup-event__file-input {
  opacity: 0;
  z-index: -10;
  height: 0;
  width: 0;
}
.calendar-popup-event__file-img {
  max-height: 40px;
  width: auto;
  margin-right: 10px;
}
.calendar-popup-event__file-title {
  color: #4162a9;
}
.calendar-popup-event__file-btn {
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: #656875;
  font-size: 12px;
  &:focus {
    outline: none;
  }
}
</style>