<template lang="pug">
div.d-flex
  .d-flex.calendar-event-popup-fullscreen__field(:class="{'disabled': disabled}")
    dropdown-time(
      :times="hours"
      :currentTime="hourStart"
      @changeTime="hourStart = $event"
      :disabled="disabled"
    )
    .d-flex.align-items-center :
    dropdown-time(
      :times="minutes"
      :currentTime="minutesStart"
      @changeTime="minutesStart = $event"
      :disabled="disabled"
    )
    .d-flex.align-items-center -
    dropdown-time(
      :times="hoursForTimeEnd"
      :currentTime="hourEnd"
      @changeTime="hourEnd = $event"
      :disabled="disabled"
    )
    .d-flex.align-items-center :
    dropdown-time(
      :times="minutesForTimeEnd"
      :currentTime="minutesEnd"
      @changeTime="minutesEnd = $event"
      :disabled="disabled"
    )
</template>

<script>
import dropdownTime from "./dropdown-time.vue";
import moment from "moment-timezone";
import { HOURS, MINUTES } from "./const.js";
export default {
  data() {
    return {
      hourStart: "",
      hourEnd: "",
      minutesStart: "",
      minutesEnd: "",
      // hours: [],
      // minutes: []
    }
  },
  watch: {
    hourStart(val) {
      this.doStartTimeLessEndTime();
      this.$emit('changeTimeStart', `${val}:${this.minutesStart}`);
    },
    hourEnd(val) {
      this.doStartTimeLessEndTime();
      this.$emit('changeTimeEnd', `${val}:${this.hourEnd}`);
    },
    minutesStart(val) {
      this.doStartTimeLessEndTime();
      this.$emit('changeTimeStart', `${this.hourStart}:${val}`);
    },
    minutesEnd(val) {
      this.doStartTimeLessEndTime();
      this.$emit('changeTimeEnd', `${this.hourEnd}:${val}`);
    },
  },
  methods: {
    doStartTimeLessEndTime() {
      if (parseInt(this.hourStart) > parseInt(this.hourEnd)) {
        this.hourEnd = this.hourStart;
      }
      if (parseInt(this.hourStart) === parseInt(this.hourEnd)) {
        if (parseInt(this.minutesStart) >= parseInt(this.minutesEnd)) {
          const index = MINUTES.indexOf(this.minutesStart) + 1;
          if (index >= 4) {
            this.hourEnd = HOURS[HOURS.indexOf(this.hourEnd) + 1];
            this.minutesEnd = MINUTES[0]
          } else {
            this.minutesEnd = MINUTES[MINUTES.indexOf(this.minutesStart) + 1];
          }
        }
      }
      
    }
  },
  computed: {
    hoursForTimeEnd() {
      const hours = [...this.hours];
      const indexHourStart = hours.indexOf(this.hourStart);
      hours.splice(0, indexHourStart);
      return hours;
    },
    minutesForTimeEnd() {
      const minutes = [...this.minutes];
      if (parseInt(this.hourStart) === parseInt(this.hourEnd)) {
        const indexMinutesStart = minutes.indexOf(this.minutesStart);
        minutes.splice(0, indexMinutesStart + 1);
      }
      return minutes;
    }
  },
  props: {
    timeStart: {
      type: String,
      default: ''
    },
    timeEnd: {
      type: String,
      default: ''
    },
    hours: {
      type: Array,
      default() {
        return []
      }
    },
    minutes: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    dropdownTime
  },
  mounted() {
    console.log(this.timeStart, this.timeEnd);
    // this.hours = HOURS;
    // this.minutes = MINUTES;
    this.hourStart = this.timeStart.split(':')[0];
    this.minutesStart = this.timeStart.split(':')[1];
    this.hourEnd = this.timeEnd.split(':')[0];
    this.minutesEnd = this.timeEnd.split(':')[1];
  }
}
</script>