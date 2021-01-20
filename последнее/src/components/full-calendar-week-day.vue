<template lang="pug">
.bcalendar__week-grid-day(
  @click="test()"
)
	full-calendar-week-day-hour(
		v-for="hour in hours"
		:hour="hour"
		:date="date"
	)
	full-calendar-week-day-event(
		v-for="event in filterEventsDay"
		:event="event"
    @detailsEvent="getDetailsEvent"
	)
	eventGenerate(
    v-if="showCreatedEvent"
    
    )
</template>

<script>
import fullCalendarWeekDayHour from "./full-calendar-week-day-hour.vue";
import fullCalendarWeekDayEvent from "./full-calendar-week-day-event.vue";
import eventGenerate from "./event-generate.vue";
import popupEventDetails from "./popup-event-details";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      hours: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24
      ],
      shownPopupEventDetails: false,
      eventDetails: {},
    };
  },
  computed: {
    ...mapState({
      events: state => state.calendar.events,
      createdEvent: state => state.calendar.createdEvent
    }),
    ...mapGetters([
      "getCalendar"
    ]),
    evT() {
      return this.events.filter(event => {
        return event.id === 1;
      })
    },
    filterEventsDay() {
      const newEvents = this.events;
      if (!newEvents) return [];
      return newEvents.filter(event => {
        const eventCalendar = this.getCalendar(event.calendarId);
        const eventDateStart = new Date(event.dateStart * 1000);
        return (
          eventDateStart.getMonth() === this.date.month &&
          eventDateStart.getFullYear() === this.date.year &&
          eventDateStart.getDate() === this.date.day
          // eventCalendar.checked
        );
      });
    },
    showCreatedEvent() {
      const dataStartCreatedEvent = new Date(this.createdEvent.dataStart);
      return (
        dataStartCreatedEvent.getFullYear() === this.date.year &&
        dataStartCreatedEvent.getMonth() === this.date.month &&
        dataStartCreatedEvent.getDate() === this.date.day &&
        (this.createdEvent.dataInterim !== 0 || this.createdEvent.dataEnd !== 0)
      );
    }
    // dataStartGeneratedEvent() {
    // 	return this.
    // },
  },
  methods: {
    ...mapMutations(["updateCreatedEvent"]),
    test(){
      this.events.filter(event => {
        console.log(event.id === 1);
        return event.id === 1;
      })
    },
    getDetailsEvent(event) {
      this.eventDetails = event;
      this.shownPopupEventDetails = true;

    }
  },
  props: {
    date: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    fullCalendarWeekDayHour,
    fullCalendarWeekDayEvent,
    eventGenerate,
    popupEventDetails
  }
};
</script>
<style>
.bcalendar__week-grid-day-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* bottom: 0; */
}

.bcalendar__week-grid-day {
  position: relative;
}
</style>
