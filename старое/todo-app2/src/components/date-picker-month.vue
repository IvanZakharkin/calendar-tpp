<template lang="pug">
  .lcalendar__months 
    a.lcalendar__months-btn(@click="toggleCurrentMonth(-1)")
      i.fas.fa-chevron-left
    ul.lcalendar__months-list
      li.lcalendar__month
        button.lcalendar__month-btn {{ prevMonth }}
      li.lcalendar__month.lcalendar__month_active
        button.lcalendar__month-btn {{ currentMonth }}
      li.lcalendar__month
        button.lcalendar__month-btn {{ nextMonth }}
    a.lcalendar__months-btn(@click="toggleCurrentMonth(1)")
      i.fas.fa-chevron-right
</template>

<script>
import { mapMutations } from "vuex";

const MONTHS = [
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
];

export default {
  data() {
    return {};
  },
  props: {
    month: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    currentMonth() {
      return MONTHS[this.month];
    },
    prevMonth() {
      let indexPrevMonth = this.month - 1;
      if (indexPrevMonth < 0) {
        indexPrevMonth = 11;
      }
      if (indexPrevMonth > 11) {
        indexPrevMonth = 0;
      }
      return MONTHS[indexPrevMonth];
    },
    nextMonth() {
      let indexNextMonth = this.month + 1;
      if (indexNextMonth > 11) {
        indexNextMonth = 0;
      }
      return MONTHS[indexNextMonth];
    }
  },
  methods: {
    ...mapMutations(["toggleMonth"]),
    toggleCurrentMonth(direction) {
      this.toggleMonth(direction);
    }
  }
};
</script>
