<template lang="pug">
	.bcalendar__schedule
		.bcalendar__schedule-container
			fullCalendarScheduleEvent(
				v-for="event in filteredEvents"
				:event="event"
			)
</template>

<script>
import fullCalendarScheduleEvent from "./full-calendar-schedule-event.vue";
import { mapState } from "vuex";

export default {
  date() {
    return {
      //
    };
  },
  props: {
    dates: {
      type: Array
    },
    year: {
      type: Number
    }
  },
  methods: {},
  computed: {
    ...mapState({
      events: state => state.calendar.events
    }),
    filteredEvents() {
      const events = this.events;
      return events.sort((a, b) => a.dateStart - b.dateStart);
    }
  },
  components: {
    fullCalendarScheduleEvent
  }
};
</script>
