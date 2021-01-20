<template lang="pug">
  .calendar-page__calendars
    .calendar-page__calendars-title Календари
    .calendar-page__calendars-list
      calendars-list-item(
        v-for="calendar in calendars"
          :calendar="calendar"
      )
    button.btn.calendar-page__btn-gray(
      v-if="canEditCalendars"
      @click="showPopapAddingCalendar(); changeEditingRoom(false)"
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
    ...mapMutations(["showPopapAddingCalendar", "changeEditingRoom"]),

  },
   computed: {
      ...mapState({
        calendars: state => state.calendar.calendars,
        canEditCalendars: state => state.calendar.canEditCalendars,
      })
  },
  components: {
    calendarsListItem
  },
  created() {
  }
};
</script>