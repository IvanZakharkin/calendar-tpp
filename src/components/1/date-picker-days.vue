<template lang="pug">
	ul.lcalendar__days
		datePickerDayNotMonth(
			v-for="(day, index) in datesPrevMonth"
			:day="day"
			:month="month - 1"
			:year="year"
			:is-not-current-month="isNotCurrentMonth"
		)
		datePickerDay(
			v-for="(day, index) in datesMonth"
			:day="day"
			:is-today="isToday"
			:is-selected="isSelected"
			:month="month"
			:year="year"
		)
		datePickerDayNotMonth(
			v-for="(day, index) in datesNextMonth"
			:day="day"
			:month="month + 1"
			:year="year"
			:is-not-current-month="isNotCurrentMonth"
		)
		
</template>

<script>
import datePickerDay from "./date-picker-day.vue";
import datePickerDayNotMonth from "./date-picker-day-not-month.vue";

export default {
  data() {
    return {};
  },
  components: {
    datePickerDay,
    datePickerDayNotMonth
  },
  props: {
    datesPerWeek: {
      type: Array,
      default: () => []
    },
    datesPrevMonth: {
      type: Array,
      default: () => []
    },
    datesNextMonth: {
      type: Array,
      default: () => []
    },
    datesMonth: {
      type: Array,
      default: () => []
    },
    isToday: {
      type: Number,
      default: 0
    },
    isNotCurrentMonth: {
      type: Boolean,
      default: true
    },
    isSelected: {
      type: Number,
      default: 0
    },
    month: {
      type: Number,
      default: 0
    },
    year: {
      type: Number,
      default: 0
    }
  }
};
</script>
