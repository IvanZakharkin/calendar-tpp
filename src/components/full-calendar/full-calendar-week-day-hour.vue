<template lang="pug">
  .bcalendar__week-grid-day-hour(
    @mousedown="mouseDown()"
    @mouseup="mouseUp()"
    @mousemove="mouseMove()"
  )
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations([
      "updateCreatedEvent",
      "showPopapAddingEvent",
      "updateEvent",
      "showPopapEventFullScreen"
    ]),
    getMinutes(event, hour) {
      let minutesStartEvent = (60 / 50) * (event.layerY - hour * 50);
      if (minutesStartEvent >= 0 && minutesStartEvent < 7.5) {
        return (minutesStartEvent = 0);
      }
      if (minutesStartEvent >= 7.5 && minutesStartEvent < 22.5) {
        return (minutesStartEvent = 15);
      }
      if (minutesStartEvent >= 22.5 && minutesStartEvent < 37.5) {
        return (minutesStartEvent = 30);
      }
      if (minutesStartEvent >= 37.5 && minutesStartEvent < 52.5) {
        return (minutesStartEvent = 45);
      }
      if (minutesStartEvent >= 52.5) {
        return (minutesStartEvent = 60);
      }
    },
    mouseDown() {
      if (this.shownPopapAddingEvent || !this.canEditEvents) return;
      const hourStartEvent = this.hour - 1;
      const minutesStartEvent = this.getMinutes(event, hourStartEvent);
      const dataStartEvent = new Date(
        this.date.year,
        this.date.month,
        this.date.day,
        hourStartEvent,
        minutesStartEvent
      );
      this.updateCreatedEvent({
        state: "dataStart",
        value: dataStartEvent.getTime()
      });
      this.updateCreatedEvent({
        state: "create",
        value: true
      });
    },
    mouseUp() {
      if (this.shownPopapAddingEvent || !this.canEditEvents) return;
      const hourStartEvent = this.hour - 1;
      const minutesStartEvent = this.getMinutes(event, hourStartEvent);
      let dataStartEvent = new Date(this.createdEvent.dataStart);
      let dataEndEvent = new Date(
        dataStartEvent.getFullYear(),
        dataStartEvent.getMonth(),
        dataStartEvent.getDate(),
        hourStartEvent,
        minutesStartEvent
      );
      if (dataStartEvent.getTime() === dataEndEvent.getTime()) {
        dataStartEvent = new Date(dataStartEvent.setMinutes(0));
        dataEndEvent = new Date(
          dataStartEvent.getFullYear(),
          dataStartEvent.getMonth(),
          dataStartEvent.getDate(),
          hourStartEvent + 1,
          0
        );
        this.updateCreatedEvent({
          state: "dataStart",
          value: dataStartEvent.getTime()
        });
      }
      this.updateCreatedEvent({
        state: "dataEnd",
        value: dataEndEvent.getTime()
      });

      this.updateCreatedEvent({
        state: "create",
        value: false
      });
      this.updateEvent({
        dateStart: this.getDataStartCreatedEvent,
        dateEnd: this.getDataEndCreatedEvent
      });
      this.showPopapEventFullScreen();
      // this.showPopapAddingEvent();
      // $(".modal-popup-event").modal("show");
    },
    mouseMove() {
      if (!this.createdEvent.create  || !this.canEditEvents) return;
      const hourStartEvent = this.hour - 1;
      const minutesStartEvent = this.getMinutes(event, hourStartEvent);
      const dataStart = new Date(this.createdEvent.dataStart);
      const dataInterimEvent = new Date(
        dataStart.getFullYear(),
        dataStart.getMonth(),
        dataStart.getDate(),
        hourStartEvent,
        minutesStartEvent
      );
      this.updateCreatedEvent({
        state: "dataInterim",
        value: dataInterimEvent.getTime()
      });
    }
  },
  computed: {
    ...mapState({
      createdEvent: state => state.calendar.createdEvent,
      shownPopapAddingEvent: state => state.calendar.shownPopapAddingEvent,
      canEditEvents: state => state.calendar.canEditEvents,
    }),
    ...mapGetters(["getDataStartCreatedEvent", "getDataEndCreatedEvent"])
    // ...mapGetters([
    //   "getDataStartCreatedEvent",
    //   "getDataEndCreatedEvent"
    // ]),
  },
  props: {
    hour: {
      type: Number,
      default: () => 0
    },
    date: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
