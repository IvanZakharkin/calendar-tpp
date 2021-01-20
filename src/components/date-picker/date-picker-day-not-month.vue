<template lang="pug">
	li.lcalendar__day(
		:class="{'lcalendar__day_current': isToday === day, 'lcalendar__day_selected': isSelected === day,'lcalendar__day_not_current-month': isNotCurrentMonth}"
	)
		button.lcalendar__day-btn(
			@click="setGlobalDate()"
		) {{day}}
</template>

<script>
import { mapMutations } from "vuex";

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
  computed: {
    asd() {
      return 123;
    },
    monthOfDay() {
      if (this.month < 0) return 11;
      if (this.month > 11) return 0;
      return this.month;
    },
    yearOfDay() {
      if (this.month < 0) return this.year - 1;
      if (this.month > 11) return this.year + 1;
      return this.year;
    }
  },
  methods: {
    ...mapMutations(["setDate"]),
    setGlobalDate() {
      return this.setDate({
        year: this.yearOfDay,
        month: this.monthOfDay,
        day: this.day
      });
    }
  }
};
</script>
<style>

</style>
