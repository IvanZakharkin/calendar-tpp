<template lang="pug">
	.bcalendar__schedule-event(:class="{'bcalendar__schedule-event_current': isToday === true}")
		.bcalendar__schedule-event-day {{dayEvent}}
		.bcalendar__schedule-event-day-name {{dayWeekName}}
		.bcalendar__schedule-event-day-current сегодня
		.bcalendar__schedule-event-time {{hourStartEvent}}:{{minutesStartEvent}} - {{hourEndEvent}}:{{minutesEndEvent}}
		.bcalendar__schedule-event-name
			.bcalendar__schedule-event-name-circle(:style="`background: ${calendar.color}red`")
			.bcalendar__schedule-event-name-text {{event.name}}
		.bcalendar__schedule-event-btns.ml-3
			button.btn.calendar-popup-event-detail__btn(
				type='button', 
				data-dismiss='modal'
				@click="deleteEvent(event.id)"
			)
				i.far.fa-trash-alt
			button.btn.calendar-popup-event-detail__btn(
				type='button'
				@click="getEventForEdit(event.id)"
			)
				i.fas.fa-pencil-alt
			a.btn.calendar-popup-event-detail__btn(
				:href="link"
			)
				i.fas.fa-link
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    event: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      todayDate: state => state.calendar.todayDate,
      todayMonth: state => state.calendar.todayMonth,
      todayYear: state => state.calendar.todayYear
    }),
    ...mapGetters(["getCalendar"]),
    dayEvent() {
      return new Date(this.event.dateStart * 1000).getDate();
    },
    hourStartEvent() {
      const time = new Date(this.event.dateStart * 1000).getHours();
      if (time < 10) return `0${time}`;
      return time;
    },
    minutesStartEvent() {
      const time = new Date(this.event.dateStart * 1000).getMinutes();
      if (time < 10) return `0${time}`;
      return time;
    },

    hourEndEvent() {
      const time = new Date(this.event.dateEnd * 1000).getHours();
      if (time < 10) return `0${time}`;
      return time;
    },
    minutesEndEvent() {
      const time = new Date(this.event.dateEnd * 1000).getMinutes();
      if (time < 10) return `0${time}`;
      return time;
    },
    dayWeekName() {
      const daysWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
      return daysWeek[new Date(this.event.dateStart * 1000).getDay()];
    },
    calendar(){
      return this.getCalendar(this.event.calendarId);
    },
    isToday() {
      return (
        this.todayDate === new Date(this.event.dateStart * 1000).getDate() &&
        this.todayMonth === new Date(this.event.dateStart * 1000).getMonth() &&
        this.todayYear === new Date(this.event.dateStart * 1000).getFullYear()
      );
    },
    link() {
			// return `${location.origin}${this.event.detail_url}`;
			return this.event.detail_url;
		}
  },
  methods: {
    ...mapActions(["getEventForEdit", "deleteEvent"]),
    editEvent(){
			this.getEventForEdit(this.event.id);
		},
		deleteCurrentEvent() {
			this.deleteEvent(this.event.id);
		}
  }
};
</script>