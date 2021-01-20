<template lang="pug">
  .bcalendar__event.bcalendar__event_generated(
    :style="styleEvent"
    @mousemove="changeTimeEvent()"
    @mouseup="endCreateEvent()"
  )
    .bcalendar__event-title 
      | {{dateStartEventToMoment.format("HH")}}:{{dateStartEventToMoment.format("mm")}}
      | - 
      | {{dateEndEventToMoment.format("HH")}}:{{dateEndEventToMoment.format("mm")}}
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  date() {
    return {
      //
    };
  },
  props: {},
  methods: {
    ...mapMutations([
      "updateCreatedEvent",
      "showPopapAddingEvent",
      "updateEvent",
      "showPopapEventFullScreen"
    ]),
    endCreateEvent() {
      this.updateCreatedEvent({
        state: "create",
        value: false
      });
      this.updateEvent({
        dateStart: this.getDataStartCreatedEvent,
        dateEnd: this.getDataEndCreatedEvent
      });
      // this.showPopapAddingEvent();
      this.showPopapEventFullScreen();
    },
    changeTimeEvent() {
      if (!this.createdEvent.create) return;
      if (
        event.movementY < 0 &&
        this.createdEvent.dataStart < this.createdEvent.dataInterim
      ) {
        let data = new Date(this.createdEvent.dataInterim);
        let minutes = data.getMinutes();
        data = data.setMinutes(minutes - 15);
        this.updateCreatedEvent({
          state: "dataInterim",
          value: data
        });
      }
      if (
        event.movementY > 0 &&
        this.createdEvent.dataStart > this.createdEvent.dataInterim
      ) {
        let data = new Date(this.createdEvent.dataInterim);
        let minutes = data.getMinutes();
        data = data.setMinutes(minutes + 15);
        this.updateCreatedEvent({
          state: "dataInterim",
          value: data
        });
      }
    }
  },
  computed: {
    ...mapState({
      createdEvent: state => state.calendar.createdEvent,
      calendars: state => state.calendar.calendars,
    }),
    ...mapGetters(["getDataStartCreatedEvent", "getDataEndCreatedEvent"]),
    dataStartEvent() {
      return new Date(this.getDataStartCreatedEvent * 1000);
    },
    dataEndEvent() {
      return new Date(this.getDataEndCreatedEvent * 1000);
    },
    dateStartEventToMoment() {
      return moment(this.getDataStartCreatedEvent * 1000);
    },
    dateEndEventToMoment() {
      return moment(this.getDataEndCreatedEvent * 1000);
    },
    hourStartEvent() {
      if (!this.createdEvent.dataStart) return;
      return this.dataStartEvent.getHours();
    },
    eventDuration() {
      if (!this.createdEvent.dataStart) return;
      return (this.dataEndEvent - this.dataStartEvent) / 1000;
    },
    minutesStartEvent() {
      if (!this.createdEvent.dataStart) return;
      return this.dataStartEvent.getMinutes();
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
      return `top: ${this.topCoordinateEvent}px; height: ${this.heightEvent}px; background: ${this.calendars[0].color}`;
    }
  }
};
</script>


