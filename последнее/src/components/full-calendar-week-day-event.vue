<template lang="pug">
  .bcalendar__event(
    ref="dayEvent"
    :style="styleEvent"
    @click="detailsEvent()"
  )
    .bcalendar__event-title {{event.name}}
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  date() {
    return {
      //
    };
  },
  props: {
    event: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations(["changeDetailsEvent","showPopapDetailsEvents"]),
    detailsEvent() {
      const event = this.$refs.dayEvent;
      const eventWidth = this.$refs.dayEvent.offsetWidth;
      const parent = this.$refs.dayEvent.parentElement;
      const leftCoordinate = eventWidth + parent.offsetLeft;
      const eventData = {
        id:this.event.id,
        topCoordinate: this.topCoordinateEvent,
        leftCoordinate: leftCoordinate
      }
      this.changeDetailsEvent(eventData);
      this.showPopapDetailsEvents();
      // this.$emit("detailsEvent", {
      //   id:this.event.id,
      //   topCoordinate: this.topCoordinateEvent
      //   })
    }
  },
  computed: {
    ...mapGetters(["getCalendar"]),
    calendar(){
      return this.getCalendar(this.event.calendarId);
    },
    hourStartEvent() {
      return new Date(this.event.dateStart * 1000).getHours();
    },
    eventDuration() {
      return this.event.dateEnd - this.event.dateStart;
    },
    minutesStartEvent() {
      return new Date(this.event.dateStart * 1000).getMinutes();
    },
    hoursEventDuration() {
      return Math.floor(this.eventDuration / 3600);
    },
    minutesEventDuration() {
      return (this.eventDuration / 3600 - this.hoursEventDuration) * 60;
    },
    topCoordinateEvent() {
      return this.hourStartEvent * 50 + (this.minutesStartEvent / 60) * 50;
    },
    heightEvent() {
      const heightEvent =
        this.hoursEventDuration * 50 + (this.minutesEventDuration / 60) * 50;
      return heightEvent;
    },
    styleEvent() {
      return `top: ${this.topCoordinateEvent}px; height: ${this.heightEvent}px; background-color: ${this.calendar.COLOR}`;
    }

  }
};
</script>

<style>
.bcalendar__event {
  position: absolute;
  background: orange;
  width: 95%;
}
</style>
