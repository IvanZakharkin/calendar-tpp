<template lang="pug">
	.bcalendar__event.bcalendar-event-generated(
		:style="styleEvent"
		@mousemove="changeTimeEvent()"
		@mouseup="endCreateEvent()"
	)
		.bcalendar__event-title {{hourStartEvent}} : {{minutesStartEvent}} 
		.bcalendar__event-desk {{hourStartEvent + hoursEventDuration}} : {{minutesStartEvent + minutesEventDuration}}
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  date() {
    return {
      //
    };
  },
  props: {},
  methods: {
    ...mapMutations(["updateCreatedEvent", "showPopapAddingEvent"]),
    endCreateEvent() {
      document.body.style.cursor="default";
      // this.updateCreatedEvent({
      //   state: "dataStart",
      //   value: this.getDataStartCreatedEvent
      // });
      // this.updateCreatedEvent({
      //   state: "dataEnd",
      //   value: this.getDataEndCreatedEvent
      // });
      // this.updateCreatedEvent({
      //   state: "dataInterim",
      //   value: 0
      // });
      this.updateCreatedEvent({
        state: "create",
        value: false
      });
      this.showPopapAddingEvent();
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
      createdEvent: state => state.calendar.createdEvent
    }),
    ...mapGetters([
      "getDataStartCreatedEvent",
      "getDataEndCreatedEvent"
    ]),
    dataStartEvent() {
      let minData = 0;
      if (!this.createdEvent.dataStart) return;
      if (!this.createdEvent.dataEnd) {
        minData = Math.min(
          this.createdEvent.dataStart,
          this.createdEvent.dataInterim
        );
      } else if (!this.createdEvent.dataInterim) {
        minData = Math.min(
          this.createdEvent.dataStart,
          this.createdEvent.dataEnd
        );
      } else {
        minData = Math.min(
          this.createdEvent.dataStart,
          this.createdEvent.dataInterim,
          this.createdEvent.dataEnd
        );
      }
      if (this.createdEvent.dataStart === this.createdEvent.dataEnd) {
        minData = new Date(this.createdEvent.dataStart).setMinutes(0);
      }
      //   return minData;
      return new Date(minData);
    },
    dataEndEvent() {
      if (!this.createdEvent.dataStart) return;
      let maxData = 0;
      if (!this.createdEvent.dataEnd) {
        maxData = Math.max(
          this.createdEvent.dataStart,
          this.createdEvent.dataInterim
        );
      } else if (!this.createdEvent.dataInterim) {
        maxData = Math.max(
          this.createdEvent.dataStart,
          this.createdEvent.dataEnd
        );
      } else {
        maxData = Math.max(
          this.createdEvent.dataStart,
          this.createdEvent.dataInterim,
          this.createdEvent.dataEnd
        );
      }
      if (this.createdEvent.dataStart === this.createdEvent.dataEnd) {
        const date = new Date(this.createdEvent.dataStart);
        const hour = date.getHours();
        maxData = date.setHours(hour + 1);
        maxData = new Date(maxData).setMinutes(0);
      }
      return new Date(maxData);
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
      return `top: ${this.topCoordinateEvent}px; height: ${this.heightEvent}px;`;
    }
  }
};
</script>

<style scoped>
.bcalendar__event {
  position: absolute;
  background: orange;
  width: 95%;
  z-index: 0;
  user-select: none;
  cursor: move;
}</style
>>
