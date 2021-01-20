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
							@click="toggleWeek('prev')"
						)
							i.fas.fa-chevron-left
						.calendar-page__choise-date-item
						button.btn.calendar-page__btn-gray(@click="goToCurrentDate") Сегодня
						.calendar-page__choise-date-item
						button.btn.calendar-page__btn-gray(
							@click="toggleWeek('next')"
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
			calendar-event-popup-fullscreen(v-if="shownPopapEventFullScreen")
			popup-add-room(v-if="shownPopapAddingCalendar")
			ymaps
</template>

<script>
/* eslint-disable */
import datePicker from "./components/date-picker.vue";
import FullCalendar from "./components/full-calendar.vue";
import calendarsList from "./components/calendars-list.vue";
import calendarEventPopupFullscreen from "./components/calendar-event-popup-fullscreen.vue";
import popupAddRoom from "./components/popup-add-room.vue";
import ymaps from "./components/ymaps.vue";

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
    ymaps
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
      shownPopapEventFullScreen: state => state.calendar.shownPopapEventFullScreen,
      shownPopapAddingCalendar: state => state.calendar.shownPopapAddingCalendar,
      createdEvent: state => state.calendar.createdEvent
    })
  },
  ...mapGetters([
    "getDataStartWeek",
    "getDataEndWeek"
  ]),
  methods: {
    ...mapMutations([
      "setCurrentDate",
      "toggleWeek",
      "updateEvents",
      "resetStateCreatedEvent",
      "showPopapAddingEvent",
      "updateCreatedEvent",
      "closePopupCreatedEvent"
    ]),
    ...mapActions([
      "getEventsInWeek",
    ]),
    goToCurrentDate() {
      this.setCurrentDate();
    },
    toggleCurrentWeek() {
      this.toggleWeek();
    },
    createEvent() {
      const data = new Date().getTime();
      this.updateCreatedEvent(
        {
          state: "dataStart",
          value: data
        }
      );
      this.updateCreatedEvent(
        {
          state: "dataEnd",
          value: data
        }
      );
      this.showPopapAddingEvent();
      
    }
    // click() {
    //   console.log(this.shownPopapAddingEvent);
    //   if (this.shownPopapAddingEvent) {
    //     this.resetStateCreatedEvent();
    //   }
    // }
  },
  mounted() {
    // this.setCurrentDate();
  },
  created() {
    this.setCurrentDate();
    this.getEventsInWeek();
    // axios.get("http://localhost:3000/events").then(response => {
    //   this.updateEvents(response.data);
    // });
  },
  mounted() {
    const vm = this;
    document.addEventListener('click', function(event){
      console.log(event.target);
      console.log(event.currentTarget);
      if (vm.createdEvent.create === true) {
        vm.updateCreatedEvent({
          state: "create",
          value: false
        });
        vm.showPopapAddingEvent();
      }
    })
  
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

@import './components/styles/base.scss';
@import './components/styles/checkbox.scss';
@import './components/styles/popup-add-room.scss';
@import './components/styles/tags.scss';
@import './components/styles/calendar.scss';
@import './components/styles/checkbox-calendar.scss';
@import './components/styles/calendar-event-popup-fullscreen.scss';
@import './components/styles/calendar-page.scss';
@import './components/styles/calendar-popup-add-calendar.scss';
@import './components/styles/calendar-popup-event-detail.scss';
@import './components/styles/calendar-popup-event.scss';
@import './components/styles/bcalendar.scss';
@import './components/styles/lcalendar.scss';
@import './components/styles/calendars-select.scss';
</style>