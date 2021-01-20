<template lang="pug">
  .calendar-page__calendars
    .calendar-page__calendars-title Календари
    .calendar-page__calendars-list
      calendars-list-item(
        v-for="calendar in calendars"
          :calendar="calendar"
      )
    button.btn.calendar-page__btn-gray(
      @click="showPopapAddingCalendar"
    ) + Добавить календарь
</template>

<script>
import { mapMutations, mapState } from "vuex";

import calendarsListItem from './calendar-list-item.vue'

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["showPopapAddingCalendar"])
  },
   computed: {
      ...mapState({
        calendars: state => state.calendar.calendars
      })
  },
  components: {
    calendarsListItem
  }
};
</script>
