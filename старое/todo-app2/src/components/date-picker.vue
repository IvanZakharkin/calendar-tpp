<template lang="pug">
.lcalendar
  date-picker-month(
    :month="month"
    @toggleMonth="toggleMonth"
  )
  date-picker-days-week
  date-picker-days(
    :dates-per-week="datesPerWeek"
	:dates-prev-month="datesPrevMonth"
	:dates-next-month="datesNextMonth"
	:dates-month="datesMonth"
    :is-today="isToday"
    :is-selected="isSelected"
	:month="month"
	:year="year"
    @selectDate="selectDate"
  )
</template>

<script>
import datePickerMonth from "./date-picker-month.vue";
import datePickerDaysWeek from "./date-picker-days-week.vue";
import datePickerDays from "./date-picker-days.vue";

import { mapState } from "vuex";

const NUM_DAYS_IN_WEEK = 7;

export default {
  components: {
    datePickerMonth,
    datePickerDaysWeek,
    datePickerDays
  },
  props: {
    date: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      // year: 0,
      // month: 0,
      // todayDate: 0,
      // todayYear: 0,
      // todayMonth: 0,
      // selectedDate: null,
      // day: 0
    };
  },
  computed: {
    ...mapState({
      day: state => state.calendar.day,
      year: state => state.calendar.year,
      month: state => state.calendar.month,
      todayDate: state => state.calendar.todayDate,
      todayYear: state => state.calendar.todayYear,
      todayMonth: state => state.calendar.todayMonth,
      selectedDate: state => state.calendar.selectedDate
    }),
    numDays() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstDay() {
      return new Date(this.year, this.month, 1).getDay();
    },
    lastDay() {
      return new Date(this.year, this.month + 1, 0).getDay();
    },
    // numDaysInFirstWeek() {
    //   return NUM_DAYS_IN_WEEK - this.firstDay;
    // },
    // numDaysInLastWeek() {
    //   return this.lastDay + 1;
    // },
    lastDayPrevMonth() {
      return new Date(this.year, this.month, 0).getDate();
    },
    firstDayNextMonth() {
      return new Date(this.year, this.month + 1, 1).getDate();
    },
    // numWeeks() {
    //   const daysLeft =
    //     this.numDays - this.numDaysInFirstWeek - this.numDaysInLastWeek;
    //   return daysLeft / 7 + 2;
    // },
    // numFullWeeks() {
    //   return this.numWeeks - 2;
    // },
    datesPrevMonth() {
      const result = [];
      let limit = this.firstDay;
      if (limit === 0) limit = 7;
      for (let i = 0; i < limit - 1; i += 1) {
        result[i] = this.lastDayPrevMonth - i;
      }
      return result.reverse();
    },
    datesNextMonth() {
      const result = [];
      for (let i = 0; i < NUM_DAYS_IN_WEEK - this.lastDay; i += 1) {
        result[i] = this.firstDayNextMonth + i;
      }
      return result;
    },
    datesMonth() {
      const result = [];
      for (let i = 0; i < this.numDays; i += 1) {
        result[i] = 1 + i;
      }
      return result;
    },
    datesPerWeek() {
      return [
        ...this.datesPrevMonth,
        ...this.datesMonth,
        ...this.datesNextMonth
      ];
    },
    isCurrentMonth() {
      return this.todayMonth === this.month;
    },
    isCurrentYear() {
      return this.todayYear === this.year;
    },
    isToday() {
      return this.isCurrentMonth && this.isCurrentYear ? this.todayDate : 0;
    },
    isSelected() {
      // if (this.selectedDate) {
      //   return this.selectedDate.year === this.year &&
      //     this.selectedDate.month === this.month
      //     ? this.selectedDate.date
      //     : 0;
      // }
      // return 0;
      return this.day;
    }
  },
  watch: {
    date(val) {
      this.setDate(val);
    }
  },
  created() {
    const date = new Date();
    if (this.date) {
      this.setDate(this.date);
    } else {
      this.year = date.getFullYear();
      this.month = date.getMonth();
    }
    this.todayDate = date.getDate();
    this.todayYear = date.getFullYear();
    this.todayMonth = date.getMonth();
  },
  methods: {
    toggleMonth(direction) {
      let newMonth = this.month + Number(direction);
      let newYear = this.year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      if (newYear >= 1970) {
        this.month = newMonth;
        this.year = newYear;
      }
    },
    selectDate(date) {
      if (date) {
        this.selectedDate = {
          year: this.year,
          month: this.month,
          date
        };
        this.$emit("selectDate", this.selectedDate);
      }
    },
    setDate(date) {
      this.year = date.year;
      this.month = date.month;
      this.selectedDate = this.date;
    }
  }
};
</script>
