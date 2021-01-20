/* eslint-disable */
<template lang="pug">
    .calendar-page__calendars-list-item
        label(class="checkbox-calendar")
          input.checkbox-calendar__input(
            type="checkbox"
            v-model="check"
            )
          .checkbox-calendar__fake(:style="{background: calendar.color}")
          .checkbox-calendar__title {{calendar.name}}

</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      check: false
    };
  },
  watch: {
    check: function(val) {
      this.checkCalendar({ id: this.calendar.id, check: val });
    }
  },
  methods: {
    ...mapMutations(["showPopapAddingCalendar", "checkCalendar"])
  },
  props: {
      calendar: {
          type: Object,
          default: () => {}
      }
  }
};
</script>
