<template lang="pug">
 .calendar-event-agenda.calendar-event-agenda_create(
   :style="styleAgenda"
   @mouseup="endCreateEvent()"
   @mousemove="changeCreatedAgenda($event)"
   @dragstart.prevent
 )
  .calendar-event-agenda__info
    .calendar-event-agenda__time
    .calendar-event-agenda__title 


</template>

<script>
const HEIGHT_HOUR = 110;
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      countCoord: 0
    };
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
    timeStartInUnix: {
      type: Number,
      default: 0
    },
    timeEndInUnix: {
      type: Number,
      default: 0
    },
    agendaData: {
      type: Object,
      default: {
        // timeStart: "01:15",
        // timeEnd: "04:30"
      }
    },
    
  },
  watch: {},
  methods: {
    endCreateEvent() {
      this.$emit("changeAgendaData", {
        creating: false
      });
      this.$emit("showPopupCreatedAgenda")
    },
    changeCreatedAgenda(event) {
      if(!this.agendaData.creating) return; 
      let minutes = this.minutesEnd;
      let hour = this.hourEnd;
      this.countCoord += event.movementY;
      if (this.countCoord > 1 || this.countCoord < -1) {
        minutes -= Math.abs(this.countCoord);
        hour = minutes < 0 ? hour - 1 : hour;
        minutes = minutes < 0 ? 59 : minutes;
        this.$emit("changeAgendaData", { timeEnd: `${hour}:${minutes}` });
        this.countCoord = 0;
      }
    }
  },
  computed: {
    ...mapState({}),
    timeStart() {
      const timeStartToNum =
        Number(this.agendaData.timeStart.split(":")[0]) +
        Number(this.agendaData.timeStart.split(":")[1]) / 60;
      const timeEndToNum =
        Number(this.agendaData.timeEnd.split(":")[0]) +
        Number(this.agendaData.timeEnd.split(":")[1]) / 60;
      return timeStartToNum > timeEndToNum
        ? this.agendaData.timeEnd
        : this.agendaData.timeStart;
    },
    timeEnd() {
      const timeStartToNum =
        Number(this.agendaData.timeStart.split(":")[0]) +
        Number(this.agendaData.timeStart.split(":")[1]) / 60;
      const timeEndToNum =
        Number(this.agendaData.timeEnd.split(":")[0]) +
        Number(this.agendaData.timeEnd.split(":")[1]) / 60;
      return timeStartToNum > timeEndToNum
        ? this.agendaData.timeStart
        : this.agendaData.timeEnd;
    },
    hourStart() {
      return Number(this.timeStart.split(":")[0]);
    },
    hourEnd() {
      return Number(this.timeEnd.split(":")[0]);
    },
    minutesStart() {
      return Number(this.timeStart.split(":")[1]);
    },
    minutesEnd() {
      return Number(this.timeEnd.split(":")[1]);
    },
    topCoordinate() {
      const hourInCoord = this.hourStart * HEIGHT_HOUR;
      const minutesInCoord = (this.minutesStart * HEIGHT_HOUR) / 60;
      return hourInCoord + minutesInCoord;
    },
    height() {
      const hourInCoord = this.hourEnd * HEIGHT_HOUR;
      const minutesInCoord = (this.minutesEnd * HEIGHT_HOUR) / 60;
      return hourInCoord + minutesInCoord - this.topCoordinate;
    },
    styleAgenda() {
      return `top: ${this.topCoordinate}px; height: ${this.height}px`;
    }
  },

  components: {},
  mounted() {}
};
</script>

<style lang="scss">
</style>