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
            time-select(
              :timeStart="`${hourStart}:${minutesStart}`"
              :timeEnd="`${hourEnd}:${minutesEnd}`"
              :hours="hours"
              :minutes="minutes"
              @changeTimeStart="changeTimeStart($event)"
              @changeTimeEnd="changeTimeEnd($event)"
            )
          .calendar-popup-event__parameter.flex-column
            .mb-2 Участники
            .v-select-custom.v-select-agenda
              vSelect(
                multiple v-model="selectedParticipants" :options="participants" @search="onSearch"
              )
          .calendar-popup-event__parameter.flex-column
            textarea.form-control(id="agenda-description" v-model="description")
            
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
import timeSelect from "../time-select";
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
      description: "",
      speakers: [],
      participants: [],
      selectedParticipants: [],

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
    ...mapState({
      tinymce: state => state.calendar.tinymce,
    }),
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
    dropdownTime,
    timeSelect,
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
        description: this.description,
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
    },
    changeTimeStart(data) {
      this.hourStart = data.split(':')[0];
      this.minutesStart = data.split(':')[1];
    },
    changeTimeEnd(data) {
      this.hourEnd = data.split(':')[0];
      this.minutesEnd = data.split(':')[1];
    },
  },
  created() {
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
  mounted() {
    tinymce.init({
      ...this.tinymce.options, 
      ...{
        selector: '#agenda-description',
        language: 'ru',
        height: 200,
        init_instance_callback: (editor) => {
          editor.on('input', (e) => {
            this.description = editor.getContent();
          });
        }
      }
    })
  },
  destroyed() {
    tinymce.remove();
  }
};
</script>

<style>
.v-select-agenda .vs__actions {
  display: none;
}
</style>