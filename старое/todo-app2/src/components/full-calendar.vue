<template lang="pug">
  .bcalendar
    .bcalendar__view-week-days(v-if="displayType === 'week'")
      .bcalendar__days
        full-calendar-day(
          v-for="(date, index) in datesInWeek"
          :date="date"
        )
      vueCustomScrollbar(class="scroll-area")
        .bcalendar__week-grid
          .bcalendar__week-grid-cols
            .bcalendar__week-grid-time
              each time in ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
                .bcalendar__week-grid-hour
                  .bcalendar__week-grid-hour-value= time
            full-calendar-week-day(
              v-for="(date, index) in datesInWeek"
              :date="date"
            )
            popup-event-details(
              v-if="shownPopapDetailsEvent"
            )
    .bcalendar__view-schedule(v-if="displayType === 'schedule'")
      full-calendar-schedule(
        :dates="datesInWeek"
        :year="year"
      )
    full-calendar-popup-event(v-if="shownPopapAddingEvent")
    calendar-event-edit-popup(v-if="shownPopapEventEdit")
</template>

<script>
import fullCalendarDay from "./full-calendar-day.vue";
import fullCalendarWeekDay from "./full-calendar-week-day.vue";
import fullCalendarPopupEvent from "./full-calendar-popup-event.vue";
import fullCalendarSchedule from "./full-calendar-schedule.vue";
import popupAddingCalendar from "./popup-adding-calendar.vue";
import calendarEventEditPopup from './calendar-event-edit-popup.vue';
import popupEventDetails from "./popup-event-details";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import { mapState } from "vuex";

const DAYS_WEEK = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

export default {
  data() {
    return {
      //   datesInWeek: this.getdatesInWeek({ year: 2020, month: 5, day: 14 })
    };
  },
  props: {
    displayType: {
      type: String,
      default: "week"
    }
  },
  components: {
    fullCalendarDay,
    fullCalendarWeekDay,
    fullCalendarPopupEvent,
    fullCalendarSchedule,
    popupAddingCalendar,
    vueCustomScrollbar,
    calendarEventEditPopup,
    popupEventDetails
  },
  computed: {
    ...mapState({
      day: state => state.calendar.day,
      year: state => state.calendar.year,
      month: state => state.calendar.month,
      todayDate: state => state.calendar.todayDate,
      todayYear: state => state.calendar.todayYear,
      todayMonth: state => state.calendar.todayMonth,
      selectedDate: state => state.calendar.selectedDate,
      shownPopapAddingEvent: state => state.calendar.shownPopapAddingEvent,
      shownPopapAddingCalendar: state => state.calendar.shownPopapAddingCalendar,
      shownPopapEventEdit: state => state.calendar.shownPopapEventEdit,
      shownPopapDetailsEvent: state => state.calendar.shownPopapDetailsEvent
    }),
    datesInWeek() {
      let year = this.year;
      let month = this.month;
      let day = this.day;
      let dayInWeek = new Date(year, month, day).getDay();
      if (dayInWeek === 0) dayInWeek = 7;
      const datesInWeek = new Array(7).fill(0);
      for (let i = 0; i < 7; i += 1) {
        const date = new Date(year, month, day - dayInWeek + 1 + i);
        datesInWeek[i] = {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          daysWeek: DAYS_WEEK[date.getDay()]
        };
      }
      return datesInWeek;
    }
  },
  methods: {
  }
};
</script>

<style>
.bcalendar {
  position: relative;
}

.scroll-area {
  position: relative;
  height: 100%;
}

.bcalendar__week-grid-cols {
  position: relative;
}
</style>
