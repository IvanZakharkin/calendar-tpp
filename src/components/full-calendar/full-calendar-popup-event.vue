<template lang="pug">
.card.calendar-popup-event
  .card-body.calendar-popup-event__body
    button.calendar-popup-event__close(
      @click="closePopup()"
    )
      i.fas.fa-times
    .calendar-popup-event__choice-type
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentEvent}"
        @click="showContentEvent = true; showContentPreview = false"
      ) Событие
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentPreview}"
        @click="showContentEvent = false; showContentPreview = true"
      ) Анонс
    .calendar-popup-event__event-content(v-if="showContentEvent")
      .calendar-popup-event__name.mb-3
        input.calendar-popup-event__name-input(
          placeholder='Название'
          v-model="eventName")
      .calendar-popup-event__parameters
        .calendar-popup-event__parameter.d-flex
          input.calendar-popup-event__input.calendar-popup-event__input-date(
            ref="inputDate" 
            type='text',
            :value='date',  
            onclick='BX.calendar({node: this, field: this, bTime: false});'
            @change="changingDate()"
            )
          dropdown-time(
            :times="hours"
            :currentTime="hourStart"
            @changeTime="hourStart = $event"
          )
          dropdown-time(
            :times="minutes"
            :currentTime="minutesStart"
            @changeTime="minutesStart = $event"
          )
          .p-2 -
          dropdown-time(
            :times="hours"
            :currentTime="hourEnd"
            @changeTime="hourEnd = $event"
          )
          dropdown-time(
            :times="minutes"
            :currentTime="minutesEnd"
            @changeTime="minutesEnd = $event"
          )
        .calendar-popup-event__parameter.flex-column
          .mb-2 Ответсвенный
          .v-select-custom
            vSelect(
              v-model="selectedResponsiblePerson" :options="responsiblePerson"
            )
        .calendar-popup-event__parameter.flex-column
          .mb-2 Участники
          .v-select-custom
            vSelect(multiple v-model="selectedGuest" :options="optionsGuest" @search="onSearch")
        .calendar-popup-event__parameter
          .mb-2 Шаблон
          .v-select-custom
            v-select(v-model="selectedGroups" :options="templatesForSelect")
        .calendar-popup-event__parameter.d-flex
          .mr-2 Статус:
          .text-primary {{status.value}}
        .calendar-popup-event__parameter.d-flex
          .mr-2 Календарь
          calendars-select(
            @changeCalendar="calendar = $event"
            :selectedCalendar="calendar"
          )
      .calendar-popup-event__btns
        button.btn.calendar-popup-event__btn.calendar-popup-event__btn_parameters(@click="showDetailPopupEvent()") Другие параметры
        button.btn.calendar-popup-event__btn.calendar-popup-event__btn_save(
          @click="saveEvent()"
        ) Сохранить
    event-preview(
      :date="date"
      v-show="showContentPreview"
      @savePreview="savePreview($event)"
    )
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import vSelect from "../v-select/components/Select.vue";
import calendarsSelect from "../calendars-select.vue";
import moment from "moment-timezone";
import eventPreview from "../event-preview.vue";
import dropdownTime from "../dropdown-time.vue";
import { HOURS, MINUTES } from "../const.js";

export default {
  data() {
    return {
      hours: [],
      minutes: [],

      hourStart: "",
      minutesStart: "",
      hourEnd: "",
      minutesEnd: "",
      /* событие */
      eventName: "",
      selectedGuest: [],
      selectedTemplates: [],
      selectedResponsiblePerson: [],
      optionsGuest: [],
      status: {},
      calendar: {},
      selectedTimezone: {},
      preview: {
        // name: "",
        // desc: "",
        // img: "",
        // tagsAreaOfInfluence: [],
        // tagsPersons: [],
        // tagsSubjects: []
      },
      responsiblePerson: [],
      templates: [],
      timeStart: "",
      timeEnd: "",
      date: "",
      showContentEvent: true,
      showContentPreview: false
    };
  },
  watch: {
    hourEnd: function(val) {
      // if (Number(this.hourStart) > Number(val)) {
      //   hourStart = this.hourStart.split("");
      //   hourStart[1] = hourStart[1] + 1;
      //   hourStart = hourStart.join("");
      //   this.hourEnd = hourStart;
      // }
    },
  },
  computed: {
    ...mapState({
      createdEvent: state => state.calendar.createdEvent,
      calendars: state => state.calendar.calendars,
      event: state => state.calendar.event,
      timeZones: state => state.calendar.timeZones,
    }),
    ...mapGetters([
      "tagsPersonsForSelect",
      "tagsSubjectsForSelect",
      "tagsAreaOfInfluenceForSelect",
      "getCurrentTimeZone",
      "getStatusByExternalId"
    ]),

    dateStartMoment() {
      return moment.tz(
        this.event.dateStart * 1000,
        this.getCurrentTimeZone.name
      );
    },
    dateEndMoment() {
      return moment.tz(
        this.event.dateEnd * 1000, 
        this.getCurrentTimeZone.name);
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
    templatesForSelect() {
      return this.templates.map(el => {
        return {
          label: el.name,
          label: el.id
        };
      });
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
  },
  components: {
    vSelect,
    calendarsSelect,
    eventPreview,
    dropdownTime
  },
  created() {
  this.hours = HOURS;
  this.minutes = MINUTES;

  this.hourStart = this.dateStartMoment.format("HH");
  this.minutesStart = this.dateStartMoment.format("mm");
  this.hourEnd = this.dateEndMoment.format("HH");
  this.minutesEnd = this.dateEndMoment.format("mm");
  this.date = this.dateStartMoment.format("DD.MM.YYYY");
  this.status = this.getStatusByExternalId("application");
  this.calendar = this.calendars[0];
  this.selectedTimezone = this.timeZonesForSelect.filter(
      el => el.code === this.getCurrentTimeZone.id
    )[0];
  this.getTemplates();
  },
  methods: {
    ...mapMutations([
      "resetStateCreatedEvent",
      "closePopupCreatedEvent",
      "updateCreatedEvent",
      // "addCreatedEventToEvents",
      "showPopapEventFullScreen",
      "updateEvent"
    ]),
    savePreview(previewData) {
      this.preview = previewData;
    },
    showDetailPopupEvent() {
      // this.resetPreviewData();
      this.updateEvent({
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        name: this.eventName,
        attendees: this.selectedGuest.map(el => el.code),
        template: this.selectedGroups,
        calendarId: this.calendar.ID,
        timeZone: this.getCurrentTimeZone.id,
        preview: this.preview,
        status: this.status
      });
      this.closePopupCreatedEvent();
      this.showPopapEventFullScreen();
    },
    closePopup() {
      this.resetStateCreatedEvent();
      this.closePopupCreatedEvent();
    },
    saveEvent() {
      this.updateEvent({
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        name: this.eventName,
        attendees: this.selectedGuest.map(el => el.code),
        template: this.selectedGroups,
        calendarId: this.calendar.ID,
        timeZone: this.getCurrentTimeZone.id,
        preview: this.preview,
        status: this.status
      });
      this.resetStateCreatedEvent();
      this.closePopupCreatedEvent();
    },
    selectCalendar(calendar) {
      this.updateCreatedEvent({
        state: "calendarID",
        value: calendar.id
      });
    },
    getTemplates() {
      const vm = this;
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "get-templates"
        },
        success: function(response) {
          vm.templates = response.data;
        }
      });
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
    changingDate() {
      this.date = this.$refs.inputDate.value;
    },
  }
};
</script>

<style lang="scss" scoped>
// @import "./styles/calendar-popup-event.scss";
// /* .calendar-popup-event {
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%,-50%);
//   position:absolute;
//   z-index: 10;
// }
// .calendar-popup-event__parameter {
//   display: block;
// } */
// .vs__hidden {
//   max-height: 300px;
//   overflow: auto;
//   display: flex;
//   flex-basis: 100%;
//   flex-grow: 1;
//   flex-wrap: wrap;
//   position: absolute;
//   background: #fff;
//   z-index: 100;
//   padding: 5px;
//   border-radius: 3px;
//   width: 100%;
//   border: 1px solid rgba(60, 60, 60, 0.26);
//   border-top: none;
// }

// .vs__button__collapse {
//   position: absolute;
//   top: 0;
//   right: 0;
// }

// .v-select-custom .vs__button__collapse {
//   display: flex;
//   align-items: center;
//   background-color: #f0f0f0;
//   border: 1px solid rgba(60, 60, 60, 0.26);
//   border-radius: 4px;
//   color: #333;
//   line-height: 1.4;
//   margin: 4px 2px 0px 2px;
//   padding: 0 0.25em;
//   z-index: 10;
// }

// .v-select-custom .vs__actions .vs__open-indicator {
//   display: none;
// }
// .v-select-custom .vs__actions {
//   position: absolute;
//   top: -31px;
//   left: 85px;
// }
// .v-select-custom-left-140 .vs__actions {
//   left: 140px;
// }
// .v-select-custom-left-80 .vs__actions {
//   left: 80px;
// }
// .v-select-custom .vs__actions::after {
//   content: "+ Добавить";
//   color: #4162a9;
//   display: block;
// }
// .v-select-custom .vs__selected_hidden {
//   display: none;
// }
// /* 
// .calendar-popup-event__input {
//   border: none;
//   background: #f0efef;
//   color: #656875;
//   margin: 0;
//   height: 35px;
// }
// .calendar-popup-event__input-date {
//   width: 100px;
//   margin-right: 10px
// }

// .calendar-popup-event__btn-outline {
//   border-color: #2164b1;
//   color: #2164b1;
// }

// .calendar-popup-event__name-input {
//   padding-left: 0;
// } */

// .calendar__event-btn {
//   position: absolute;
//   top: 10px;
//   right: 10px;
// }
</style>