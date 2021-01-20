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
import moment from "moment-timezone";
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
    ...mapGetters(["getCalendar", "getTimeZoneById", "getStatusByExternalId"]),
    test() {
      // const a = moment.tz("2013-11-18 11:55", "Asia/Taipei");
      // return a.format();
      // return moment.tz("2012-03-11 01:59:59", "America/New_York").format();
      return moment.tz.zonesForCountry('RU', true);
    },
    status() {
      // return this.event.status;
      return this.getStatusByExternalId(this.event.status);
    },
    timeZoneEvent() {
      return this.getTimeZoneById(this.event.timeZone);
    },
    calendar(){
      return this.getCalendar(this.event.calendarId);
    },
    hourStartEvent() {
      const hour = new Date(this.event.dateStart * 1000).getHours();
      return hour;
      // + this.timeZoneEvent.utc;
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
      let background = `background: ${this.calendar.COLOR}`;
      // switch (this.status.externalId) {
      //   case "application":
      //     background = `
      //       background: linear-gradient(${this.calendar.COLOR} 50%, #D3D3D3 50%);
      //       background-size: 100% 60px;
      //     `;
      //     break;
      //   case "plan": 
      //     background = `background: ${this.calendar.COLOR}`;
      //     break;
      //   case "done": {
      //     background = `background: ${this.calendar.COLOR}; opacity: 0.6`;
      //     break;
      //   }
      // }
      return `top: ${this.topCoordinateEvent}px; height: ${this.heightEvent}px; ${background}`;
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
