<template lang="pug">
  .bcalendar__event(
    ref="dayEvent"
    :style="styleEvent"
    @click="detailsEvent()"
  )

    .bcalendar__event-status-icon(v-html="statusIcons[event.status.externalId]")
      
    .bcalendar__event-title
      span {{event.name}}
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
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
    events: {
      type: Array,
      default: () => []
    },
    date: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },

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
    ...mapState({
      statusIcons: state => state.calendar.statusIcons
    }),
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
    offset() {
      let count = 0;
      if (this.index === 0) return count;
      for (let i = this.index; i >= 0; i -= 1) {
        if (i === this.index) continue;
        
        const event = this.events[i];
        if (
          this.event.dateStart >= event.dateStart &&
          this.event.dateStart < event.dateEnd
        ) {
          count += 1;
        }
      }
      return count;
    },
    styleEvent() {
      let background = ``;
      const left = 31.5 * this.offset;
      const width = 95 - left;
      const zIndex = 10 * this.index;
      if(this.event.status.id) {
        switch (this.event.status.externalId) {
          case "application":
            background = `background:rgb(211, 211, 211); border: 1px solid ${this.calendar.color}`;
            // background = `background: linear-gradient(${this.calendar.color} 50%, #D3D3D3 50%); background-size: 100% 20px;`;
            break;
          case "plan": 
            background = `background: ${this.calendar.color}`;
            break;
          case "done": {
            background = `background: ${this.calendar.color}; opacity: 0.6`;
            break;
          }
          default: {
            background = `background:rgb(211, 211, 211); border: 1px solid ${this.calendar.color}`;
            break;
          }
        }
      } else {
        background = `background:rgb(211, 211, 211); border: 1px solid ${this.calendar.color}`;
      }

      return `top: ${this.topCoordinateEvent}px; height: ${this.heightEvent}px; min-height: ${this.heightEvent}px; ${background}; left: ${left}%; width: ${width}%; min-width: ${width}%;z-index: ${zIndex}`;
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
