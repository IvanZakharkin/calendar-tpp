<template lang="pug">
	
		.bcalendar__day(:class="{'bcalendar__day_active': isToday === true}")
			.bcalendar__day-num
				button.bcalendar__day-num-btn {{date.day}}
			.bcalendar__day-name {{date.daysWeek}}
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      todayDate: state => state.calendar.todayDate,
      todayMonth: state => state.calendar.todayMonth,
      todayYear: state => state.calendar.todayYear
    }),
    isToday() {
      return (
        this.todayDate === this.date.day &&
        this.todayMonth === this.date.month &&
        this.todayYear === this.date.year
      );
    }
  },
  methods: {},
  props: {
    date: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style>
.bcalendar__day-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* bottom: 0; */
}
</style>
