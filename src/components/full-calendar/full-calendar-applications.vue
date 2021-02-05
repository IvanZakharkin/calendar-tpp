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
    return {};
  },
  props: {},
  methods: {},
  computed: {
    ...mapState({
      events: state => state.calendar.events
    }),
    filteredEvents() {
      return this.events.filter((event) => event.status.externalId === "application")
                        .sort((a, b) => a.dateStart - b.dateStart);
    }
  },
  components: {
    fullCalendarScheduleEvent
  }
};
</script>
