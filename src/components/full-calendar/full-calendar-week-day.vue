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
		v-for="event,index in filterEventByDate"
    :index="index"
		:event="event"
    :events="filterEventByDate"
    :date="date"
    @detailsEvent="getDetailsEvent"
	)
	eventGenerate(
    v-if="showCreatedEvent"
    
    )
</template>

<script>
import fullCalendarWeekDayHour from "./full-calendar-week-day-hour.vue";
import fullCalendarWeekDayEvent from "./full-calendar-week-day-event.vue";
import eventGenerate from "../event-generate.vue";
import popupEventDetails from "../popup-event-details";
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
    eventsDay() {
      const newEvents = this.events;
      if (!newEvents) return [];
      return newEvents.filter(event => {
        const eventCalendar = this.getCalendar(event.calendarId);
        const eventDateStart = new Date(event.dateStart * 1000);
        const eventDateEnd = new Date(event.dateEnd * 1000);
        return (
          (eventDateStart.getMonth() === this.date.month &&
          eventDateStart.getFullYear() === this.date.year &&
          eventDateStart.getDate() === this.date.day) || 
          (eventDateEnd.getMonth() === this.date.month &&
          eventDateEnd.getFullYear() === this.date.year &&
          eventDateEnd.getDate() === this.date.day)

        );
      });
    },
    filterEventByDate() {
      return this.eventsDay.sort((a,b) => {
        return a.dateStart - b.dateStart;
      })
    },
    changingEvents() {
      return this.filterEventsDay.map(event => {
        event.intersectionInStart = 0;
        event.intersectionInEnd = 0;
        return event;
      })
    },
    eventsWithIntersection() {
      for (let i = 0; i < this.changingEvents.length; i += 1) {
        let dateStartEv1 = this.changingEvents[i].dateStart;
        let dateEndEv1 = this.changingEvents[i].dateEnd;
        let dateMiddleEv1 = (dateStartEv1 + dateEndEv1) / 2;
        for (let j = 0; j < this.changingEvents.length; j += 1) {
          if ( i === j ) continue;
          if (dateStartEv2 >= dateEndEv1) continue;
          if (dateStartEv2 >= dateEndEv1) continue;

          let dateStartEv2 = this.changingEvents[j].dateStart;
          let dateEndEv2 = this.changingEvents[j].dateEnd;
          if (dateStartEv2 >= dateMiddleEv1) {
            this.changingEvents[i].intersectionInEnd += 1;
          }
        }
      }
      return this.changingEvents;
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
