/* eslint-disable */
<template lang="pug">
  section.calendar-page.py-5.bg-light.d-none.d-md-block(
  )
    .container-fluid.px-5.calendar-page__container
      .row.mb-4
        .col-6.d-flex.align-items-center
          button.btn.calendar-page__btn-create(
            @click="createEvent()"
          ) + Создать событие
          .calendar-page__choise-date
            .calendar-page__choise-date-item
            button.btn.calendar-page__btn-gray(
              @click="toggleCurrentWeek('prev')"
            )
              i.fas.fa-chevron-left
            .calendar-page__choise-date-item
            button.btn.calendar-page__btn-gray(@click="goToCurrentDate") Сегодня
            .calendar-page__choise-date-item
            button.btn.calendar-page__btn-gray(
              @click="toggleCurrentWeek('next')"
            )
              i.fas.fa-chevron-right
            .calendar-page__choise-date-item
            span {{months[month]}} {{year}} год
        .col-6.d-flex.justify-content-end
          button.btn.calendar-page__btn-icon
            i.fas.fa-search
          button.btn.calendar-page__btn-icon
            i.far.fa-question-circle
          button.btn.calendar-page__btn-icon
            i.fas.fa-cog
          //- select.dropdown.calendar-page__view(v-model="displayType")
          //- 	option(value="week" selected) Неделя
          //- 	option(value="schedule") Расписание
          v-select(
            v-model="displayType"
            :options="[{label: 'Неделя', code: 'week'}, {label: 'Расписание', code: 'schedule'}]")
      .calendar-page__row
        .calendar-page__col-left
          date-picker
          calendars-list
        .calendar-page__col-right
          full-calendar(
            :displayType="displayType.code"
          )
      .modal.popup-fullscreen#popup-event-fullscreen
        .modal-dialog.popup-fullscreen-dialog
          .modal-content.popup-fullscreen-content
            .text-center(v-if="!shownPopapEventFullScreen")
              .spinner-border(role='status')
                span.sr-only Loading...    
            calendar-event-popup-fullscreen(v-if="shownPopapEventFullScreen")
      .modal.popup-fullscreen#popup-room
        .modal-dialog.popup-fullscreen-dialog
          .modal-content.popup-fullscreen-content
            .text-center(v-if="!shownPopapAddingCalendar")
              .spinner-border(role='status')
                span.sr-only Loading...
            popup-add-room(v-if="shownPopapAddingCalendar")
      .modal.popup-fullscreen#calendar-edit-event-popup
        .modal-dialog.popup-fullscreen-dialog
          .modal-content.popup-fullscreen-content
            .text-center(v-if="!shownPopapEventEdit")
              .spinner-border(role='status')
                span.sr-only Loading...
            calendar-event-edit-popup(v-if="shownPopapEventEdit")
      ymaps
</template>

<script>
/* eslint-disable */
import datePicker from "./components/date-picker/date-picker.vue";
import FullCalendar from "./components/full-calendar.vue";
import calendarsList from "./components/calendars-list.vue";
import calendarEventPopupFullscreen from "./components/calendar-event-popup-fullscreen.vue";
import calendarEventEditPopup from "./components/calendar-event-edit-popup.vue";
import popupAddRoom from "./components/popup-add-room.vue";
import ymaps from "./components/ymaps.vue";

import moment from "moment-timezone";

import axios from "axios";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  components: {
    datePicker,
    FullCalendar,
    calendarsList,
    calendarEventPopupFullscreen,
    popupAddRoom,
    ymaps,
    calendarEventEditPopup
  },
  data() {
    return {
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
      ],
      displayType: { label: "Неделя", code: "week" }
    };
  },
  computed: {
    ...mapState({
      year: state => state.calendar.year,
      month: state => state.calendar.month,
      day: state => state.calendar.day,
      todayDate: state => state.calendar.todayDate,
      todayYear: state => state.calendar.todayYear,
      todayMonth: state => state.calendar.todayMonth,
      selectedDate: state => state.calendar.selectedDate,
      events: state => state.calendar.events,
      shownPopapAddingEvent: state => state.calendar.shownPopapAddingEvent,
      shownPopapEventFullScreen: state =>
        state.calendar.shownPopapEventFullScreen,
      shownPopapAddingCalendar: state =>
        state.calendar.shownPopapAddingCalendar,
      createdEvent: state => state.calendar.createdEvent,
      shownPopapEventEdit: state => state.calendar.shownPopapEventEdit,
      
    })
  },
  ...mapGetters(["getDataStartWeek", "getDataEndWeek"]),
  methods: {
    ...mapMutations([
      "setCurrentDate",
      "toggleWeek",
      "updateEvents",
      "resetStateCreatedEvent",
      "showPopapAddingEvent",
      "updateCreatedEvent",
      "closePopupCreatedEvent",
      "updateEvent",
      "showPopapEventFullScreen",
      "closePopapEventFullScreen"
    ]),
    ...mapActions(["getEventsInWeek", "getCalendars"]),
    goToCurrentDate() {
      this.setCurrentDate();
      this.getEventsInWeek();
    },
    toggleCurrentWeek(data) {
      this.toggleWeek(data);
      this.getEventsInWeek();
    },
    createEvent() {
      const data = new Date().getTime();
      this.updateEvent({
        dateStart: data / 1000,
        dateEnd: (data + 3600) / 1000
      });
      // this.updateEvent({
      //   state: "dataEnd",
      //   value: data
      // });
      this.showPopapAddingEvent();
    }
  },
  created() {
    this.setCurrentDate();
    this.getEventsInWeek();
    this.getCalendars();
  },
  mounted() {
    const vm = this;
    // $("#popup-event-fullscreen").on('hide.bs.modal', function (e) {
    //   vm.closePopapEventFullScreen();
    // })
    document.addEventListener("click", function(event) {
      if (vm.createdEvent.create === true) {
        vm.updateCreatedEvent({
          state: "create",
          value: false
        });
        vm.showPopapEventFullScreen();
			}
			// if(vm.shownPopapAddingEvent) {
			// 	vm.closePopupCreatedEvent();
			// }
    });
  }
};
</script>
<style lang="scss">
.vs__dropdown-toggle {
  min-width: 145px;
}
.vs__actions .vs__clear {
  display: none;
}

@import "./components/styles/base.scss";
@import "./components/styles/checkbox.scss";
@import "./components/styles/popup-add-room.scss";
@import "./components/styles/tags.scss";
@import "./components/styles/calendar.scss";
@import "./components/styles/checkbox-calendar.scss";
@import "./components/styles/calendar-event-popup-fullscreen.scss";
@import "./components/styles/calendar-page.scss";
@import "./components/styles/calendar-popup-add-calendar.scss";
@import "./components/styles/calendar-popup-event-detail.scss";
@import "./components/styles/calendar-popup-event.scss";
@import "./components/styles/bcalendar.scss";
@import "./components/styles/lcalendar.scss";
@import "./components/styles/calendars-select.scss";
@import "./components/styles/popup-fullscreend.scss";

.calendar-page {
  // height: 100vh;

  &__container {
    position: relative;
  }
  &__row {
    display: flex;
  }

  &__col-left {
    width: 220px;
    margin-right: 35px;
  }
  &__col-right {
    flex: 1;
  }

  &__choise-date {
    display: flex;
    align-items: center;
  }
  &__date {
    font-size: 17px;
  }
  &__choise-date-item {
    margin-right: 5px;
    font-size: 14px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__btn-gray {
    border: 1px solid #656875;
    color: #656875;
    padding: 6px 20px;
    font-size: 14px;
    background: transparent;

    &:hover {
      background-color: #ffffff;
    }
  }
  &__btn-icon {
    color: #656875;
  }

  &__btn-create {
    border: 1px solid #e89d06;
    background-color: #fff;
    color: #e89d06;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    padding: 8px 25px;
    margin-right: 10px;

    &:hover {
      background-color: #e89d06;
      color: #fff;
    }
  }

  &__current-date {
    font-size: 14px;
    color: #656875;

    span {
      font-size: 17px;
    }
  }
  &__view-current {
    border: 1px solid #656875;
    color: #656875;
    padding: 6px 20px;

    &:after {
      height: 0.4375rem;
      width: 0.4375rem;
      transform: rotate(45deg);
      border: 0.125rem solid #656875;
      border-top: none;
      border-left: none;
      margin-left: 0.9375rem;
    }
  }

  &__calendars {
    margin-top: 20px;
  }
  &__calendars-title {
    font-size: 16px;
    text-transform: uppercase;
    padding: 10px 0;
    border-bottom: 1px solid #a1acce;
    margin-bottom: 15px;
  }
  &__calendars-list {
    margin-bottom: 20px;
  }
}
</style>