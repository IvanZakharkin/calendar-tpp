<template lang="pug">
.calendar-popup-event-modal(
  @click="closePopup($event, false)"
)
  .card.calendar-popup-event
    .card-body.calendar-popup-event__body
      button.calendar-popup-event__close(
        @click="closePopup($event, true)"
      )
        i.fas.fa-times
      .calendar-popup-event__event-content
        .calendar-popup-event__name.mb-3
          input.calendar-popup-event__name-input(
            placeholder='Название'
            v-model="name")
        .calendar-popup-event__parameters
          .calendar-popup-event__parameter
            dropdown-time(
              :times="hours"
              :currentTime="hourStart"
              @changeTime="hourStart = $event"
            )
            .py-1 :
            dropdown-time(
              :times="minutes"
              :currentTime="minutesStart"
              @changeTime="minutesStart = $event"
            )
            .p-1 -
            .calendar-event-popup-fullscreen__field.d-flex
            dropdown-time(
              :times="hours"
              :currentTime="hourEnd"
              @changeTime="hourEnd = $event"
            )
            .py-1 :
            dropdown-time(
              :times="minutes"
              :currentTime="minutesEnd"
              @changeTime="minutesEnd = $event"
            )
          .calendar-popup-event__parameter.flex-column
            .mb-2 Участники
            .v-select-custom.v-select-agenda
              vSelect(
                multiple v-model="selectedParticipants" :options="participants" @search="onSearch"
              )
        .calendar-popup-event__btns
          button.btn.calendar-popup-event__btn.calendar-popup-event__btn_save(
            :disabled="!name"
            @click="saveAgenda()"
          ) Сохранить
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import vSelect from "../v-select/components/Select.vue";
import dropdownTime from "../dropdown-time.vue";
import { HOURS, MINUTES } from "../const.js";
import moment from "moment-timezone";

export default {
  data() {
    return {
      hours: [],
      minutes: [],

      minutesStart: "",
      hourStart: "",
      hourEnd: "",
      minutesEnd: "",
      name: "",
      speakers: [],
      participants: [],
      selectedParticipants: []
    };
  },
  watch: {},
  props: {
    agendaData: {
      type: Object,
      default: {
        // timeStart: "01:15",
        // timeEnd: "04:30"
      }
    },
    timeStartCreatedAgendasInUnix: {
      type: Number,
      default: 0
    },
    timeEndCreatedAgendasInUnix: {
      type: Number,
      default: 0
    },
    dateStartEventMoment: {
      type: Object,
      default: {}
    },
    dateEndEventMoment: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters(["getDataStartCreatedEvent", "getDataEndCreatedEvent"]),
    timeStartCreatedAgendasToMoment() {
      return moment(this.timeStartCreatedAgendasInUnix * 1000);
    },
    timeEndCreatedAgendasToMoment() {
      return moment(this.timeEndCreatedAgendasInUnix * 1000);
    },
    receivedTimeStartToArr() {
      return this.agendaData.timeStart.split(":");
    },
    receivedTimeEndToArr() {
      return this.agendaData.timeEnd.split(":");
    },
    test() {
      return HOURS.filter(el => {
        return (
          Number(el) >= Number(this.dateStartEventMoment.format("HH")) &&
          Number(el) <= Number(this.dateEndEventMoment.format("HH"))
        );
      });
    }
  },
  components: {
    vSelect,
    dropdownTime
  },
  created() {},
  mounted() {
    this.hours = HOURS.filter(el => {
      return (
        Number(el) >= Number(this.dateStartEventMoment.format("HH")) &&
        Number(el) <= Number(this.dateEndEventMoment.format("HH"))
      );
    });
    this.minutes = MINUTES;

    this.hourStart = this.timeStartCreatedAgendasToMoment.format("HH");
    this.minutesStart = this.timeStartCreatedAgendasToMoment.format("mm");
    this.hourEnd = this.timeEndCreatedAgendasToMoment.format("HH");
    this.minutesEnd = this.timeEndCreatedAgendasToMoment.format("mm");
  },
  methods: {
    ...mapMutations([]),
    randomInt() {
      return 0 + Math.floor((100000000) * Math.random());
    },
    closePopup(event, clickBtnClose) {
      if (
        $(event.target).hasClass("calendar-popup-event-modal") ||
        clickBtnClose
      ) {
        this.$emit("closePopup");
      }
    },
    saveAgenda() {
      this.$emit("changeAgendaData", {
        timeStart: `${this.hourStart}:${this.minutesStart}`,
        timeEnd: `${this.hourEnd}:${this.minutesEnd}`,
        creating: false,
        name: this.name,
        participants: this.selectedParticipants,
        ids: this.randomInt()
      });
      this.$emit("saveAgenda");
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: (loading, search, vm) => {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "search-users",
          name: `${search}`
        },
        success: function(response) {
          vm.participants = response.data;
          loading(false);
        }
      });
    }
  }
};
</script>

<style>
.v-select-agenda .vs__actions {
  display: none;
}
</style>