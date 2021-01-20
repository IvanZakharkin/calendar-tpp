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
    },
    date: {
      type: Object,
      default: {}
    }
  },
  methods: {
    ...mapMutations(["changeDetailsEvent","showPopapDetailsEvents"]),
    detailsEvent() {
      const event = this.$refs.dayEvent;
      const eventWidth = this.$refs.dayEvent.offsetWidth;
      const parent = this.$refs.dayEvent.parentElement;
      let leftCoordinate = eventWidth + parent.offsetLeft;
      const rightCoordinate = eventWidth + parent.offsetLeft + 365;
      const calendarWidth = $(".bcalendar").width();
      if(rightCoordinate > calendarWidth) {
        leftCoordinate = parent.offsetLeft - 365;
      }
      const eventData = {
        id:this.event.id,
        topCoordinate: this.topCoordinateEvent,
        leftCoordinate: leftCoordinate
      }
      this.changeDetailsEvent(eventData);
      this.showPopapDetailsEvents();
    }
  },
  computed: {
    ...mapGetters(["getCalendar", "getTimeZoneById", "getStatusByExternalId"]),
    // status() {
    //   return this.getStatusByExternalId(this.event.status);
    // },
    timeZoneEvent() {
      return this.getTimeZoneById(this.event.timeZone);
    },
    calendar(){
      return this.getCalendar(this.event.calendarId);
    },
    dayStartEvent() {
      const day = new Date(this.event.dateStart * 1000).getDate();
      return day;
    },
    dayEndEvent() {
      const day = new Date(this.event.dateEnd * 1000).getDate();
      return day;
    },
    hourStartEvent() {
      const hour = new Date(this.event.dateStart * 1000).getHours();
      return hour;
      // + this.timeZoneEvent.utc;
    },
    minutesStartEvent() {
      return new Date(this.event.dateStart * 1000).getMinutes();
    },
    hourEndEvent() {
      const hour = new Date(this.event.dateEnd * 1000).getHours();
      return hour;
      // + this.timeZoneEvent.utc;
    },
    minutesEndEvent() {
      const hour = new Date(this.event.dateEnd * 1000).getMinutes();
      return hour;
      // + this.timeZoneEvent.utc;
    },
    eventDuration() {
      //если событие закончилось в другом дне, значит в этом дне оно будет заканчиваться 24
      if (this.dayEndEvent !== this.date.day) {
        return new Date(this.date.year, this.date.month, this.date.day, 24, 0).getTime()/1000 - this.event.dateStart;
      }
      return this.event.dateEnd - this.event.dateStart;
      
    },
    hoursEventDuration() {
      return Math.floor(this.eventDuration / 3600);
    },
    minutesEventDuration() {
      return (this.eventDuration / 3600 - this.hoursEventDuration) * 60;
    },
    topCoordinateEvent() {
      //если событие началось в другом дне, значит в этом дне оно будет начинаться с 0
      if (this.dayStartEvent !== this.date.day) {
        return 0;
      }
      
      return this.hourStartEvent * 50 + (this.minutesStartEvent / 60) * 50;
    },
    heightEvent() {
      //если событие началось в другом дне, значит в этом его продолжительность(высота) будет расчитываться из даты окончания
      if (this.dayStartEvent !== this.date.day) {
        return this.hourEndEvent * 50 + (this.minutesEndEvent / 60) * 50;
      }

      const heightEvent =
        this.hoursEventDuration * 50 + (this.minutesEventDuration / 60) * 50;
      return heightEvent;
    },
    styleEvent() {
      let background = `background: ${this.calendar.color}`;
      if(this.event.status.id) {
        switch (this.event.status.externalId) {
          case "application":
            background = `
              background: linear-gradient(${this.calendar.color} 50%, #D3D3D3 50%);
              background-size: 100% 60px;
            `;
            break;
          case "plan": 
            background = `background: ${this.calendar.color}`;
            break;
          case "done": {
            background = `background: ${this.calendar.color}; opacity: 0.6`;
            break;
          }
          default: {
            background = `background: #e0e0e0};`;
            break;
          }
        }
      }

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
