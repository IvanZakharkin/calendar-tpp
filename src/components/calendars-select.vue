<template lang="pug">
    .dropdown.calendars-select
        button.btn.calendars-select__selected-item(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
            .calendars-select__calendar
                .calendars-select__calendar-circle(
                    :style="{backgroundColor: selectedCalendar.color}"
                )
                .calendars-select__calendar-title {{selectedCalendar.name}}
                button.calendars-select__calendar-location(
                @click="openMap()"
                    ref="location"
                )
                    i.fas.fa-map-marker-alt
            .calendars-select__icon
                i.fas.fa-chevron-down
        .dropdown-menu
            button.btn.calendars-select__dropdown-item.dropdown-item(
                v-for="calendar in calendars"
                @click="changeCalendar(calendar)"
            )
                .calendars-select__calendar
                    .calendars-select__calendar-circle(
                        :style="{backgroundColor: calendar.color}"
                    )
                    .calendars-select__calendar-title {{calendar.name}}
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      // selectedCalendar: {}
    };
  },
  props: {
    selectedCalendar:{
        default: () => {},
        type: Object
    }
  },
  computed: {
    ...mapState({
      calendars: state => state.calendar.calendars,
      event: state => state.calendar.event
    }),
    ...mapGetters(["getCalendar"])
    // selectedCalendar() {
    //     return this.calendars[0]
    // },
  },
  methods: {
    ...mapMutations(["updateCreatedEvent", "updateYandexMap"]),
    ...mapActions(["showRoomOnMap"]),
    changeCalendar(calendar) {
      this.$emit("changeCalendar", calendar);
      // this.selectedCalendar = calendar;
    },
    openMap() {
      this.showRoomOnMap({
        address: this.selectedCalendar.address,
        coordinates: this.selectedCalendar.coordinates
      });
    }
  },
  mounted() {
    if (!this.event.calendarId) {
      this.selectedCalendar = this.calendars[0];
    } else {
      this.selectedCalendar = this.getCalendar(this.event.calendarId);
    }
  }
};
</script>

