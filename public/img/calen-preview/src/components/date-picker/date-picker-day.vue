<template lang="pug">
	li.lcalendar__day(
		:class="{'lcalendar__day_current': isToday === day, 'lcalendar__day_selected': isSelected === day,'lcalendar__day_not_current-month': isNotCurrentMonth}"
	)
		button.lcalendar__day-btn(
			@click="setGlobalDate()"
		) {{day}}
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    day: {
      type: Number,
      default: () => 1
    },
    isNotCurrentMonth: {
      type: Boolean,
      default: () => false
    },
    isToday: {
      type: Number,
      default: 0
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
  },
  methods: {
    ...mapMutations(["setDate"]),
    ...mapActions(["getEventsInWeek"]),
    setGlobalDate() {
      return this.setDate({
        year: this.year,
        month: this.month,
        day: this.day
      });
      this.getEventsInWeek();
    }
  }
};
</script>
<style>
.lcalendar__day_selected {
  background: rgb(212, 148, 20);
}
.lcalendar__day_selected .lcalendar__day-btn {
  color: white;
}
</style>
