<template lang="pug">
  .calendar-event-agendas__field-day-hour(
    :style="styleDay"
      @mousedown="startCreateAgenda($event)"
      @mousemove="createAgenda($event)"
      @mouseup="endCreateAgenda($event)"
      @dragstart.prevent
  )

</template>

<script>
const HEIGHT_HOUR = 110;
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import { HOURS_FOR_CALENDAR } from "../const.js";
import eventAgendasList from "./event-agendas-list.vue";
import eventAgendasCreatedAgenda from "./event-agendas-created-agenda.vue";

export default {
  data() {
    return {};
  },
  props: {
    dateStartEventMoment: {
      type: Object,
      default: {}
    },
    dateEndEventMoment: {
      type: Object,
      default: {}
    },
    hourEnd: {
      type: Number,
      default: 0
    },
    agendaData: {
      type: Object,
      default: {}
    }
  },
  watch: {},
  methods: {
    getMinutesFromCoords(coords) {
      let minutes = (coords / HEIGHT_HOUR) * 60;
      return Math.floor(minutes);
      // if (minutes >= 0 && minutes < 7.5) {
      //   return (minutes = 0);
      // }
      // if (minutes >= 7.5 && minutes < 22.5) {
      //   return (minutes = 15);
      // }
      // if (minutes >= 22.5 && minutes < 37.5) {
      //   return (minutes = 30);
      // }
      // if (minutes >= 37.5 && minutes < 52.5) {
      //   return (minutes = 45);
      // }
      // if (minutes >= 52.5) {
      //   return (minutes = 60);
      // }
    },
    startCreateAgenda(event) {
      let minutes = this.getMinutesFromCoords(event.layerY);
      let hour = this.hourEnd - 1;
      if (minutes === 60) {
        hour = this.hourEnd;
        minutes = 0;
      }
      if (
        !this.isTimeStartInEvent(hour, minutes) ||
        !this.isTimeEndInEvent(hour, minutes)
      )
        return;

      this.agendaData.creating = true;
      this.$emit("changeAgendaData", {
        timeStart: `${hour}:${minutes}`,
        creating: true
      });
    },
    createAgenda(event) {
      if (!this.agendaData.creating) return;
      const minutesOrigin = this.getMinutesFromCoords(event.layerY);
      const minutes = minutesOrigin === 60 ? 0 : minutesOrigin;
      const hour = minutesOrigin === 60 ? this.hourEnd : this.hourEnd - 1;
      if (!this.isTimeStartInEvent(hour, minutes)) {
        this.$emit("changeAgendaData", {
          timeEnd: `${this.hourStartEvent}:${this.minutesStartEvent}`
        });
        return;
      }
      if (!this.isTimeEndInEvent(hour, minutes)) {
        this.$emit("changeAgendaData", {
          timeEnd: `${this.hourEndEvent}:${this.minutesEndEvent}`
        });
        return;
      }
      this.$emit("changeAgendaData", { timeEnd: `${hour}:${minutes}` });
    },
    endCreateAgenda(event) {
      if (!this.agendaData.creating) return;
      const minutesOrigin = this.getMinutesFromCoords(event.layerY);
      const minutes = minutesOrigin === 60 ? 0 : minutesOrigin;
      const hour = minutes === 60 ? this.hourEnd : this.hourEnd - 1;
      if (!this.isTimeStartInEvent(hour, minutes)) {
        this.$emit("changeAgendaData", {
          timeEnd: `${this.hourStartEvent}:${this.minutesStartEvent}`
        });
        this.$emit("showPopupCreatedAgenda");
        return;
      }
      if (!this.isTimeEndInEvent(hour, minutes)) {
        this.$emit("changeAgendaData", {
          timeEnd: `${this.hourEndEvent}:${this.minutesEndEvent}`
        });
        this.$emit("showPopupCreatedAgenda");
        return;
      }
      this.$emit("changeAgendaData", {
        timeEnd: `${hour}:${minutes}`,
        creating: false
      });
      this.$emit("showPopupCreatedAgenda");
    },
    isTimeStartInEvent(hour, minutes) {
      if (hour > this.hourStartEvent) {
        return true;
      }
      if (hour == this.hourStartEvent && minutes >= this.minutesStartEvent) {
        return true;
      }
      return false;
    },
    isTimeEndInEvent(hour, minutes) {
      if (hour < this.hourEndEvent) {
        return true;
      }
      if (hour == this.hourEndEvent && minutes <= this.minutesEndEvent) {
        return true;
      }
      return false;
    }
  },
  computed: {
    ...mapState({}),
    hourStartEvent() {
      return Number(this.dateStartEventMoment.format("H"));
    },
    hourEndEvent() {
      return Number(this.dateEndEventMoment.format("H"));
    },
    minutesStartEvent() {
      return Number(this.dateStartEventMoment.format("mm"));
    },
    minutesEndEvent() {
      return Number(this.dateEndEventMoment.format("mm"));
    },
    styleDay() {
      const hourStart = this.hourEnd - 1;
      let startGradint;
      if (hourStart < this.hourStartEvent || hourStart > this.hourEndEvent)
        return "";
      if (hourStart > this.hourStartEvent && hourStart < this.hourEndEvent)
        return "background: linear-gradient(to bottom, rgba(237, 237, 237, 1) 100%, rgba(237, 237, 237, 1) 100%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%)";
      if (hourStart === this.hourStartEvent) {
        startGradint = 100 - (this.minutesStartEvent * 100) / 60;
        return `background: linear-gradient(to top, rgba(237, 237, 237, 1) ${startGradint}%, rgba(237, 237, 237, 1) ${startGradint}%, rgba(255, 255, 255, 0) ${startGradint}%, rgba(255, 255, 255, 0) 100%)`;
      }
      if (hourStart === this.hourEndEvent) {
        startGradint = (this.minutesEndEvent * 100) / 60;
        return `background: linear-gradient(to bottom, rgba(237, 237, 237, 1) ${startGradint}%, rgba(237, 237, 237, 1) ${startGradint}%, rgba(255, 255, 255, 0) ${startGradint}%, rgba(255, 255, 255, 0) 100%)`;
      }
    }
  },

  components: {},
  mounted() {}
};
</script>

<style lang="scss">
</style>